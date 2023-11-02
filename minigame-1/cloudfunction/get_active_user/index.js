const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 获取用户top100
exports.main = async (event, context) => {

  try {
    const querResult = await db.collection('fallman_max_score').orderBy('score', 'desc').orderBy('createTime','asc').limit(cnt).get()
    return {
      data: querResult.data
    }
  } catch(err) {
    return {
      data: [],
    }
  }
}