const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const indexRouter = require('./routes/indexRoute');
const usersRouter = require('./routes/usersRoute');
const authRouter = require('./routes/authRoute');
const passportConfig = require('./controllers/passport-config');

const app = express();

// Base path for application deployment
const basePath = '';

// Middleware to set basePath globally
app.use((req, res, next) => {
  res.locals.basePath = basePath;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use method-override middleware
app.use(methodOverride('_method'));

// Session config
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Use flash middleware
app.use(flash());

// passport init
app.use(passport.initialize());
app.use(passport.session());

// Load passport config
passportConfig(passport);

// Middleware to handle flash messages
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// use auth router before other routers to handle auth
app.use(authRouter);

// Middleware for auth
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/login');
}

// Route definitions
app.use(`${basePath}/`, indexRouter);
app.use(`${basePath}/users`, usersRouter);
app.use('/favicon.ico', express.static('public/favicon.ico'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('ejs') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error ' + `${err.status}` });
});

module.exports = app;
