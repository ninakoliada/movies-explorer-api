const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/user');

const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-error');
const auth = require('./middlewares/auth');
const { createUserValidator, loginValidator } = require('./validators/userValidator');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.post('/signup', createUserValidator, createUser);
app.post('/signin', loginValidator, login);

app.use(auth);

app.use(userRouter);
app.use(movieRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

app.use(errors());

app.use(errorLogger);

app.use((error, req, res, _next) => {
  const { statusCode = 500, message = 'Что-то пошло не так' } = error;

  return res.status(statusCode).send({ message });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
