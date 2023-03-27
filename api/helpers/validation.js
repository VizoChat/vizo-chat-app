let { check, validationResult } = require('express-validator');
let bcrypt = require('bcrypt')



  module.exports = {
    signupValidate : [
      check('username').isLength({ min: 4 }).withMessage("is invalid, must contain minimum of 4 letters").trim(),
      check('name').isLength({ min: 3 }).withMessage("is invalid, must contain minimum of 3 letters").trim(),
      check('email').isEmail().normalizeEmail().withMessage("is invalid, must be a valid format!").trim(),
      check('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long').trim().custom((value, { req }) => {
        if(value !== req.body.repassword) {
          return Promise.reject('didn\'t match, please recheck the password');
        }else{
          return Promise.resolve()
        }
      }),
    ],
    userUpdateValidate : [
      check('username')?.isLength({ min: 4 }).trim().withMessage(" is invalid, must contain minimum of 4 letters"),
      check('name')?.isLength({ min: 3 }).trim().withMessage(" is invalid, must contain minimum of 3 letters"),
      check('email')?.isEmail().normalizeEmail().withMessage(" is invalid, must be a valid format!").trim(),
      check('password')?.isLength({ min: 8 }).withMessage(' must be at least 8 chars long').trim().custom((value, { req }) => {
        if(value !== req.body.repassword) {
          return Promise.reject(' didn\'t match, please recheck the password');
        }else{
          return Promise.resolve()
        }
      }),
    ],
    loginValidate : [
      check('user').isLength({ min: 4 }).withMessage(' is not valid!').trim(),
      check('password').isLength({ min: 8 }).withMessage(' is not valid!').trim()
    ],
    googleloginValidate : [
      check('token').isLength({ min: 4 }).withMessage('Authentication token is invalid!').trim(),
    ],
    validateEmail : (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    hashPassword:  (plaintextPassword)=>{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(plaintextPassword, salt);
        return hash
           
    },
    hashPasswordvalidate : async (plaintextPassword, hash)=> {
        const result = await bcrypt.compare(plaintextPassword, hash)
        return result;
    },
    newChannel:[
      check('channelName').isLength({ min: 4 }).withMessage(' should contain at least 4 characters!'),
      check('channelDomain').isLength({ min: 4 }).withMessage(' must be a valid one!').trim()
    ],
    editChannel:[
      check('channelName').isLength({ min: 4 }).withMessage(' should contain at least 4 characters!'),
      check('channelDomain').isLength({ min: 4 }).withMessage(' must be a valid one!').trim(),
      check('channel_id').isLength({ min: 24 , max: 24}).withMessage(' must be a valid one!').trim()
    ],
    delChannel:[
      check('channel_id').isLength({ min: 24 , max: 24 }).withMessage(' must be a valid one!').trim()
    ],
    getChatRoom:[
      check('apiKey').isLength({ min: 24 , max: 24 }).withMessage(' must be a valid one!').trim(), //channelid
      check('userId').isLength({ min: 10 , max: 50 }).withMessage(' must have 10-50 chars').trim(),
    ],
    newChatRoom:[
      check('apiKey').isLength({ min: 24 , max: 24 }).withMessage(' must be a valid one!').trim(), //channelid
      check('ds_key').isLength({ min: 20 , max: 20}).withMessage(' must be a valid one!').trim(), //dashboard key
      check('userId').isLength({ min: 10 , max: 50 }).withMessage(' must have 10-50 chars').trim(),
      check('username').trim(),
      check('custom_data').trim(),
    ]
  }