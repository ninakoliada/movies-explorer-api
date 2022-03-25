const Movies = require('../models/movie');

const getMovies = async (req, res, next) => {
  try {
    const data = await Movies.find();

    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
      trailerLink,
    } = req.body;

    const movie = await Movies.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
      trailerLink,
    });

    return res.send(movie);
  } catch (error) {
    return next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movies.findOne({ _id: req.params.id });

    if (!movie) {
      return next('Запрашиваемый фильм не найден');
    }

    await movie.remove();
    return res.send(movie);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
