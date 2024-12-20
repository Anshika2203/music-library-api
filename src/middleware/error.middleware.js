export const errorHandler = (err, req, res, next) => {
    const error = {
      statusCode: err.statusCode || 500,
      message: err.message || 'Internal Server Error',
    };
  
    // MongoDB duplicate key error
    if (err.code === 11000) {
      error.statusCode = 409;
      error.message = 'Duplicate field value entered';
    }
  
    // Validation error
    if (err.name === 'ValidationError') {
      error.statusCode = 400;
      error.message = Object.values(err.errors).map(val => val.message).join(', ');
    }
  
    // Cast error (invalid ObjectId)
    if (err.name === 'CastError') {
      error.statusCode = 400;
      error.message = 'Resource not found';
    }
  
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  };