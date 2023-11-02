const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 记录用户分数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let d = new Date()

  db.collection('fallman_multi').add({
    data: {
      openid: wxContext.OPENID,
      nickName: event.nickName,
      avatarUrl: event.avatarUrl,
      createTime: d.toLocaleString(),
      score: event.score
    }
  })
}