const express = require('express');
const app = express();
const lab11modulo1 = require('./routes/lab11modulo1');


app.set('view engine', 'ejs');
app.set('views', 'views');


const session = require('express-session');
app.use(session({
  secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', lab11modulo1);

//Middleware
app.use((request, response, next) => {
  console.log('Middleware!');
  next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

const rutasClases = require('./routes/clases.routes');
app.use('/', rutasClases);

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const rutasUsuarios = require('./routes/users.routes');
app.use('/users', rutasUsuarios);

app.use((request, response, next) => {
  response.status(404);
  response.sendFile(path.join(__dirname, 'views', '404.html')); //Manda la respuesta
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3001');
});
