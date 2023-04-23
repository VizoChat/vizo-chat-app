let users = require('../../model/users')
let { check, validationResult } = require('express-validator');
const funs = require('../../helpers/funs');
const { hashPassword } = require('../../helpers/validation');

let apiResponse = {
    message: 'Authentication Failed!',
    authorization:false,
    status:400,//bad rqst,
    data:{}
  }


module.exports = {

  newTeammate: (req,res,next)=>{
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
    users.addUser({
        username: (req.body.username?.length>4?req.body.username:funs.randomLetters(20)).replace(/[ ]+/g,'_'), 
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password),
        dashboard:res.locals.jwtUSER.dashboard,
        avatar:{
          image:'default/asjkldsdf54sdfaskjifasd5sdfsdf3sdfsdfi_dflt.png',
          isUrl:false
        }
    }).then(async (data)=>{
      apiRes.message = 'Account Created Successful!'
      apiRes.status = 'ok';
    }).catch((err)=>{
      apiRes.message = 'Couldn\'nt create the account!'
      if(err.code==11000){
          let exist = Object.keys(err.keyValue)[0]
          apiRes.message = `${exist} is already exist!`
      }
      console.log(err);
    }).then(()=>{
      res.json(apiRes)
    })
    },
    getTeammates : (req,res,next)=>{
    let apiRes = JSON.parse(JSON.stringify(apiResponse))
    apiRes.data.user = res.locals.jwtUSER
    apiRes.message = 'Invalid arguments, please check the inputs!'
    apiRes.status = 400 // 400 Bad Request
    apiRes.authorization = true;
    let searchData = {
        dashboard:res.locals.jwtUSER.dashboard,
    }
    if(req.body.channel_id){
        searchData._id= req.body.channel_id
    }
    users.find(searchData,{password:0,'state.deleted':0,last_login:0, accessTo:0}).sort({'joined':-1})
    .then((data)=>{
        apiRes.data.teammates = data
        apiRes.message = 'Successfully fetch teammates!'
        apiRes.status = 'ok'
    }).catch((err)=>{
        apiRes.message = 'Something went wrong while fetching the teammates!'
        console.log(err);
    }).then(()=>{
        res.json(apiRes)
    })
    },
    

}

