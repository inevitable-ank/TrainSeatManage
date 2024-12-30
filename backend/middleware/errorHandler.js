exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
  
    res.status(statusCode).json({ error: message });
  };
  