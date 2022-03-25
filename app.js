const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/user');

const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);

app.use(userRouter);
app.use(movieRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

app.use(errorLogger);

app.use((error, req, res, _next) => {
  const { statusCode = 500, message = 'Что-то пошло не так' } = error;

  return res.status(statusCode).send({ message });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
