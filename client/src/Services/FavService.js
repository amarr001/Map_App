export default {
postFavourite : favourite =>{
  return fetch('user/favourite' ,{
      method: "post",
      body: JSON.stringify(favourite),
      headers: {
        'Content-Type' : 'application/json'
      }
  }).then(response=>{
    if(response.status !== 401){
      return response.json().then(data => data)
    }else
    return {message: {msgBody : "UnAuthorised"}, msgError: true}
  })
}
}