import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import articleRoute from "./routes/articlesRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Create a HTTP server
const server = http.createServer(app);

// Initialise Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ extended: true }));

// Routes
app.use("/api/save-articles", articleRoute);

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Attach Socket.io instance to app
app.set("socketio", io);

server.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
