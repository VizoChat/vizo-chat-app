const mongoose = require('mongoose');

const chatRoomsSchema = new mongoose.Schema(
    {   
        // w_user:{
        //     username: {type:String, required:true, index: true, lowercase:true},
        //     user_id:{type:String,required:true, index: true, }, 
        //     additional_data:{type:String}, 
        //     current_page:{type:String}, 
        // },
        w_user:{type:String,required:true},
        message_preview:{
            newMessageCount:{type:String,default:0},
            topic:{type:String, default:'New Message'},
            message:{type:String, default:'Hey there, how can we help you?'},
            time:{type:Date, default: Date.now},
        },
        channel: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'channels' },
        dashboard: {type:String, required:true },
        created_at:   {type:Date, default: Date.now()},
        last_updated: {type:Date, default: Date.now},
    }
)

let c_rooms = module.exports = mongoose.model("chat_rooms", chatRoomsSchema)

module.exports.getChatRooms = (data)=>{
    // return c_rooms.find(data).sort({'message_preview.time':-1})
    // return c_rooms.find(data)
    // .populate({path:'channel', select:'name'})
    // .sort({'message_preview.time':-1})
    // .populate({
    //   path: 'w_user',
    //   model: 'widget_users',
    // //   select: 'name email',
    //   localField: 'w_user',
    //   foreignField: 'user_id',
    //   select: {
    //     page_history: { $slice: -5 }
    //   },
    // //   sort: { 'page_history.time': -1 },
    //   populate: {
    //     path: 'page_history',
    //     model: 'widget_pages',
    //     options: { sort: { 'time': -1 } }
    //   }
    // })
    return c_rooms.find(data)
    .populate({path:'channel', select:'name'})
    .populate({
      path: 'w_user',
      model: 'widget_users',
      localField: 'w_user',
      foreignField: 'user_id',
      select: {
        page_history: { $slice: -5 }
      },
      populate: {
        path: 'page_history',
        model: 'widget_pages',
        options: { sort: { 'time': 1 } } // not working the sorting
      }
    })
    .sort({'message_preview.time':-1})
}

module.exports.newChatRoom = function (data){
    let wuNew = new c_rooms(data)
    return wuNew.save()
}