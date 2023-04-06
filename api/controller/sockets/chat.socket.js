const mids = require('../../helpers/middlewares')
const jwt = require('../../helpers/jwt')
const chats = require('../../model/chats')
module.exports = {
    chatMessages(io) {
      io.use(jwt.verifySocketUserToken_forSocketIo, mids.verifyUser_forSocketIo) 
      io.on('connection',  (socket) => {
        socket.join(socket.handshake.query.room);//chat room as room
        const data = {
          userid : socket.jwtUSER?._id??socket.handshake.query.room,
          user_type:socket.apiRes.data.isAgent?'agent':'wUser',
          channelid:socket.handshake.query.channelId,
          room:socket.handshake.query.room
        }
        // handle incoming messages from the client
        socket.on('message', async(message) => {
          let newMessage = { 
            message:{
              message,
              message_type:'text'
            },
            user:{
              user_id:data.userid,
              user_type:data.user_type
            },
          }
          if(socket.apiRes.data.isAgent){
            newMessage = {...newMessage, 
                chat_room:data.room,
                created_at:new Date(),
                channel:data.channelid //not required.
              }
            }
          
          io.to(socket.handshake.query.room).emit('new-message', newMessage);
          await chats.newChat({
            user:{
              user_id:data.userid, 
              user_type:data.user_type, //'agent'|'wUser' 
            },
              message:{
                  
                  message:message,
                  message_type:'text', //'text'|'image'
              },
              channel: data.channelid,
              chat_room:data.room
          })
        });
    
        // handle user disconnection
        socket.on('disconnect', () => {
          console.log('user disconnected from liveChats route');
        });
      });
    }
}