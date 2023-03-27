const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const widgetRouter = require('./routes/widget');
const dotenv = require('dotenv')

const app = express();
dotenv.config()


mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_SECRET).then(()=>{
  console.log('Database connected... ['+process.env.DB_SECRET+']')
  // next()
})
.catch((err)=>{
  console.log(err)
  // next(createError(500))
})
const corsOptions = {
  origin: process.env.CORS_ALLOWED_URL,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('etag', false)//cache block

app.use((req, res, next) => {//cache block
  res.set('Cache-Control', 'no-store')
  next()
})
console.log('Cors:',corsOptions);
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req,res,next)=>{ //temperary lag for response!
//   let timerLeft = 2000
//   setInterval(() => {
//     if(timerLeft==0){
//       next()
//     }
//     timerLeft -= 1000;
//   }, 1000);
// })
app.use('/',  userRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/widget', widgetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: 'Ooops, sorry! We couldn\'t process your request',
    status:err.status || 500
  });
});

module.exports = app;
