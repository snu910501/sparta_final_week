class customError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
    this.name = 'customError';
  }
}
module.exports = {
  customError,
};
