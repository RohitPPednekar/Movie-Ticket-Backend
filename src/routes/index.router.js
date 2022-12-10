const router = require('express').Router();
const onBoardRouter = require('./onboard.router');
const locationRouter = require('./location.router');
const cinemaRouter = require('./cinema.router');
const { routerEndPoints } = require('../config/constant');

router.use(routerEndPoints.onBoardURLPath, onBoardRouter);

router.use(routerEndPoints.locationsURLPath, locationRouter);



module.exports = router;

