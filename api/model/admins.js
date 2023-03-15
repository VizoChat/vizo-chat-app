const mongoose = require('mongoose');
const { validateEmail, hashPasswordvalidate } = require('../helpers/validation');

const adminsSchema = new mongoose.Schema(
    {   
        username: {type:String, required:true, unique:true, index: true, lowercase:true},
        name: {type:String, required:true, index: true},
        email: {type:String, required: true, unique:true , index: true},
        password: {type:String, required: true},
        avatar: {type:String},
        state:{
            deleted:{type:Boolean, default:false},
        },
        login_ses:  {type:String},
        joined:   {type:Date, default: Date.now()},
        last_login: {type:Date, default: Date.now},
        
    }
    // ,{timestamps:true}
)

let users = module.exports = mongoose.model("admins", adminsSchema)

module.exports.getUser =  function(id){
    return users.findById(id)
}

module.exports.addUser = function (data){
    data.username = data.username.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
    let uNew = new users(data)
    return uNew.save()
}
module.exports.updateUser = function (id,data){
    if(data.username){
        data.username = data.username.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
    }
    return users.updateOne({_id:id},{$set:data})
}

module.exports.validateAdmin= async function(reqBody){ //on use
    try {
        let data = {};
        if(validateEmail(reqBody.user)){
            data.email = reqBody.user
        }else{
            data.username = reqBody.user
        }
        let uData = await users.findOne(data);
        if(uData){
            if(await hashPasswordvalidate(reqBody.password, uData.password)){
                return uData;
            }else{
                return false
            }
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports.validateUserWithEmail = async function(email){
    try {
        let data = {};
        if(validateEmail(email)){
            data.email = email
        }else{
            return false;
        }
        let uData = await users.findOne(data);
        if(uData){
            return uData;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports.getAll = ()=>{
    return users.find({})
}
