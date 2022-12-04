const router = require('express').Router();
const {signUpController} = require('../controllers/onboard.controller');
const { routerEndPoints } = require('../config/constant');

router.get(routerEndPoints.signupURLPath, signUpController);




module.exports = router;

