var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var restaruantesRouter = require('./routes/restaurantes');
var reservasRouter = require('./routes/reservas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secreto', // Una cadena aleatoria para firmar la cookie de sesión (puede ser cualquier cosa)
  resave: false,
  saveUninitialized: true
}));

// Middleware para configurar res.locals
app.use((req, res, next) => {
  res.locals.userRole = req.session.userRole || null;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurantes', restaruantesRouter);
app.use('/reservas', reservasRouter);

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

// Crear el servidor HTTP
var http = require('http');
var server = http.createServer(app);

// Obtener el número de puerto
var port = process.env.PORT || 3001; // Utiliza el puerto definido por el sistema o el 3000 si no está definido

// Escuchar en el puerto
server.listen(port, function() {
  console.log('La aplicación está corriendo en el puerto ' + port);
});

module.exports = app;
