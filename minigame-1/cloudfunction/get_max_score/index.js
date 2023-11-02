const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 获取用户最高分
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    const querResult = await db.collection('fallman_max_score').doc(wxContext.OPENID).get()
    return {
      score: querResult.data.score,
    }
  } catch(err) {
    return {
      score: 0,
    }
  }
}