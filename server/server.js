import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173", process.env.CLIENT_ORIGIN]
  .filter(Boolean)
  .flatMap((value) => value.split(",").map((origin) => origin.trim()))
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.json({ message: "ShowCase API is running!" });
});

app.use("/api/products", productRoutes);

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Copy .env.example to .env and add your own Atlas connection string.");
  process.exitCode = 1;
} else {
  connectDB().then(() => {
    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
  });
}
