import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import AppError from "./utils/AppError.js";

const app = express();

/* =========================
   SECURITY MIDDLEWARE
========================= */

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

/* =========================
   BODY PARSER
========================= */

app.use(express.json());

/* =========================
   HEALTH CHECK
========================= */

app.get("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Connected",
  });
});

/* =========================
   ROUTES
========================= */

app.use("/api", routes);

/* =========================
   404 HANDLER
========================= */

app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use(errorHandler);

export default app;