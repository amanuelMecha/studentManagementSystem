var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
const fs = require('fs')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const studentsRouter = require('./routes/students')
const studentsCopyRouter = require('./routes/studentsCopy');
const authRouter = require('./routes/auth');
var bcrypt = require('bcrypt');

const uaa = require('./middlewares/uaa');
const cors = require('cors')
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


const client = new MongoClient('mongodb+srv://aman:12345@cluster0.lubd1.mongodb.net', { useUnifiedTopology: true })
let connection;


app.use('/', function (req, res, next) {
  if (!connection) {
    console.log('connecting to mongoDB')
    client.connect(function (err) {
      // connections = client.db('lab6');
      connection = client.db('studentManagementSystem');
      req.db = connection
      next()
    })
  } else {
    req.db = connection;
    next()
  }

})

app.use(uaa.checkToken)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)

// app.use('/students', studentsRouter);
app.use('/api/v1/students', studentsCopyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
app.listen(5000, function () {
  console.log('run on port 5000')
})
