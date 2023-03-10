let apiResponse = {
    message: 'Seems you are not a human!',
    authorization:false,
    status:401,
    data:{}
  }

module.exports = {
    recaptcha:(req,res,next)=>{
        let data;
        if (Object.keys(req.query).length > 0) {
            data = req.query;
        } else {
            data = req.body;
        }
        let _data = {
            secret:process.env.RECAPTCHA_SECRET_KEY,
            response:{'missing-input-secret':data.captchaToken}
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
            res.json(apiResponse)
            console.log(data);
        })
    }
}