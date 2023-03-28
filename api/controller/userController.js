const products = require('../helpers/products');
let users = require('../model/users')
const multer = require('multer');
const path = require('path');
let { check, validationResult } = require('express-validator');
const channels = require('../model/channels');
const chat_rooms = require('../model/chat_rooms');
const funs = require('../helpers/funs');


// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000 }, // 10MB
  fileFilter: function(req, file, callback) {
    checkFileType(file, callback);
  }
}).single('avatar'); // 'avatar' is the name attribute of the input file element in the form

function checkFileType(file, callback) {
  const filetypes = /jpeg|jpg|png|gif/; // Allowed file extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
console.log(file.originalname,"filename#");
  if (mimetype && extname) {
    return callback(null, true);
  } else {
    return callback('Error: File type should be image!');
  }
}


let apiResponse = {
    message: 'Authentication Failed!',
    authorization:false,
    status:400,//bad rqst,
    data:{}
  }

module.exports = {
  home:function(req, res, next) {
      res.render('index', {title:'AdDev API',vizochatURL:process.env.VIZOCHAT_BASE_URL})
      
    },
  test:function(req, res, next) {
      let apiRes = JSON.parse(JSON.stringify(apiResponse))
      apiRes.data.user = res.locals.jwtUSER
      apiRes.message = 'Test success!'
      apiRes.status = 'ok'
      apiRes.authorization = true;
      res.json(apiRes)
    }
  ,
  products:(req,res)=>{ //not in use

      let apiRes = JSON.parse(JSON.stringify(apiResponse))
      apiRes.data.user = res.locals.jwtUSER
      apiRes.message = 'Products fetch success!'
      apiRes.status = 'ok'
      apiRes.authorization = undefined;
      apiRes.data.products =  products.products
      apiRes.data.url =  process.env.API_URL;
      res.json(apiRes)
  },
  userData:(req,res)=>{
      let apiRes = JSON.parse(JSON.stringify(apiResponse))
      apiRes.data.user = res.locals.jwtUSER
      apiRes.message = 'User fetch success!'
      apiRes.status = 'ok'
      apiRes.authorization = true;
    users.getUser(res.locals.jwtUSER).then((data)=>{
      let _data = JSON.parse(JSON.stringify(data))
      delete _data.password
      delete _data.__v
      apiRes.data.userData = _data
      if(data.avatar){
        apiRes.data.userData.avatar = data.avatar;
        apiRes.data.url = process.env.API_URL
      }
    }).catch((er)=>{
      console.log(er);
      apiRes.message = 'Error while fetching data!'
      apiRes.status = 500
    }).then(()=>{
      if(!apiRes.data.userData){
        apiRes.message = 'No account found!'
        apiRes.status = 403
        console.log('no accc');
      }
      res.json(apiRes)
    })
  },
  userUpdate:(req,res,next)=>{
    let apiRes = JSON.parse(JSON.stringify(apiResponse))
    apiRes.data.user = res.locals.jwtUSER
    apiRes.message = 'Invalid arguments, please check all input!'
    apiRes.status = 400//bad rqst
    apiRes.authorization = true;
    let dataToUpdate = {
      canUpdate:false,
      data:{}
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      apiRes.message = errors.errors[0].param+(0)
      // return res.status(200).json(apiRes)
    }
    if(errors.errors.filter(e => e.param === 'email').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.email = req.body.email;
    }
    if(errors.errors.filter(e => e.param === 'username').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.username = req.body.username;
    }
    if(errors.errors.filter(e => e.param === 'name').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.name = req.body.name;
    }
    if(errors.errors.filter(e => e.param === 'phone').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.phone = req.body.phone;
    }
    if(errors.errors.filter(e => e.param === 'password').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.password = req.body.password;
    }else{
      if(req.body.password.length > 1){
        dataToUpdate.canUpdate = false;
        apiRes.message = "Password didn't match! try again.."
      }
    }

    if(dataToUpdate.canUpdate){
      users.updateUser(res.locals.jwtUSER._id,dataToUpdate.data).then((data)=>{
        apiRes.message = Object.keys(dataToUpdate.data).toString().replace(/,/g,', ')+(Object.keys(dataToUpdate.data).length>1?' are':'')+' updated successful!'
        apiRes.status = 'ok'

      }).catch((err)=>{
        console.log(err);
        apiRes.message = 'Error while updating profile!'
        if(err.code==11000){
          let exist = Object.keys(err.keyValue)[0]
          apiRes.message = `${exist} is already exist!`
        }
      }).then(()=>{
        res.status(200).json(apiRes)
      })
    }else{
      res.status(200).json(apiRes);
    }
  },
  avatarUpload:(req,res,next)=>{
    let apiRes = JSON.parse(JSON.stringify(apiResponse))
    apiRes.data.user = res.locals.jwtUSER
    apiRes.message = 'Invalid arguments, please check all input!'
    apiRes.status = 400//bad rqst
    apiRes.authorization = true;
    upload(req, res, function(err) {
      if (err) {
        apiRes.message = 'Error: Invalid type of file!'
        res.json(apiRes);
        console.log(err," Err#");
      } else {
        if (req.file == undefined) {
          apiRes.message = 'Error: No File Selected!'
          res.json(apiRes);
        } else {
          users.updateUser(res.locals.jwtUSER._id,{avatar:req.file.filename}).then(()=>{
            apiRes.message = 'Profile updated successful!'
            apiRes.status = "ok"
          }).catch((err)=>{
            console.log(err);
            apiRes.message = 'Internal error detected while updating profile picture!'
            apiRes.status = 500
          }).then(()=>{
            res.json(apiRes);
          })
        }
      }
    });
  },
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
      domain:req.body.channelDomain.replace(/ /g,'')
    }).then((data)=>{
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
    }).then((data)=>{
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
  getChatRooms:(req,res,next)=>{
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

    let searchData = {
      dashboard:res.locals.jwtUSER.dashboard,
      
    }
    if(req.body.channel_id){
      searchData._id= req.body.channel_id
    }
    chat_rooms.find(searchData).sort({'message_preview.time':-1})
    .then((data)=>{
      apiRes.data.chat_rooms = data
      apiRes.message = 'Successfully fetch chats!'
      apiRes.status = 'ok'
    }).catch((err)=>{
      apiRes.message = 'Something went wrong while fetching the channel!'
      console.log(err);
    }).then(()=>{
      res.json(apiRes)
    })
  },
  newTeammate: (req,res,next)=>{
      let apiRes = JSON.parse(JSON.stringify(apiResponse))
      apiRes.data.user = res.locals.jwtUSER
      apiRes.message = 'Invalid arguments, please check the inputs!'
      apiRes.status = 400 // 400 Bad Request
      apiRes.authorization = true;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        response.message = errors.errors[0].param+" "+((errors.errors[0].msg=="Invalid value")?"is invalid, please check the value!":errors.errors[0].msg);
        return res.status(200).json(response);
      }
      addUser({
          username: (req.body.username?.length>4?req.body.username:funs.randomLetters(20)).replace(/[ ]+/g,'_'), 
          name: req.body.name,
          email: req.body.email,
          password: hashPassword(req.body.password),
          dashboard:res.locals.jwtUSER.dashboard
      }).then(async (data)=>{
        response.message = 'Account Created Successful!'
        response.status = 'ok';
      }).catch((err)=>{
        response.message = 'Couldn\'nt create the account!'
        if(err.code==11000){
            let exist = Object.keys(err.keyValue)[0]
            response.message = `${exist} is already exist!`
        }
        console.log(err);
      }).then(()=>{
        res.json(response)
      })
  }
  
}

//