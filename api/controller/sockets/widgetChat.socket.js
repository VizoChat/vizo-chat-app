const mids = require('../../helpers/middlewares')
const jwt = require('../../helpers/jwt')
const chats = require('../../model/chats')
module.exports = {
    chatMessages(io) {
      console.log('called wsocketIO');
      io.use(jwt.verifySocketUser_forSocketIo, mids.verifyUser_forSocketIo) 
      io.on('connection',  (socket) => {
        socket.join(socket.handshake.query.room);//channelid as room
        console.log('a wuser connected to widget liveChats route');
        
        // handle incoming messages from the client
        socket.on('message', async(message) => {
          console.log('message received on liveChats wroute:', message);
          io.to(socket.handshake.query.room).emit('new-message', message);
          // io.of('/wliveChats').to(socket.handshake.query.room).emit('message', message);
          await chats.newChat({
            user:{
              user_id:socket.handshake.query.room, 
              user_type:'wUser', //'agent'|'wUser' 
            },
              message:{
                  
                  message:message,
                  message_type:'text', //'text'|'image'
              },
              channel: socket.handshake.query.channelId,
              chat_room:socket.handshake.query.room
          })
        });
    
        // handle user disconnection
        socket.on('disconnect', () => {
          console.log('wuser disconnected from liveChats route');
        });
      });
    }
}