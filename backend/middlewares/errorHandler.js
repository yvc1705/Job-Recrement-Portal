const errorHandler = (err, req, res, next) => {
    // Default to 500 if no status code
    const statusCode = err.statusCode || 500;
    
    // Standard error response format
    const errorResponse = {
        success: false,
        error: {
            type: err.name || 'InternalServerError',
            message: err.message || 'Something went wrong',
            code: statusCode,
            timestamp: new Date().toISOString(),
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    };

    // Handle specific error types
    switch(err.name) {
        case 'ValidationError':
            errorResponse.error.details = err.errors;
            break;
        case 'MongoError':
            // Handle MongoDB errors
            if (err.code === 11000) {
                errorResponse.error.type = 'DuplicateKeyError';
                errorResponse.error.message = 'Duplicate field value entered';
            }
            break;
    }

    // Log the error
    console.error(`[${new Date().toISOString()}] ${statusCode} ${err.message}`);

    // Send response
    res.status(statusCode).json(errorResponse);
};

export default errorHandler;
