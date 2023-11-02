const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 申请礼物
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let d = new Date()

  db.collection('fallman_gift_check').add({
    data: {
      openid: wxContext.OPENID,
      nickName: event.nickName,
      avatarUrl: event.avatarUrl,
      createTime: d.toLocaleString()
    }
  })
}