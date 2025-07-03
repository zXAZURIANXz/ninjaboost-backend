

const createError  = require('http-errors'),
	 		express 		 = require('express'),
	 		path 				 = require('path'),
	 		cookieParser = require('cookie-parser'),
	 		logger 			 = require('morgan'),
	 		connectDB 	 = require('./config/db'),
			cors 				 = require('cors');

const habitsRouter = require('./routes/habits');

const app = express();

//conectando a la base de datos
connectDB();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//endpoints
app.use('/habits', habitsRouter);

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
