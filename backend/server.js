import { config } from "dotenv";
config({ path: "./.env" });

import express from "express";
import morgan from "morgan";
import conn from "./src/config/db.js";
import router from "./src/routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Task Api
app.use("/api", router);

app.get("/", (req, res) => res.send("<h1>Task App</h1>"));

// Start Server
const startServer = async () => {
  try {
    await conn();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Something Went Wrong ", err);
  }
};

startServer();
