const express  = require('express');
const fs  = require('fs');
const app = express();
const {responseHandler} = require('./src/services/response-handler.service');
const { routerEndPoints, statusCodeKeys, statusCodeMessage } = require('./src/config/constant');
const indexRouter = require('./src/routes/index.router');
const db = require("./src/models");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger/swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/public/swagger/swagger.css"), 'utf8');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.use(routerEndPoints.baseURLPath, indexRouter);


app.use((error, request, response, next) => {
    responseHandler(response, statusCodeMessage.internalServer, statusCodeKeys.internalServerCode, null, error);
});


process.on('unhandledRejection', (error) => {
    throw new Error(error);
});
   
process.on('uncaughtException', (error) => {
    throw new Error(error);
});


app.use('*', (request, response) => {
    responseHandler(response, statusCodeMessage.notFound, statusCodeKeys.notFoundCode);
});


module.exports = app;

