let { check, validationResult } = require('express-validator');
const chat_rooms = require('../../model/chat_rooms');
const chats = require('../../model/chats');
const channels = require('../../model/channels');


let apiResponse = {
    message: 'Authentication Failed!',
    authorization:false,
    status:400,//bad rqst,
    data:{}
  }


module.exports = {
    getChatRooms:async (req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.data.user = res.locals.jwtUSER
        apiRes.message = 'Invalid arguments, please check the inputs!'
        apiRes.status = 400 // 400 Bad Request
        apiRes.authorization = true;
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
          apiRes.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, please check the value!":errors.errors[0].msg)
          return res.json(apiRes)
        }

        let channelsList;
        try {
          channelsList = await channels.getChannels({
            dashboard:res.locals.jwtUSER.dashboard,
            agents:{$in:[res.locals.jwtUSER._id]}
          },{
            _id:1
          })
          console.log(channelsList);
        } catch (error) {
          apiRes.message = 'Something went wrong while fetching the channel!'
          return res.json(apiRes)
        }
        let searchData = {
          dashboard:res.locals.jwtUSER.dashboard,
          channel:{$in:channelsList}
        }
        if(req.body.channel_id){
          searchData._id= req.body.channel_id
        }
        chat_rooms.getChatRooms(searchData)
        .then((data)=>{
          apiRes.data.chat_rooms = data
          apiRes.message = 'Successfully fetch chat rooms!'
          apiRes.status = 'ok'
        }).catch((err)=>{
          apiRes.message = 'Something went wrong while fetching the rooms!'
          console.log(err);
        }).then(()=>{
          res.json(apiRes)
        })
      },
    getChats:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.data.user = res.locals.jwtUSER
        apiRes.message = 'Invalid arguments, please check the inputs!'
        apiRes.status = 400 // 400 Bad Request
        apiRes.authorization = true;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          apiRes.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, please check the value!":errors.errors[0].msg)
          return res.json(apiRes)
        }
    
        let searchData = {
          chat_room:req.body.room_id,
          
        }
        // chats.find(searchData).sort({'message_preview.time':-1})
        chats.getChats({search:searchData,project:{last_updated:0}})
        .then((data)=>{
          apiRes.data.chats = data
          apiRes.message = 'Successfully fetch chats!'
          apiRes.status = 'ok'
        }).catch((err)=>{
          apiRes.message = 'Something went wrong while fetching the channel!'
          console.log(err);
        }).then(()=>{
          res.json(apiRes)
        })
      },
}