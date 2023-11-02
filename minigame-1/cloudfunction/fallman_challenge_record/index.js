const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 挑战记录
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let d = new Date()

  db.collection('fallman_challenge_record').add({
    data: {
      openid: wxContext.OPENID,
      nickName: event.nickName,
      avatarUrl: event.avatarUrl,
      createTime: d.toLocaleString(),
      score: event.score,
      mode: event.mode
    }
  })
}