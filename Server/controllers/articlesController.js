import { saveHackerNewsArticles } from "../saveHackerNewsArticle.js";
import { Server } from "socket.io";

export const createArticles = async (req, res) => {
  try {
    const promptAnswers = req.body;
    const io = req.app.get("socketio"); // Access socket.io instance via app
    const data = await saveHackerNewsArticles(promptAnswers, io);
    res.status(200).json({ message: "Articles processed successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured: " + error.message);
  }
};
