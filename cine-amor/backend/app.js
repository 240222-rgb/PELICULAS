const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const http = require('http');
const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=> res.status(200).send({
    message: 'Bienvenido a la API de Cine Amor',
}));

require('./routes/route_generos')(app);
require('./routes/route_usuarios')(app);
require('./routes/route_peliculas')(app);
require('./routes/route_favoritos')(app);
require('./routes/route_favorito_detalle')(app);
require('./routes/route_login')(app);

const port = parseInt(process.env.PORT, 10) || 8001;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
module.exports = app;
