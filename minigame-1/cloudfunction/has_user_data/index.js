const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 判断用户是否存在
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    const querResult = await db.collection('fallman_user').doc(wxContext.OPENID).get()
    return {
      isHas: 1,
      nickName: querResult.data.nickName,
      avatarUrl : querResult.data.avatarUrl,
    }
  } catch(err) {
    return {
      isHas: 0
    }
  }
}