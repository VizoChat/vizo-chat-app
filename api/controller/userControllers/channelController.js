let { check, validationResult } = require('express-validator');
const channels = require('../../model/channels');


let apiResponse = {
    message: 'Authentication Failed!',
    authorization:false,
    status:400,//bad rqst,
    data:{}
  }


module.exports = {
    newChannel:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.data.user = res.locals.jwtUSER
        apiRes.message = 'Invalid arguments, please check all input!'
        apiRes.status = 400//bad rqst
        apiRes.authorization = true;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          apiRes.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, please check the value!":errors.errors[0].msg)
          return res.status(200).json(apiRes)
        }
        channels.createChannel({
          dashboard:res.locals.jwtUSER.dashboard,
          name:req.body.channelName,
          domain:req.body.channelDomain.replace(/ /g,''),
          agents:[res.locals.jwtUSER._id]
        })
        .then((data)=>{
          apiRes.message = 'Successfully created new channel!'
          apiRes.status = 'ok'
        }).catch((err)=>{
          apiRes.message = 'Something went wrong while creating new channel!'
          console.log(err);
        }).then(()=>{
          res.json(apiRes)
        })
      },
      editChannel:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.data.user = res.locals.jwtUSER
        apiRes.message = 'Invalid arguments, please check the inputs!'
        apiRes.status = 400 // 400 Bad Request
        apiRes.authorization = true;
        let dataToUpdate = {
          canUpdate:false,
          data:{}
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          apiRes.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, please check the value!":errors.errors[0].msg)
          
        }
        if(errors.errors.filter(e => e.param === 'channelName').length <= 0){
          dataToUpdate.canUpdate = true;
          dataToUpdate.data.name = req.body.channelName;
        }
        if(errors.errors.filter(e => e.param === 'channelDomain').length <= 0){
          dataToUpdate.canUpdate = true;
          dataToUpdate.data.domain = req.body.channelDomain;
        }
        if(errors.errors.filter(e => e.param === 'channel_id').length > 0){
          dataToUpdate.canUpdate = false; //blocking if there is no _id
          dataToUpdate.data.domain = req.body.channelDomain;
        }
        if(dataToUpdate.canUpdate){
          channels.updateOne({
              dashboard:res.locals.jwtUSER.dashboard,
              _id:req.body.channel_id
            },
            {
              $set:{
                name:req.body.channelName,
                domain:req.body.channelDomain.replace(/ /g,'')
              }
          }).then((data)=>{
            apiRes.message = 'Successfully updated channel!'
            apiRes.status = 'ok'
          }).catch((err)=>{
            apiRes.message = 'Something went wrong while updating the channel!'
            console.log(err);
          }).then(()=>{
            res.json(apiRes)
          })
        }else{
          res.json(apiRes)
        }
      },
      getChannels:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.data.user = res.locals.jwtUSER
        apiRes.message = 'Unknown error detected!'
        apiRes.status = 400//bad rqst
        apiRes.authorization = true;
        channels.getChannels({
          dashboard:res.locals.jwtUSER.dashboard
        }).populate({path:'agents',select:'name email username _id avatar '})
        .then((data)=>{
          apiRes.data.channels = data;
          apiRes.status = 'ok'
          apiRes.message = `Found ${data.length} result${data.length>1?'s':''}!`
        }).catch((err)=>{
          console.log(err);
          apiRes.message = 'Internal error detected!'
          apiRes.status = 500
        }).then(()=>{
          res.json(apiRes)
        })
      },
      delChannel:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.data.user = res.locals.jwtUSER
        apiRes.message = 'Invalid arguments, please check the inputs!'
        apiRes.status = 400 // 400 Bad Request
        apiRes.authorization = true;
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
          apiRes.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, please check the value!":errors.errors[0].msg)
          return res.json(apiRes)
        }
    
        channels.remove({
            dashboard:res.locals.jwtUSER.dashboard,
            _id:req.body.channel_id
        }).then((data)=>{
          apiRes.message = 'Successfully deleted channel!'
          apiRes.status = 'ok'
        }).catch((err)=>{
          apiRes.message = 'Something went wrong while deleting the channel!'
          console.log(err);
        }).then(()=>{
          res.json(apiRes)
        })
        
      },
      addAgentToChannel:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
          apiRes.data.user = res.locals.jwtUSER
          apiRes.message = 'Invalid arguments, please check the inputs!'
          apiRes.status = 400 // 400 Bad Request
          apiRes.authorization = true;
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            console.log(errors);
            apiRes.message = errors.errors[0].param+" "+((errors.errors[0].msg=="Invalid value")?"is invalid, please check the value!":errors.errors[0].msg);
            return res.status(200).json(apiRes);
          }
          channels.updateOne({
            _id: req.body.channel_id,
            dashboard:res.locals.jwtUSER.dashboard, 
          },
          {
            $addToSet:{
              agents: req.body.teammate_id
            }
          }).then(async (data)=>{
            apiRes.message = 'Updated Successful!'
            apiRes.status = 'ok';
          }).catch((err)=>{
            apiRes.message = 'Couldn\'nt update the channel!'
            console.log(err);
          }).then(()=>{
            res.json(apiRes)
          })
      },
      removeAgentFromChannel:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
          apiRes.data.user = res.locals.jwtUSER
          apiRes.message = 'Invalid arguments, please check the inputs!'
          apiRes.status = 400 // 400 Bad Request
          apiRes.authorization = true;
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            console.log(errors);
            apiRes.message = errors.errors[0].param+" "+((errors.errors[0].msg=="Invalid value")?"is invalid, please check the value!":errors.errors[0].msg);
            return res.status(200).json(apiRes);
          }
          channels.updateOne({
            _id: req.body.channel_id,
            dashboard:res.locals.jwtUSER.dashboard, 
          },
          {
            $pull:{
              agents: req.body.teammate_id
            }
          }).then(async (data)=>{
            apiRes.message = 'Updated Successful!'
            apiRes.status = 'ok';
          }).catch((err)=>{
            apiRes.message = 'Couldn\'nt update the channel!'
            console.log(err);
          }).then(()=>{
            res.json(apiRes)
          })
      },
}