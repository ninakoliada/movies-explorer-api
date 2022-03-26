module.exports = (error, req, res, _next) => {
  const { statusCode = 500, message = 'Что-то пошло не так' } = error;

  return res.status(statusCode).send({ message });
};
