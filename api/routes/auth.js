
const authController = require('../controller/authController');
const middlewares = require('../helpers/middlewares');
const { signupValidate, loginValidate, googleloginValidate } = require('../helpers/validation');
let router = require('express').Router()

router.post('/signup',middlewares.recaptcha, signupValidate, authController.signup)
router.post('/login',middlewares.recaptcha, loginValidate,  authController.login)
router.get('/generate-token', loginValidate,  authController.tokenGen)
router.post('/admin', middlewares.recaptcha, loginValidate,  authController.admin)
router.post('/google-signin', googleloginValidate,  authController.googleSignin)
router.post('/google-signup', googleloginValidate,  authController.googleSignup)


module.exports = router;