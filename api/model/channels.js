const mongoose = require('mongoose');

const channelsSchema = new mongoose.Schema(
    {   
        dashboard:{type:String, required:true},
        name:{type:String, required:true},
        agents:[{type:mongoose.Schema.Types.ObjectId, ref:'users'}],
        status:{type:String, required:true, default:'active'},
        domain:{type:String, required:true},
        created:{type:Date, default: Date.now()},
    }
    // ,{timestamps:true}
)

let channel = module.exports = mongoose.model("channels", channelsSchema)
module.exports.createChannel = (data)=>{
    let newchannel = new channel(data);
    return newchannel.save()
}
module.exports.getChannels = (data,project)=>{
    return channel.find(data, project);
}