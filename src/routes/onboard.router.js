const router = require('express').Router();
const {signUpController, loginController} = require('../controllers/onboard.controller');
const { routerEndPoints } = require('../config/constant');

router.post(routerEndPoints.signupURLPath, signUpController);

router.post(routerEndPoints.loginURLPath, loginController);




module.exports = router;

