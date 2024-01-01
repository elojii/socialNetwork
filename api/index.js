import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {
  deleteUser,
  deleteOtherUser,
  addDialogUser,
  registerUser,
  updateUser,
  getLoginUser,
  addFriend,
  addOtherFriend,
  addFriendRequest,
  deleteRequest,
  addChatRoom,
  getChatRoom,
  addMessageToTheRoom,
  getAllMessagesInTheRoom,
  deleteChatMessage,
  addPostsToProfile,
  addLikesToThePost,
  getAllPosts,
  getEveryFriendPosts,
} from "./modules/user.js";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*"
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (number) => {
    socket.join(number);
    console.log(`we are in this room currently ${number}`);
  });
  console.log(`${socket.id} підключився`);
  socket.on("send-message", (data) => {
    io.to(data.room).emit("receive-message", data);
    console.log(data)
  });

  socket.on("disconnect", () => {
    console.log(`Клієнт ${socket.id} відключився від WebSocket`);
  });
});

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to mongoDB!"))
.catch((err) => console.error(err));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/getLoginUser", getLoginUser);
app.get("/getChatRoom", getChatRoom);
app.get("/getAllMessagesInTheRoom", getAllMessagesInTheRoom);
app.get("/getAllPosts", getAllPosts);
app.get("/getEveryFriendPosts", getEveryFriendPosts);

app.post("/registerUser", registerUser);
app.post("/addChatRoom", addChatRoom);
app.post("/addPostsToProfile", addPostsToProfile);

app.delete("/deleteUser", deleteUser);
app.delete("/deleteOtherUser", deleteOtherUser);
app.delete("/deleteRequest", deleteRequest);
app.delete("/deleteChatMessage", deleteChatMessage);

app.put("/addDialogUser", addDialogUser);
app.put("/updateUser", updateUser);
app.put("/addFriendRequest", addFriendRequest);
app.put("/addFriend", addFriend);
app.put("/addOtherFriend", addOtherFriend);
app.put("/addMessageToTheRoom", addMessageToTheRoom);
app.put("/addLikesToThePost", addLikesToThePost);

server.listen(5000, () => console.log("server is on port 5000"));
