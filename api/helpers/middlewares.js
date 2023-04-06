const { getUsersCount, getUser } = require("../model/users");

let apiResponse = {
    message: 'Seems you are not a human!',
    authorization:false,
    status:401,
    data:{}
  }

module.exports = {
    recaptcha:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        let data;
        if (Object.keys(req.query).length > 0) {
            data = req.query;
        } else {
            data = req.body;
        }
        fetch('https://www.google.com/recaptcha/api/siteverify',
            {
                method: "POST",
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${data.captchaToken}`,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
        )
        .then((data)=>{
            return data.json()
        })
        .then((data)=>{
            if(data.success==true){
                return next()
            }
            res.json(apiRes)
        })
    },
    verify_user:async(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))    
        let usercount = await getUsersCount({_id:res.locals.jwtUSER._id})
        if (usercount==1){
            next()
        }else{
            res.json(apiRes)
        }
    },
    verifyUser_forSocketIo : async (socket, next) => {
        //socket.handshake.query.user_id
        if(socket.apiRes.authorization && socket.jwtUSER){
            const apiRes = JSON.parse(JSON.stringify(apiResponse));
            const userCount = await getUsersCount({_id:socket.jwtUSER._id});
          
            if (userCount === 1) {
                next();
            } else {
                apiRes.message= 'We couldn\'t find any accounts related to you!';
                socket.apiRes.authorization = false;
                return socket.emit('error',apiRes.message)
            }
        }else if(socket.apiRes.authorization && socket.handshake.query.user_id){ //socket.handshake.query.user_id not exist!
            next()
        }else{
            next()
            // apiRes.message= 'Unauthorized access!';
            // socket.apiRes.authorization = false;
            // return socket.emit('error',apiRes.message)
        }
    }
}