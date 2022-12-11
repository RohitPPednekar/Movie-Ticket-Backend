const { responseHandler } = require("../services/response-handler.service");
const { statusCodeKeys, statusCodeMessage, customResponseMessage } = require("../config/constant");
const models = require("../models");

/*
*   Description: getAllCinemas Controller for fetching all Cinema JSON mapped with locations
*   Input: None
*   Output: JSON (as Mentioned in Swagger API Doc)
*/
const getAllCinemas = async (request, response)=>{
    try{
        const getCinemas = await models.cinema.findAll({include: [{model: models.location}]});
        return responseHandler(response, statusCodeMessage.success, statusCodeKeys.successCode, getCinemas);
    }catch(error){
        return responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
    }
};

/*
*   Description: postCinema Controller for creating cinema entity based on locations
*   Input: JSON Body Param
*   Output: JSON (as Mentioned in Swagger API Doc)
*/
const postCinema = async (request, response)=>{
    try{
        const payload = request.body;
        const isPayloadValid = (payload && payload.cinemaName && payload.locationPincode ? true : false );
        if(!isPayloadValid) return responseHandler(response, statusCodeMessage.badRequest, statusCodeKeys.badRequestCode);
        const getLocations = await models.location.findOne({ where: { location_pincode: payload.locationPincode}});
        if(!getLocations) return responseHandler(response, customResponseMessage.unknownPincode, statusCodeKeys.badRequestCode);
        const insertedCinema = await models.cinema.create({cinema_name: payload.cinemaName, locationId: getLocations.id});
        return responseHandler(response, statusCodeMessage.success, statusCodeKeys.successCode, insertedCinema); 
    }catch(error){
        return responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
    }
};


module.exports = {
    postCinema,
    getAllCinemas
}