const { isValidLoginPayload, isValidSignUpPayload } = require("../utils/helper");
const { responseHandler } = require("../services/response-handler.service");
const { statusCodeKeys, statusCodeMessage } = require("../config/constant");
const { getToken, comparePassword, hashPassword } = require("../utils/helper");
const models = require("../models");


const signUpController = async (request, response)=>{
    try{
        const payload = request.body;
        const isPayloadValid = isValidSignUpPayload(payload);
        if(!isPayloadValid) return responseHandler(response, statusCodeMessage.badRequest, statusCodeKeys.badRequestCode)
        payload.password = await hashPassword(payload.password);
        const userSignedUp = await models.user.create(payload);
        return responseHandler(response, statusCodeMessage.success, statusCodeKeys.successCreatedCode, userSignedUp);
    }catch(error){
        return responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
    }
};

const loginController = async (request, response)=>{
    try{
        const payload = request.body;
        const isPayloadValid = isValidLoginPayload(payload);
        if(!isPayloadValid) return responseHandler(response, statusCodeMessage.badRequest, statusCodeKeys.badRequestCode);
        const fetchUser = await models.user.findOne({
            where: {
                email: payload.email,
            }
        });
        if(fetchUser){ 
            let isValidPassword = await comparePassword(payload.password, fetchUser.password);
            if(!isValidPassword){
                return responseHandler(response, statusCodeMessage.unauthorized, statusCodeKeys.unauthorizedCode);
            }   
            const responsePayload = {
                token : getToken(fetchUser.email)
            }   
            return responseHandler(response, statusCodeMessage.success, statusCodeKeys.successCode, responsePayload); 
        }
        return responseHandler(response, statusCodeMessage.unauthorized, statusCodeKeys.unauthorizedCode);
    }catch(error){
        return responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
    }
};

module.exports = {
    signUpController,
    loginController
}