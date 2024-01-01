import mongoose from "mongoose";

const RegisterUserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  description: {
    type: String,
  },
  pfp: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  privateId: {
    type: String,
    required: true,
  },
  chatRoom: {
    type: String,
  },
  friends: [
    {
      pfp: {
        type: String,
      },
      name: {
        type: String,
      },
      privateId: {
        type: String,
      },
    },
  ],
  friendRequest: [
    {
      pfp: {
        type: String,
      },
      name: {
        type: String,
      },
      privateId: {
        type: String,
      },
    },
  ],
  dialogs: [
    {
      pfp: {
        type: String,
      },
      name: {
        type: String,
      },
      privateId: {
        type: String,
      },
    },
  ],
});
const ChatRoomSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  companionName: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  messages: [
    {
      message: {
        type: String,
      },
      messageId: {
        type: String,
        required: true,
      },
      senderId: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      senderPfp: {
        type: String,
      },
    },
  ],
});
const PostsSchema = mongoose.Schema({
  picture: {
    type: String,
  },
  text: {
    type: String,
  },
  userWhoPost: {
    type: String,
    required: true,
  },
  pfpWhoPost: {
    type: String,
  },
  privateId: {
    type: String,
  },
  date: {
    type: String,
  },
  likeCount: [
    {
      usersWhoLiked: {
        type: String,
        required: true,
      },
    },
  ],
});

export const RegisterUser = mongoose.model("registerUser", RegisterUserSchema);

export const ChatRoom = mongoose.model("chatroom", ChatRoomSchema);

export const Posts = mongoose.model("post", PostsSchema);
