import AppError from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  /* =========================
     DEFAULT VALUES
  ========================= */
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  /* =========================
     MONGODB INVALID OBJECT ID
  ========================= */
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  /* =========================
     DUPLICATE KEY ERROR
  ========================= */
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    statusCode = 409;
    message = `${field} already exists`;
  }

  /* =========================
     MONGOOSE VALIDATION ERROR
  ========================= */
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  /* =========================
     JWT INVALID
  ========================= */
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token";
  }

  /* =========================
     JWT EXPIRED
  ========================= */
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authentication token expired";
  }

  /* =========================
     DEVELOPMENT RESPONSE
  ========================= */
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      status: statusCode,
      message,
      error: err,
      stack: err.stack,
    });
  }

  /* =========================
     PRODUCTION RESPONSE
  ========================= */
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      status: statusCode,
      message,
    });
  }

  // Unknown / programming errors
  console.error("ERROR 💥", err);

  return res.status(500).json({
    success: false,
    status: 500,
    message: "Something went wrong",
  });
};