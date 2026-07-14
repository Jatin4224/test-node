class ApiResponse {
  static ok(res, message, data = null) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  static created(res, message, data = null) {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  static noContent(res) {
    return res.status(204).send();
  }

  static error(res, err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: err.message,
    });
  }
}

export default ApiResponse;
