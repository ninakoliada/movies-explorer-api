const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { createMovieValidator, movieDeleteValidator } = require('../validators/moviesValidator');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidator, createMovie);
router.delete('/movies/:id', movieDeleteValidator, deleteMovie);

module.exports = router;
