require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const NotFoundError = require('./errors/not-found-error');
const auth = require('./middlewares/auth');
const limitter = require('./middlewares/limitter');

const {
  PORT = 3000,
  NODE_ENV,
  DB_NAME,
  DB_HOST,
  DB_PORT,
} = process.env;

const isProd = NODE_ENV === 'production';

const dbURL = isProd
  ? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
  : 'mongodb://localhost:27017/moviesdb';

mongoose.connect(dbURL, {
  useNewUrlParser: true,
});

const app = express();

app.use(helmet());
app.use(requestLogger);
app.use(limitter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(require('./routes/registration'));

app.use(auth);

app.use(require('./routes/user'));
app.use(require('./routes/movie'));

app.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
