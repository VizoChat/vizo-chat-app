let { check, validationResult } = require('express-validator');
const jwt = require('../helpers/jwt');
const { hashPassword } = require('../helpers/validation');
const { addUser, getUser, validateUser, validateUserWithEmail } = require('../model/users')
const {OAuth2Client} = require('google-auth-library');
const {randomLetters} = require('../helpers/funs');
const { validateAdmin } = require('../model/admins');
const { build_dash } = require('../model/dashboard');

module.exports= {
  signup: (req,res,next)=>{
      let dash_id = randomLetters(15)
      let response = {
          message: 'Something went wrong!',
          status:'error',
          data:{}
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        response.message = errors.errors[0].param+" "+((errors.errors[0].msg=="Invalid value")?"is invalid, please check the value!":errors.errors[0].msg);
        return res.status(200).json(response);
      }
      console.log(req.body);
      addUser({
          username: req.body.username.replace(/[ ]+/g,'_'),
          name: req.body.name,
          email: req.body.email,
          password: hashPassword(req.body.password),
          dashboard:dash_id
    }).then(async (data)=>{
      await build_dash({uid:data._id,dash_id})
      console.log(data,"Database Result after adding!!!!");
      let token = jwt.sign({
        _id:data._id,
        username:data.username,
        dashboard:data.dashboard

      })
      response.data = token;
      response.message = 'Account Created Successful!'
      response.status = 'ok';
    }).catch((err)=>{
      response.message = 'Authentication error!'
      if(err.code==11000){
          let exist = Object.keys(err.keyValue)[0]
          response.message = `${exist} is already exist!`
      }
      console.log(err);
    }).then(()=>{
      res.json(response)
    })
    
  },
  login:async (req,res,next)=>{
    let response = {
      message: 'Authentication Failed!',
      status:401,
      data:{}
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response.message = (errors.errors[0].msg=="Invalid value")?errors.errors[0].param+" is invalid, please check the value!":errors.errors[0].msg
      return res.status(200).json(response)
    }
    let uData = await validateUser(req.body); //false or userdata
    if(uData){
      let token = jwt.sign({
        _id:uData._id,
        username:uData.username,
        dashboard:uData.dashboard
      })
      response.data = token;
      response.message = 'Login Successful!'
      response.status = 'ok';
      return res.json(response)
    }else{
      return res.status(200).json(response)
    }
  },
  admin:async(req,res,next)=>{
    let response = {
      message: 'Authentication Failed!',
      status:401,
      data:{}
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, please check the value!":errors.errors[0].msg)
      return res.status(200).json(response)
    }
    let AdminData = await validateAdmin(req.body)
    if( AdminData){
      let token = jwt.sign({
        _id:AdminData._id,
        username:AdminData.username,
        role:'admin'
      })
      response.data = token;
      response.message = 'Login Successful!'
      response.status = 'ok';
      return res.json(response)
    }else{
      return res.status(200).json(response)
    }
  },
  tokenGen:(req,res,next)=>{
    let response = {
      message: 'Authentication Failed!',
      status:401,
      authorization:false,
      data:{}
    }
    const newToken = jwt.generateAccessTkn(req)
    if(newToken.error){
      return res.status(200).json(response)
    }else{
      response.message = 'Access Token Generated Successful!'
      response.status = 'ok';
      response.data = newToken.data;
      response.authorization = true;
      return res.json(response)
    }
  },
  googleSignin:async(req,res,next)=>{
    let response = {
      message: 'Authentication Failed!',
      status:401,
      data:{}
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response.message = errors.errors[0].param+((errors.errors[0].msg=="Invalid value")?" is invalid, please check the value!":errors.errors[0].msg)
      return res.status(200).json(response)
    }
    const client = new OAuth2Client(process.env.GAUTH_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.GAUTH_CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    const userId = payload.sub;
    const userProfile = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };
    let uData = await validateUserWithEmail(userProfile.email); //false or userdata
    if(uData){
      let token = jwt.sign({
        _id:uData._id,
        username:uData.username,
        dashboard:uData.dashboard
      })
      response.data = token;
      response.message = 'Login Successful!'
      response.status = 'ok';
      return res.json(response)
    }else{
      return res.status(200).json(response)
    }
  },
  googleSignup:async(req,res,next)=>{
    let dash_id = randomLetters(15)
    let response = {
        message: 'Something went wrong!',
        status:'error',
        data:{}
    }
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      response.message = errors.errors[0].param+" "+((errors.errors[0].msg=="Invalid value")?"is invalid, please check the value!":errors.errors[0].msg);
      return res.status(200).json(response);
    }
    const client = new OAuth2Client(process.env.GAUTH_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.GAUTH_CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    const userId = payload.sub;
    const userProfile = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };
    addUser({
        username: userProfile.email.split('@')[0].replace(/[ ]+/g,'_').toString()+"_"+randomLetters(6),
        name: userProfile.name,
        email: userProfile.email,
        password: 'nopass', 
        dashboard:dash_id
      }).then(async (data)=>{
        await build_dash({uid:data._id,dash_id})
        console.log(data,"Database Result after adding!!!!");
        let token = jwt.sign({
          _id:data._id,
          username:data.username,
          dashboard:data.dashboard
        })
        response.data = token;
        response.message = 'Account Created Successful!'
        response.status = 'ok';
      }).catch((err)=>{
        response.message = 'Authentication error!'
        if(err.code==11000){
            let exist = Object.keys(err.keyValue)[0]
            response.message = `${exist} is already exist!`
        }
        console.log(err);
      }).then(()=>{
        res.json(response)
      })
      
    },
}