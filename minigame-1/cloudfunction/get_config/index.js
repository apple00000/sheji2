const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const querResult = await db.collection('fallman_config').doc('1db297d463fe9d4502698ffa3c2182bd').get()
    return {
      config: querResult.data.config,
    }
  } catch(err) {
    return {
      config: 0
    }
  }
}