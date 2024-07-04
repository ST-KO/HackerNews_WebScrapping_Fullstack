import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { saveHackerNewsArticles } from "./saveHackerNewsArticle.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 3000;

// Create a HTTP server
const server = http.createServer(app);

// Initialise Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ extended: true }));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.post("/api/save-articles", async (req, res) => {
  try {
    const promptAnswers = req.body;
    const data = await saveHackerNewsArticles(promptAnswers, io);
    res.status(200).json({ message: "Articles processed successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured: " + error.message);
  }
});

server.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
