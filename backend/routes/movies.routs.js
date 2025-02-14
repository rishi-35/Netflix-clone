
const express = require('express');
const { getTrendingMovie, getTrailers, getDetails, getSimilarMovies, getMoviesByCatogery } = require('../controlers/movies.controlers');
const router = express.Router(); // Use express.Router()

// Define routes
router.get('/trending', getTrendingMovie);
router.get('/:id/trailers', getTrailers);
router.get('/:id/details', getDetails);
router.get('/:id/similar', getSimilarMovies);
router.get('/:catogery', getMoviesByCatogery);

module.exports = router;
