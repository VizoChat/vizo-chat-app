const mids = require('../../helpers/middlewares')
const jwt = require('../../helpers/jwt')
const chats = require('../../model/chats')
const users = require('../../model/users')
const chat_rooms = require('../../model/chat_rooms')
module.exports = {
    chatMessages({io_liveChats,io_liveChatNotification}) {
      const io = io_liveChats
      io.use(jwt.verifySocketUserToken_forSocketIo, mids.verifyUser_forSocketIo) 
      io.on('connection',  (socket) => {
        const data = {
          userid : socket.jwtUSER?._id??socket.handshake.query.room,
          user_type:socket.apiRes.data.isAgent?'agent':'wUser',
          channelid:socket.handshake.query.channelId,
          room:socket.handshake.query.room
        }
        socket.join(socket.handshake.query.room);//chat room as room
        if(socket.apiRes.data.isAgent){
          socket.join(socket.handshake.query.channelId);//chat room as room
        }
        // handle incoming messages from the client
        socket.on('message', async(message) => {
          try {
            let newMessage = { 
              message:{
                message:message.replace(/</g,'&#60;').replace(/>/g,'&#62;'),
                message_type:'text'
              },
              user:{
                user_id:await users.findOne({_id:data.userid}),
                user_type:data.user_type
              },
            }
            if(socket.apiRes.data.isAgent){
              newMessage = {...newMessage, 
                  chat_room:data.room,
                  created_at:new Date().toISOString(),
                  channel:data.channelid //not required.
                }
              }
            if(socket.handshake.query.ds_key){
              io_liveChatNotification.to(socket.handshake.query.ds_key).emit('notification:new-message', {
                channelid:socket.handshake.query.channelId,
                room:socket.handshake.query.room,
                message:{...newMessage.message,time:new Date().toISOString()},
              });
            }
            io.to(socket.handshake.query.room).emit('new-message', newMessage);
            await chats.newChat({
              user:{
                user_id:data.userid, 
                user_type:data.user_type, //'agent'|'wUser' 
              },
                message:{
                    message:message.replace(/</g,'&#60;').replace(/>/g,'&#62;'),
                    message_type:'text', //'text'|'image'
                },
                channel: data.channelid,
                chat_room:data.room
            })
            await chat_rooms.updateOne({_id:data.room,channel:data.channelid},{$set:{message_preview:{
              $inc:{newMessageCount:1},
              message:message.replace(/</g,'&#60;').replace(/>/g,'&#62;'),
              time:new Date()
            }},
            
            }
            )
            
          } catch (error) {
            console.log(error);
            socket.emit('error','Something went wrong on the server!')
          }
        });
    
        // handle user disconnection
        socket.on('disconnect', () => {
          console.log('user disconnected from liveChats route');
        });
      });
    },
    chatMessagesNotify:({io_liveChatNotification})=>{
      const io = io_liveChatNotification
      io.use(jwt.verifySocketUserToken_forSocketIo, mids.verifyUser_forSocketIo) //(socket: any, next: any) =>
      io.on('connection',  (socket) => {
        const data = {
          dashboard : socket.handshake.query.dashboard
        }
        socket.join(data.dashboard);//chat room as room
        
      
      //   // handle user disconnection
        socket.on('disconnect', () => {
          console.log('user disconnected from liveMsgNotification route');
        });
      });
    }
}