const mongoose = require('mongoose');

const wUsersSchema = new mongoose.Schema(
    {   
        username: {type:String,  index: true, lowercase:true},
        user_id:{type:String,required:true, index: true, unique:true },
        channel:{type:String,required:true, index: true, },
        email:{type:String, index: true, },
        additional_data:{type:mongoose.Schema.Types.Mixed},
        page_history:[{url:{type:String}, time:{type:Date, default: Date.now()}}],
        joined:{type:Date, default: Date.now()},
    }
)

let wUsers = module.exports = mongoose.model("widget_users", wUsersSchema)

module.exports.newWUser = function (data){
    return new Promise((resolve,reject)=>{
        let page_history = data['page_history']
        delete data['page_history']
        new wUsers(data).save()
        .then(()=>{
            resolve()
        }).catch(async(err)=>{
            console.log(err,'from newuser method mongooooo, no prob if it\'s user_id bcs it will ignore that!');
            if(err.code==11000){
                await wUsers.updateOne({user_id:data.user_id},{$set:data,$push:page_history?{page_history:{url:page_history[0].url}}:{}})
                resolve()
            }else{
                reject()
            }
        })
    })
}