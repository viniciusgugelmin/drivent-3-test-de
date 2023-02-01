class AppError {
  message;
  statusCode = 400;

  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
