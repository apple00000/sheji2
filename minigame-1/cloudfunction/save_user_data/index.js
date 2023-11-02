const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 存用户登录数据
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    const querResult = await db.collection('fallman_user').doc(wxContext.OPENID).get()
    return {
      isHas: 1
    }
  } catch(err) {
    let d = new Date()

    db.collection('fallman_user').add({
      data: {
        _id: wxContext.OPENID,
        openid: wxContext.OPENID,
        nickName: event.nickName,
        avatarUrl: event.avatarUrl,
        createTime: d.toLocaleString(),
        city: event.city,
        province: event.province,
        gender: event.gender
      }
    })
    return {
      isHas: 0
    }
  }
}