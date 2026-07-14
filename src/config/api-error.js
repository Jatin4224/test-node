class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; //google
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "bad request") {
    return new ApiError(400, message);
  }

  static unauthorized(message = "unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "not found") {
    return new ApiError(404, message);
  }

  static internal(message = "internal server error") {
    return new ApiError(500, message);
  }

  static from(err) {
    if (err instanceof ApiError) return err;

    if (err.code === 11000) return ApiError.badRequest("Email already exists");

    if (err.name === "CastError") return ApiError.badRequest("Invalid ID");

    if (err.name === "ValidationError" || err.name === "Error") {
      return ApiError.badRequest(err.message);
    }
    return ApiError.internal(err.message);
  }
}

export default ApiError;
