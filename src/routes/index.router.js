const router = require('express').Router();
const onBoardRouter = require('./onboard.router');
const locationRouter = require('./location.router');
const cinemaRouter = require('./cinema.router');
const showsRouter = require('./manage-shows.router');
const { routerEndPoints } = require('../config/constant');

router.use(routerEndPoints.onBoardURLPath, onBoardRouter);

router.use(routerEndPoints.locationsURLPath, locationRouter);

router.use(routerEndPoints.manageCinemaURLPath, cinemaRouter);

router.use(routerEndPoints.manageShowsURLPath, showsRouter);

module.exports = router;

