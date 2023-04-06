const mongoose = require('mongoose');

const chatsSchema = new mongoose.Schema(
    {   
        user:{
            user_id:{type:String,required:true, index: true, ref:'users'}, 
            user_type:{type:String, default:'agent'}, //'agent'|'wUser' 
        },
        message:{
            
            message:{type:String, default:'Hey there, how can we help you?'},
            message_type:{type:String, default: 'text'}, //'text'|'image'
        },
        channel: {type:mongoose.Schema.Types.ObjectId, required:true },
        chat_room: {type:mongoose.Schema.Types.ObjectId, required:true },
        created_at:   {type:Date, default: Date.now()},
        last_updated: {type:Date, default: Date.now},
    }
)

let chats = module.exports = mongoose.model("chats", chatsSchema)

module.exports.getChats = (data={search,project})=>{
    return chats.find(data.search,data.project).sort({'created_at':1}).populate({path:'user.user_id', select:'name username _id avatar'})
}

module.exports.newChat = function (data){
    let chatNew = new chats(data)
    return chatNew.save()
}