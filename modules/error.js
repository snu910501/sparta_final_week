class errorMiddleware extends Error {
  constructor(httpStatus, errorMessage, ...params) {
    super(...params)
    this.errorMessage = errorMessage;
    this.status = httpStatus;
    this.date = new Date();
  };
}

module.exports = errorMiddleware;