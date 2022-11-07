function ServerError(status, message) {
  this.status = status;
  this.message = message;
}

module.exports = ServerError;
