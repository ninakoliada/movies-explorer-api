module.exports = (error, req, res, _next) => {
  const { statusCode = 500, message } = error;

  return res.status(statusCode).send({ message: statusCode === 500 ? 'Что-то пошло не так' : message });
};
