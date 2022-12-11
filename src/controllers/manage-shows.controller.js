const { Op } = require("sequelize");
const { isValidShowsPayload, getShowStartTime, getShowEndTime } = require("../utils/helper");
const { responseHandler } = require("../services/response-handler.service");
const { statusCodeKeys, statusCodeMessage, customResponseMessage } = require("../config/constant");
const models = require("../models");

/*
*   Description: getLocationShows Controller for fetching movie shows based on locations
*   Input: JSON Body Param
*   Output: JSON (as Mentioned in Swagger API Doc)
*/
const getLocationShows = async (request, response)=>{
    try{
        const payload = request.body;
        const isPayloadValid = (payload && payload.locationPincode ? true : false );
        if(!isPayloadValid) return responseHandler(response, statusCodeMessage.badRequest, statusCodeKeys.badRequestCode);
        const getLocationBasedShows = await models.location.findAll({
            where: {location_pincode: payload.locationPincode},
            attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
            include: [{
                model: models.cinema,
                required: true,
                subQuery: false,
                attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
                include: [{
                    model: models.movieShows,
                    required: true,
                    subQuery: false,
                    attributes: ['movie_show'],
                }]
            }]
        });                                                                                     
        return responseHandler(response, statusCodeMessage.success, statusCodeKeys.successCode, getLocationBasedShows);
    }catch(error){
        return responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
    }
};


/*
*   Description: getAllCinemaShows Controller for fetching movie shows based on all the cinemas
*   Input: JSON Body Param
*   Output: JSON (as Mentioned in Swagger API Doc)
*/
const getAllCinemaShows = async (request, response)=>{
    try{
        const payload = request.body;
        const isPayloadValid = (payload && payload.currentDate && payload.currentTime ? true : false );
        if(!isPayloadValid) return responseHandler(response, statusCodeMessage.badRequest, statusCodeKeys.badRequestCode);
        payload.currentUserTime = getShowStartTime(payload.currentDate, payload.currentTime); 
        const getMoviesShows = await models.cinema.findAll({
            attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
            include: [{
                model: models.movieShows,
                where: {
                    movie_show_end_time: {
                        [Op.gt]: payload.currentUserTime
                    }
                  },
                required: true,
                subQuery: false,
                attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
            }]
        });                                                                                     
        return responseHandler(response, statusCodeMessage.success, statusCodeKeys.successCode, getMoviesShows);
    }catch(error){
        return responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
    }
};

/*
*   Description: postMovieShows Controller for creating new movie show entity based on the Cinema
*   Input: JSON Body Param
*   Output: JSON (as Mentioned in Swagger API Doc)
*/
const postMovieShows = async (request, response)=>{
    try{
        const payload = request.body;
        payload.movie_show_time = getShowStartTime(payload.movieDate, payload.movieTime); 
        payload.movie_show_end_time = getShowEndTime(payload.movie_duration_time, payload.movie_show_time);
        const isPayloadValid = isValidShowsPayload(payload);
        if(!isPayloadValid) return responseHandler(response, statusCodeMessage.badRequest, statusCodeKeys.badRequestCode);
        const getCinema = await models.cinema.findOne({ where: { id: payload.cinemaId}});
        if(!getCinema) return responseHandler(response, customResponseMessage.unknownMovie, statusCodeKeys.badRequestCode);
        const movieShows = await models.movieShows.create(payload);
        return responseHandler(response, statusCodeMessage.success, statusCodeKeys.successCode, movieShows); 
    }catch(error){
        return responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
    }
};


/*
*   Description: postBookMovieShows Controller for booking movie show tickets in the Cinema
*   Input: JSON Body Param
*   Output: JSON (as Mentioned in Swagger API Doc)
*/
const postBookMovieShows = async (request, response)=>{
    try{
        const payload = request.body;
        const isPayloadValid = (payload && parseInt(payload.seats) && parseInt(payload.movieShowId) ? true : false );
        if(!isPayloadValid) return responseHandler(response, statusCodeMessage.badRequest, statusCodeKeys.badRequestCode);
        const getMovieShow = await models.movieShows.findOne({ where: { id: parseInt(payload.movieShowId)}});
        if(!getMovieShow) return responseHandler(response, customResponseMessage.unknownMovieShow, statusCodeKeys.badRequestCode);
        if(getMovieShow.seats < payload.seats) return responseHandler(response, customResponseMessage.nonExistSeatCount, statusCodeKeys.badRequestCode);
        let seatsCount = getMovieShow.seats - payload.seats;
        const movieShowsUpdated = await models.movieShows.update(
            { seats:  seatsCount},
            { where: { id: parseInt(payload.movieShowId) } }
        );
        return responseHandler(response, statusCodeMessage.success, statusCodeKeys.successCode, movieShowsUpdated); 
    }catch(error){
        return responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
    }
};

module.exports = {
    getLocationShows,
    postMovieShows,
    getAllCinemaShows,
    postBookMovieShows
}