export const catchError = (err , statusCode, errorMessage) => {
    console.log(err);
    res.status(statusCode).json({
        message: errorMessage
    })
}