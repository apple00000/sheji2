const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 存储用户最高分
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 苹果自己为0
  if (wxContext.OPENID=='ovDXU5O_jhlYI7EdNYFnV0fonoZU'){
    return {
      score: 0
    }
  }

  try {
    const querResult = await db.collection('fallman_max_score').doc(wxContext.OPENID).get()
    if (event.score<=querResult.data.score){
      return {
        score: querResult.data.score
      }
    }else{
      let d = new Date()
      db.collection('fallman_max_score').doc(wxContext.OPENID).update({
        data: {
          openid: wxContext.OPENID,
          nickName: event.nickName,
          avatarUrl: event.avatarUrl,
          createTime: d.getTime(),
          score: event.score
        }
      })
      return {
        score: event.score
      }
    }
  } catch(err) {
    let d = new Date()
    db.collection('fallman_max_score').add({
      data: {
        _id: wxContext.OPENID,
        openid: wxContext.OPENID,
        nickName: event.nickName,
        avatarUrl: event.avatarUrl,
        createTime: d.getTime(),
        score: event.score
      }
    })
    return {
      score: event.score
    }
  }
}