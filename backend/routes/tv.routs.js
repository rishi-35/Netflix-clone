
const express = require('express');
const { getTrendingTv, getTrailers, getDetails, getSimilartvs, gettvsByCatogery } = require('../controlers/tv.controlers');
const router = express.Router(); // Use express.Router()

// Define routes
router.get('/trending', getTrendingTv);
router.get('/:id/trailers', getTrailers);
router.get('/:id/details', getDetails);
router.get('/:id/similar', getSimilartvs);
router.get('/:catogery', gettvsByCatogery);

module.exports = router;
