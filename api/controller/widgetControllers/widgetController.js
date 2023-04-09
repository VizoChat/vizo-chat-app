

const fs = require('fs')
const slug = require('slug')
const funs = require('../../helpers/funs')
const chatRooms = require('../../model/chat_rooms')
const chats = require('../../model/chats')
const { validationResult } = require('express-validator');
const channels = require('../../model/channels')  
const widget_users = require('../../model/widget_users')  

let apiResponse = {
    message: 'Authentication Failed!',
    authorization:false,
    status:401,
    data:{}
  }
  module.exports = {
      widget_js:async (req,res,next)=>{
        try {
            
            let dash_id = await channels.findOne({_id:req.params.channelid})
            let widget_env = {
                apiKey:slug(req.params.channelid),
                vizochat_host:process.env.VIZOCHAT_BASE_URL,
                randomGen:(num)=>{
                    return funs.randomLetters(num)
                },
                ds_key:dash_id.dashboard
            }
            fs.readFile('./privateAssets/vizo.widget.js', 'utf8', (err, fileContent) => {
                if (err) {
                    return next(err);
                }
                const modifiedContent = fileContent.replace(/\{\{\{(\w+)\}\}\}/g, (_,data)=>{
                    return widget_env[data]?widget_env[data]:'no data found!';
                }).replace(/\{\{\{(\w+)\((\w+)\)\}\}\}/g, (_, name,param) => {
                    try {
                        return widget_env[name](param)?widget_env[name](param):'no function found!';
                    } catch (error) {
                        return 'no function found!'
                    }
                }).replace(/\{\{\{(\w+)\(\)\}\}\}/g, (_, name) => {
                    try {
                        return widget_env[name]()?widget_env[name]():'no function found!'
                    } catch (error) {
                        return 'no function found!'
                    }
                })
                res.setHeader('Content-Type', 'text/javascript');
                res.status(200).send(modifiedContent);
            });
        } catch (error) {
            console.log(error);
            return next(error)
        }
    },
    newWUser:(req,res,next)=>{ 
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.message = 'Invalid arguments, please check all input!'
        apiRes.status = 401
        apiRes.authorization = true;
        let dataToUpdate = {
            canUpdate:false,
            data:{
                w_user:{}
            }
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            apiRes.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, please check the value!":errors.errors[0].msg)
            // return res.status(200).json(apiRes)
        }
        if(errors.errors.filter(e => e.param === 'username').length <= 0){
            dataToUpdate.canUpdate = true;
            dataToUpdate.data.username = req.body.username;
        }
        if(errors.errors.filter(e => e.param === 'custom_data').length <= 0){
            dataToUpdate.canUpdate = true;
            dataToUpdate.data.additional_data = req.body.custom_data;
        }
        if(errors.errors.filter(e => e.param === 'email').length <= 0){
            dataToUpdate.canUpdate = true;
            dataToUpdate.data.email = req.body.email;
        }
        if(errors.errors.filter(e => e.param === 'current_Page').length <= 0){
            dataToUpdate.canUpdate = true;
            dataToUpdate.data.page_history = [{url:req.body.current_Page}];
        }
        if(errors.errors.filter(e => e.param === 'userId').length <= 0 && errors.errors.filter(e => e.param === 'apiKey').length <= 0  && errors.errors.filter(e => e.param === 'ds_key').length <= 0){
            dataToUpdate.canUpdate = true;
            dataToUpdate.data.channel = req.body.apiKey;
            dataToUpdate.data.user_id = req.body.userId;
            // dataToUpdate.data.dashboard = req.body.ds_key;
        }else{
            dataToUpdate.canUpdate = false;
        }
        if(dataToUpdate.canUpdate){
            widget_users.newWUser(dataToUpdate.data)
            .then((data)=>{
                apiRes.message = 'Successfully saved updated user!'
                apiRes.status = 'ok'
                // apiRes.data.new_room = {
                //         _id:data._id,
                //         message_preview:data.message_preview
                //     }
            }).catch((err)=>{
                console.log(err);
                apiRes.message = 'Error detected while working on user!'
            }).then(()=>{
                res.status(200).json(apiRes)
            })
        }else{
            console.log(apiRes);
            res.status(200).json(apiRes)
        }
    },
    getChatRooms:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.message = 'Invalid arguments, please check all input!'
        apiRes.status = 401
        // apiRes.authorization = true;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            apiRes.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, Try again!":errors.errors[0].msg)
            return res.status(200).json(apiRes)
        }
        chatRooms.getChatRooms({channel: req.body.apiKey, 'w_user.user_id': req.body.userId},{_id:1,message_preview:1})
        .then((data)=>{
            apiRes.message = 'Successfully fetch the list of chat rooms!'
            apiRes.status = 'ok'
            apiRes.data.rooms = data.map((val)=>{
                return {
                    _id:val._id,
                    message_preview:val.message_preview
                }
            }) 
        }).catch((err)=>{
            console.log(err);
            apiRes.message = 'Error detucted while fetching chat rooms!'
        }).then(()=>{
            res.status(200).json(apiRes)
        })
    },
    newChatRooms:(req,res,next)=>{ 
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.message = 'Invalid arguments, please check all input!'
        apiRes.status = 401
        apiRes.authorization = true;
        let dataToUpdate = {
            canUpdate:false,
            data:{
                w_user:{}
            }
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            apiRes.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, please check the value!":errors.errors[0].msg)
            // return res.status(200).json(apiRes)
        }
        // if(errors.errors.filter(e => e.param === 'username').length <= 0){
        //     dataToUpdate.canUpdate = true;
        //     dataToUpdate.data.w_user.username = req.body.username;
        // }
        // if(errors.errors.filter(e => e.param === 'custom_data').length <= 0){
        //     dataToUpdate.canUpdate = true;
        //     dataToUpdate.data.w_user.additional_data = req.body.custom_data;
        // }
        if(errors.errors.filter(e => e.param === 'userId').length <= 0 && errors.errors.filter(e => e.param === 'apiKey').length <= 0  && errors.errors.filter(e => e.param === 'ds_key').length <= 0){
            dataToUpdate.canUpdate = true;
            dataToUpdate.data.channel = req.body.apiKey;
            dataToUpdate.data.w_user = req.body.userId;
            dataToUpdate.data.dashboard = req.body.ds_key;
        }else{
            dataToUpdate.canUpdate = false;
        }
        if(dataToUpdate.canUpdate){
            chatRooms.newChatRoom(dataToUpdate.data)
            .then((data)=>{
                apiRes.message = 'Successfully saved new chat rooms!'
                apiRes.status = 'ok'
                apiRes.data.new_room = {
                        _id:data._id,
                        message_preview:data.message_preview
                    }
            }).catch((err)=>{
                console.log(err);
                apiRes.message = 'Error detected while creating new chat rooms!'
            }).then(()=>{
                res.status(200).json(apiRes)
            })
        }else{
            console.log(apiRes);
            res.status(200).json(apiRes)
        }
    },
    getChats:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.message = 'Invalid arguments, please check all input!'
        apiRes.status = 401
        // apiRes.authorization = true;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            apiRes.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, Try again!":errors.errors[0].msg)
            return res.status(200).json(apiRes)
        }
        chats.getChats({search:{channel: req.body.apiKey, chat_room: req.body.chatId},project:{message:1,user:1}})
        .then((data)=>{
            apiRes.message = 'Successfully fetch the chats!'
            apiRes.status = 'ok'
            apiRes.data.chats = data
            // apiRes.data.chats = data.map((val)=>{
            //     return {
            //         _id:val._id,
            //         message_preview:val.message_preview
            //     }
            // }) 
        }).catch((err)=>{
            console.log(err);
            apiRes.message = 'Error detucted while fetching chats!'
        }).then(()=>{
            res.status(200).json(apiRes)
        })
    },
}