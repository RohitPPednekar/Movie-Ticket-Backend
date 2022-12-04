const router = require('express').Router();
const onBoardRouter = require('./onboard.router');
const { routerEndPoints } = require('../config/constant');

router.use(routerEndPoints.onBoardURLPath, onBoardRouter);



module.exports = router;

