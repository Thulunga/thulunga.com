import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { careersRouter } from "./routes/careers";
import { usersRouter } from "./routes/users";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      process.env.NEXT_PUBLIC_CAREERS_URL || "http://localhost:3001",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "thulunga-api" });
});

// Routes
app.use("/api/careers", careersRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Thulunga API running on port ${PORT}`);
});
