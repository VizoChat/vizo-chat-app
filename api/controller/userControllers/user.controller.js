
let users = require('../../model/users')
const multer = require('multer');
const path = require('path');
let { check, validationResult } = require('express-validator');
const channels = require('../../model/channels');
const chat_rooms = require('../../model/chat_rooms');
const funs = require('../../helpers/funs');
const { hashPassword } = require('../../helpers/validation');


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
      apiRes.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, please check the value!":errors.errors[0].msg)
      // return res.status(200).json(apiRes)
    }
    if(errors.errors.filter(e => e.param === 'email').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.email = req.body.email;
      console.log(req.body.email);
    }
    if(errors.errors.filter(e => e.param === 'username').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.username = req.body.username;
    }
    if(errors.errors.filter(e => e.param === 'name').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.name = req.body.name;
    }
    if(errors.errors.filter(e => e.param === 'password').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.password = hashPassword(req.body.password);
    }else{
      if(req.body.password?.length > 1 || req.body.rePassword?.length > 1 || req.body.currentPassword?.length > 1){
        dataToUpdate.canUpdate = false;
        let thisErr = errors.errors.filter(e => e.param === 'password')[0]
        apiRes.message = thisErr.param+((thisErr.msg=="Invalid value")?" is invalid, please check the value!":thisErr.msg)
      }
    }

    if(dataToUpdate.canUpdate){
      users.updateUser(res.locals.jwtUSER._id,dataToUpdate.data).then((data)=>{
        console.log(data);
        apiRes.message = Object.keys(dataToUpdate.data).toString().replace(/,/g,', ')+(Object.keys(dataToUpdate.data).length>1?' are':' is')+' updated successful!'
        apiRes.status = 'ok'
        if(dataToUpdate.data.password)delete dataToUpdate.data.password;
        apiRes.data.updated = {...dataToUpdate.data}
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
    res.locals.upload(req, res, function(err) {
      if (err) {
        apiRes.message = 'Error: Invalid type of file!'
        res.json(apiRes);
        console.log(err," Err#");
      } else {
        if (req.file == undefined) {
          apiRes.message = 'Error: No File Selected!'
          res.json(apiRes);
        } else {
          users.updateUser(res.locals.jwtUSER._id,{avatar:{image:req.file.filename,isUrl:false}}).then(()=>{
            apiRes.message = 'Profile updated successful!'
            apiRes.status = "ok"
            apiRes.data.updated = {avatar:{image:req.file.filename,isUrl:false}}
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
  
  
}
 