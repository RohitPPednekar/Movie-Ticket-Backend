const router = require('express').Router();
const { postCinema, getAllCinemas } = require('../controllers/manage-cinema.controller');
const { routerEndPoints } = require('../config/constant');

router.get(routerEndPoints.getCinemaURLPath, getAllCinemas);

router.post(routerEndPoints.baseURLPath, postCinema);




module.exports = router;

