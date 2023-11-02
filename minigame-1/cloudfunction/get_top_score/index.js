const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

// 获取用户top100
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let cnt = 25
  if (event.num>0){
    cnt=event.num
  }

  try {
    const querResult = await db.collection('fallman_max_score').where({score: _.gt(0)}).orderBy('score', 'desc').orderBy('createTime','asc').limit(cnt).get()
    return {
      data: querResult.data
    }
  } catch(err) {
    return {
      data: [],
    }
  }
}