const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema(
    {   
        users: [{type:mongoose.Schema.Types.ObjectId, unique:true}],
        dash_id:{type:String, unique:true},
        // settings: {type:String},
        // extensions:{},
        state:{
            block:{type:Boolean, default:false},
            delete:{type:Boolean, default:false},
        },
        created:   {type:Date, default: Date.now()},
    }
    // ,{timestamps:true}
)

let dash = module.exports = mongoose.model("dashboard", dashboardSchema)
module.exports.build_dash = ({uid,dash_id})=>{
    let newDash = new dash({
        users:[uid],
        dash_id
    });
    return newDash.save()
}