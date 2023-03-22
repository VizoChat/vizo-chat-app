

const fs = require('fs')
const slug = require('slug')
const funs = require('../helpers/funs')

let apiResponse = {
    message: 'Authentication Failed!',
    authorization:false,
    status:401,
    data:{}
  }
module.exports = {
    widget:(req,res,next)=>{
        let widget_env = {
            apiKey:slug(req.params.channelid),
            vizochat_host:process.env.VIZOCHAT_BASE_URL,
            randomGen:(num)=>{
                return funs.randomLetters(num)
            },
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
      }
}