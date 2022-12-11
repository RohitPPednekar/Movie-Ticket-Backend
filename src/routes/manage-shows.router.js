const router = require('express').Router();
const { postMovieShows, getLocationShows, getAllCinemaShows } = require('../controllers/manage-shows.controller');
const { routerEndPoints } = require('../config/constant');

router.post(routerEndPoints.locationShowsURLPath, getLocationShows);

router.post(routerEndPoints.cinemaShowsURLPath, getAllCinemaShows);

router.post(routerEndPoints.baseURLPath, postMovieShows);




module.exports = router;

