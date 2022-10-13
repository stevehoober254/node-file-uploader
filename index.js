const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use('/res/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8080"
};
app.use(cors(corsOptions));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
