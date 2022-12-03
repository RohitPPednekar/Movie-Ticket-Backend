
const statusCodeKeys = {
    successCode: 200,
    successCreatedCode: 201,
    notFoundCode: 404,
    badRequestCode: 400,
    unauthorizedCode: 401,
    internalServerCode: 500
};


const statusCodeMessage = {
    success: "Success!",
    successCreated: "Successfully Created New Resource!",
    notFound: "Page Not Found Error",
    badRequest: "Bad Request",
    unauthorized: "Unauthorized, Please login!",
    internalServer: "Internal Server Error"
};


const routerEndPoints = {

};

module.exports = {
    statusCodeKeys,
    statusCodeMessage,
    routerEndPoints
}