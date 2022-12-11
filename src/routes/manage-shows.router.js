const router = require('express').Router();
const { postMovieShows, getLocationShows, getAllCinemaShows, postBookMovieShows } = require('../controllers/manage-shows.controller');
const { routerEndPoints } = require('../config/constant');
const { isValidUser } = require('../utils/helper');

router.post(routerEndPoints.locationShowsURLPath, getLocationShows);

router.post(routerEndPoints.cinemaShowsURLPath, getAllCinemaShows);

router.post(routerEndPoints.baseURLPath, postMovieShows);

router.post(routerEndPoints.bookSeatsURLPath, isValidUser, postBookMovieShows);


module.exports = router;

