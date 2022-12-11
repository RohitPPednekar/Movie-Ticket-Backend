const { responseHandler } = require("../services/response-handler.service");
const { statusCodeKeys, statusCodeMessage } = require("../config/constant");
const models = require("../models");

/*
*   Description: getLocations Controller for fetching all the locations
*   Input: None
*   Output: JSON (as Mentioned in Swagger API Doc)
*/
const getLocations = async (request, response)=>{
    try{
        const getLocations = await models.location.findAll();
        return responseHandler(response, statusCodeMessage.success, statusCodeKeys.successCreatedCode, getLocations);
    }catch(error){
        return responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
    }
};


/*
*   Description: postLocations Controller for creating new location entity
*   Input: JSON Body Param
*   Output: JSON (as Mentioned in Swagger API Doc)
*/
const postLocations = async (request, response)=>{
    try{
        const payload = request.body;
        const isPayloadValid = (payload && payload.locationPincode ? true : false );
        if(!isPayloadValid) return responseHandler(response, statusCodeMessage.badRequest, statusCodeKeys.badRequestCode);
        const createLocations = await models.location.create({location_pincode:payload.locationPincode});
        return responseHandler(response, statusCodeMessage.success, statusCodeKeys.successCode, createLocations); 
    }catch(error){
        return responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
    }
};


module.exports = {
    getLocations,
    postLocations
}