const path = require('path');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//servidor express
const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// Directorio Publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Servidor
app.listen(process.env.PORT, () => {
	console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
