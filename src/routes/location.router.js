const router = require('express').Router();
const {getLocations, postLocations} = require('../controllers/manage-locations.controller');
const { routerEndPoints } = require('../config/constant');

router.get(routerEndPoints.locationsAccessURLPath, getLocations);

router.post(routerEndPoints.baseURLPath, postLocations);




module.exports = router;

