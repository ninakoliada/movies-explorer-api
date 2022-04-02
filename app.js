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

const { PORT = 3000, NODE_ENV, DB_NAME } = process.env;

const isProd = NODE_ENV === 'production';

mongoose.connect(`mongodb://localhost:27017/${isProd ? DB_NAME : 'moviesdb'}`, {
  useNewUrlParser: true,
});

const app = express();

app.use(helmet());
app.use(limitter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(require('./routes/registration'));

app.use(auth);

app.use(require('./routes/user'));
app.use(require('./routes/movie'));

app.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
