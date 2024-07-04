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
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cors());
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

server.getConnections("/", async (req, res) => {
  try {
    res.status(200).send("Server is running");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

server.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
