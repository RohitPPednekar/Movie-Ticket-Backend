const express    = require('express');
const app        = express();
const {responseHandler}        = require('./src/services/response-handler.service');
const constants        = require('./src/config/constant');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (request, response)=>{
response.send("hello world")
})


app.use((error, request, response, next) => {
    responseHandler(response, constants.statusCodeMessage.internalServer, constants.statusCodeKeys.internalServerCode, null, error);
});


process.on('unhandledRejection', (error) => {
    throw new Error(error);
});
   
process.on('uncaughtException', (error) => {
    throw new Error(error);
});


app.use('*', (request, response) => {
    responseHandler(response, constants.statusCodeMessage.notFound, constants.statusCodeKeys.notFoundCode);
});


module.exports = app;

