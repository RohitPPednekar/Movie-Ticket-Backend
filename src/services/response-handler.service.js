
// Handle response appropriately
exports.responseHandler = (response, message, statusCode = 500, data = {}, error ) => {
    const responsePayload = {
      message,
      data: data
    }
    if(error) responsePayload['Error'] = error;
    response.status(statusCode).json(responsePayload);
};