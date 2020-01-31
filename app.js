const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const reload = require('reload'); 
const mongoose = require('mongoose'); 

const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');

const passport = require("passport");
const passportJWT = require("passport-jwt");

const UserModel = require('./src/users/model'); 
const AuthModel = require('./src/oauth/model');

const JwtStrategy = passportJWT.Strategy,
      ExtractJwt = passportJWT.ExtractJwt;

const app = express();

reload(app) 

///////////////////
// Auth Strategy //
///////////////////
 
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.API_SECRET;
jwtOptions.passReqToCallback = true;
 
const strategy = new JwtStrategy( jwtOptions , (req, jwt_payload, next) => { 
    let ctoken = ((req.headers.authorization.split(' '))[1])
    AuthModel.find({
      users_id: jwt_payload.id,
      token: ctoken,
      is_valid: true
    }, (err, htoken) => { 
      if (err) { return next(err); } 
            if (!htoken.length) {  return next(null, false);  } 
            UserModel.find(
              { _id : jwt_payload.id }
              , (err, user) => {
                // console.log(user)
              if (err) { return next(err); }
              if (!user.length) { return next(null, false); }
              user = user.shift()
            return next(null, user);
          }); 
    });
  //
}); 

passport.use('jwt', strategy);

// mongoose setup
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '4096mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '4096mb', extended: true }));

app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'apidoc'))); 

app.use('/web', webRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page 
  res.status(err.status || 500);
  res.render('error');
});







module.exports = app;
