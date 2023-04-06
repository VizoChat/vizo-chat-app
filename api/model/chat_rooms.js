const mongoose = require('mongoose');

const chatRoomsSchema = new mongoose.Schema(
    {   
        w_user:{
            username: {type:String, required:true, index: true, lowercase:true},
            user_id:{type:String,required:true, index: true, }, 
            additional_data:{type:String}, 
        },
        message_preview:{
            topic:{type:String, default:'Hey there, how can we help you?'},
            message:{type:String, default:'Hey there, how can we help you?'},
            time:{type:Date, default: Date.now},
        },
        channel: {type:mongoose.Schema.Types.ObjectId, required:true },
        dashboard: {type:String, required:true },
        created_at:   {type:Date, default: Date.now()},
        last_updated: {type:Date, default: Date.now},
    }
)

let c_rooms = module.exports = mongoose.model("chat_rooms", chatRoomsSchema)

module.exports.getChatRooms = (data)=>{
    return c_rooms.find(data).sort({'message_preview.time':-1})
}

module.exports.newChatRoom = function (data){
    let wuNew = new c_rooms(data)
    return wuNew.save()
}