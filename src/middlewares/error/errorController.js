const handleDuplicateErrorDB = (err, req, res) => {
  let errorMessage = `There is users with this `;

  err.meta['target'].forEach(item => (errorMessage += `${item}`));

  return res.status(err.statusCode).json({
    status: err.status,
    message: errorMessage,
  });
};
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    if (err.name === 'PrismaClientKnownRequestError' && err.code === 'P2002') {
      handleDuplicateErrorDB(err, req, res);
    } else sendErrorDev(err, req, res);
  }
};

export default errorController;
