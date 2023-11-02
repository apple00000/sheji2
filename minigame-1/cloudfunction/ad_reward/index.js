const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 记录激励广告
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let d = new Date()

  db.collection('fallman_ad_reward').add({
    data: {
      openid: wxContext.OPENID,
      nickName: event.nickName,
      avatarUrl: event.avatarUrl,
      mode: event.mode,
      createTime: d.toLocaleString(),
    }
  })
}