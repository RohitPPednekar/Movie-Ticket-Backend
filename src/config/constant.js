
const statusCodeKeys = {
    successCode: 200,
    successCreatedCode: 201,
    notFoundCode: 404,
    badRequestCode: 400,
    unauthorizedCode: 401,
    internalServerCode: 500,
    resourceUnsupportedCode: 501
};


const statusCodeMessage = {
    success: "Success!",
    successCreated: "Successfully Created New Resource!",
    notFound: "Page Not Found Error",
    badRequest: "Bad Request",
    unauthorized: "Unauthorized, Please login!",
    internalServer: "Internal Server Error",
    resourceUnsupported: "Resource Non Supported"
};

const customResponseMessage = {
    unknownPincode: "Unknown Pincode !",
    unknownMovie: "Unknown Movie !",
    unknownMovieShow: "Unknown Movie Show!",
    nonExistSeatCount: "Requested seats are not available!",
};


const routerEndPoints = {
    baseURLPath: '/',
    onBoardURLPath: '/auth',
    signupURLPath: '/sign-up',
    loginURLPath: '/login',
    locationsURLPath: '/location',
    locationsAccessURLPath: '/pincodes',
    manageCinemaURLPath: '/manage-cinema',
    getCinemaURLPath: '/cinemas',
    manageShowsURLPath: '/manage-shows',
    locationShowsURLPath: '/location-shows',
    cinemaShowsURLPath: '/cinema-shows',
    bookSeatsURLPath: '/book-seats',
    movieTicketAPIDocURLPath: '/ticket-api-doc',
};

module.exports = {
    statusCodeKeys,
    statusCodeMessage,
    routerEndPoints,
    customResponseMessage
}