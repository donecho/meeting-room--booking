import cors from "cors";
import express from "express";
import helmet from "helmet";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import AppError from "./utils/AppError.js";

const app = express();

/* =========================
   SECURITY MIDDLEWARE
========================= */
app.use(
  cors({
    origin: "https://meeting-room-booking-fawn.vercel.app",
    credentials: true,
  })
);
app.options("*", cors());

/* =========================
   BODY PARSER
========================= */

app.use(express.json());
app.use(helmet());
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