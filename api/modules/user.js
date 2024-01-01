import crypto from "crypto";
import { RegisterUser, ChatRoom, Posts } from "../schemes/User.js";

export const updateUser = async (req, res) => {
  const { name, age, description, pfp } = req.body;
  const { userId } = req.query;
  try {
    const user = await RegisterUser.findOne({ privateId: userId });
    const friendToChange = await RegisterUser.find({
      friends: { $elemMatch: { privateId: userId } },
    });
    const query = friendToChange.map((friend) => friend.privateId);

    if (!user) {
      res.status(200);
    } else {
      let updated = false;

      if (name !== undefined && name !== user.name) {
        user.name = name;
        updated = true;
      }
      if (age !== undefined && age !== user.age) {
        user.age = age;
        updated = true;
      }
      if (description !== undefined && description !== user.description) {
        user.description = description;
        updated = true;
      }
      if (pfp !== undefined && pfp !== user.pfp) {
        user.pfp = pfp;
        updated = true;
      }
      if (updated) {
        const friendData = {
          pfp: user.pfp,
          name: user.name,
        };
        await RegisterUser.updateMany(
          {
            privateId: { $in: query },
          },
          {
            $set: {
              "friends.$[elem].pfp": friendData.pfp,
              "friends.$[elem].name": friendData.name,
            },
          },
          {
            arrayFilters: [{ "elem.privateId": userId }],
          }
        );

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
      } else {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
};
export const addFriendRequest = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.query;
  try {
    const findPotentialFriend = await RegisterUser.findOne({ name });
    const request = await RegisterUser.findOne({ _id });
    const crossRequestCheck = request.friendRequest.some(
      (reqUser) => reqUser.name === findPotentialFriend.name
    );
    const doubleRequestCheck = findPotentialFriend.friendRequest.some(
      (reqUser) => reqUser.name === request.name
    );
    const friendAlreadyExistsCheck = findPotentialFriend.friends.some(
      (reqUser) => reqUser.name === request.name
    );
    if (crossRequestCheck) {
      res.status(500).json({ error: "вам вже зробили запит" });
      return;
    }
    if (friendAlreadyExistsCheck) {
      res.status(500).json({ error: "такий друг вже існує" });
      return;
    }
    if (doubleRequestCheck) {
      res.status(500).json({ error: "ви вже зробили запит" });
    } else {
      if (findPotentialFriend) {
        const friendData = {
          name: request.name,
          pfp: request.pfp,
          privateId: request.privateId,
        };
        await RegisterUser.updateOne(
          { _id: findPotentialFriend._id },
          { $push: { friendRequest: friendData } }
        );
        res.status(200).json(findPotentialFriend);
      } else {
        res.status(404).json({ error: "Такого користувача не знайдено" });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export const addFriend = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.query;
  try {
    const otherUser = await RegisterUser.findOne({ name });
    const currentUser = await RegisterUser.findOne({ _id });
    if (currentUser) {
      const thisFriendAlreadyExists = currentUser.friends.some(
        (friend) => friend.name === name
      );

      if (thisFriendAlreadyExists) {
        res.status(500).json({ error: "такий друг уже існує" });
      } else {
        const friendData = {
          pfp: otherUser.pfp,
          name: otherUser.name,
          privateId: otherUser.privateId,
        };

        await RegisterUser.updateOne(
          { _id: currentUser._id },
          { $push: { friends: friendData } }
        );

        const updatedUser = await RegisterUser.findById(_id);

        res.status(200).json(updatedUser.friends);
      }
    } else {
      res.status(404).json({ error: "Користувача не знайдено" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
export const addOtherFriend = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.query;
  try {
    const currentMe = await RegisterUser.findOne({ name });
    const otherMe = await RegisterUser.findOne({ _id });
    if (currentMe && otherMe) {
      const thisFriendAlreadyExists = currentMe.friends.some(
        (friend) => friend.name === otherMe.name
      );

      if (thisFriendAlreadyExists) {
        res.status(500).json({ error: "такий друг уже існує" });
      } else {
        const friendData = {
          pfp: otherMe.pfp,
          name: otherMe.name,
          privateId: otherMe.privateId,
        };

        await RegisterUser.updateOne(
          { _id: currentMe._id },
          { $push: { friends: friendData } }
        );

        const updatedUser = await RegisterUser.findById(currentMe._id);

        res.status(200).json(updatedUser);
      }
    } else {
      res.status(404).json({ error: "Користувача не знайдено" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
export const deleteRequest = async (req, res) => {
  const { friendId, userId } = req.body;

  try {
    const updatedUser = await RegisterUser.findOneAndUpdate(
      { privateId: userId },
      { $pull: { friendRequest: { privateId: friendId } } },
      { new: true }
    );

    res.status(200).json(updatedUser.friendRequest);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getFriend = async (req, res) => {
  const { privateId } = req.query;
  try {
    const user = await RegisterUser.findOne({ privateId });

    if (privateId === user.privateId) {
      res.status(200).json(user.friends);
    } else {
      res.status(404).json("Користувача не знайдено");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
};
export const registerUser = async (req, res) => {
  const { name, age, pfp, description, password } = req.body;
  if (name && age && password) {
    const privateId = crypto.randomUUID();
    const user = new RegisterUser({
      name,
      age,
      pfp,
      description,
      privateId,
      password,
    });

    try {
      const saveUser = await user.save();
      res.status(200).json(saveUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("Введіть повну інформацію про себе!");
  }
};
export const getLoginUser = async (req, res) => {
  const { name, password } = req.query;
  if (name && password) {
    try {
      const user = await RegisterUser.findOne({ name, password });
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ error: "Користувача не знайдено або неправильний пароль" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json({ error: "Ви не ввели всі дані" });
  }
};
export const deleteUser = async (req, res) => {
  const { friendId, userId } = req.body;

  try {
    const updatedUser = await RegisterUser.findOneAndUpdate(
      { privateId: userId },
      { $pull: { friends: { privateId: friendId } } },
      { new: true }
    );
    res.status(200).json(updatedUser.friends);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteOtherUser = async (req, res) => {
  const { friendId, userId } = req.body;

  try {
    const updatedUser = await RegisterUser.findOneAndUpdate(
      { privateId: friendId },
      { $pull: { friends: { privateId: userId } } },
      { new: true }
    );

    res.status(200).json(updatedUser.friends);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const addChatRoom = async (req, res) => {
  const { privateId, name } = req.body;

  try {
    const myUser = await RegisterUser.findOne({ privateId: privateId });
    const companionUser = await RegisterUser.findOne({ name: name });
    const findRooms = await ChatRoom.find();
    if (myUser && companionUser) {
      const roomPrivateId = crypto.randomUUID();
      const room = new ChatRoom({
        userName: privateId,
        companionName: companionUser.privateId,
        number: roomPrivateId,
      });

      const roomAlreadyExists = findRooms.some((findRoom) => {
        return (
          (findRoom.userName === room.companionName &&
            findRoom.companionName === room.userName) ||
          (findRoom.userName === room.userName &&
            findRoom.companionName === room.companionName)
        );
      });

      if (roomAlreadyExists) return;

      res.status(200);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
export const getChatRoom = async (req, res) => {
  const { myPrivateId, privateId } = req.query;
  try {
    const companionUser = await RegisterUser.findOne({ privateId: privateId });
    if (companionUser && myPrivateId) {
      const findParticularRoom = await ChatRoom.findOne({
        $or: [
          { userName: myPrivateId, companionName: privateId },
          { userName: privateId, companionName: myPrivateId },
        ],
      });
      res.status(200).json(findParticularRoom);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json("Not found");
  }
};
export const addDialogUser = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.query;
  const foundUser = await RegisterUser.findOne({ name: name });

  try {
    if (foundUser) {
      const dialogUser = {
        pfp: foundUser.pfp,
        name: foundUser.name,
        privateId: foundUser.privateId,
      };

      await RegisterUser.updateOne(
        { _id: _id },
        { $push: { dialogs: dialogUser } }
      );
      const updatedUser = await RegisterUser.findById(_id);

      res.status(200).json(updatedUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
export const addMessageToTheRoom = async (req, res) => {
  const { roomNumber, message, userId, senderPfp, date } = req.body;

  try {
    if (message) {
      const privateId = crypto.randomUUID();
      const messageContent = {
        message: message,
        messageId: privateId,
        senderId: userId,
        senderPfp: senderPfp,
        date: date,
      };
      await ChatRoom.updateOne(
        { number: roomNumber },
        { $push: { messages: messageContent } }
      );

      const updatedUser = await ChatRoom.findOne({ number: roomNumber });
      const lastMessage = updatedUser.messages[updatedUser.messages.length - 1];
      res.status(200).json(lastMessage);
    }
  } catch (err) {
    res.status(404).json("Кімнату незнайдено");
    console.log(err);
  }
};
export const getAllMessagesInTheRoom = async (req, res) => {
  const { roomNumber } = req.query;
  try {
    const room = await ChatRoom.findOne({ number: roomNumber });
    res.status(200).json(room.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json("Щось пішло не так");
  }
};
export const deleteChatMessage = async (req, res) => {
  const { messageId, room } = req.body;
  try {
    const updatedUser = await ChatRoom.findOneAndUpdate(
      { number: room },
      { $pull: { messages: { messageId: messageId } } },
      { new: true }
    );
    res.status(200).json(updatedUser.messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const addPostsToProfile = async (req, res) => {
  const { text, picture, userName, userPfp } = req.body;
  try {
    const privateId = crypto.randomUUID();
    const date = new Date();
    const post = new Posts({
      picture: picture,
      text: text,
      userWhoPost: userName,
      pfpWhoPost: userPfp,
      privateId: privateId,
      date: date,
    });

    const updatedUser = await post.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
export const addLikesToThePost = async (req, res) => {
  const { userName, postId } = req.body;
  try {
    const infoAboutLike = {
      usersWhoLiked: userName,
    };
    const pickedPost = await Posts.findOne({ privateId: postId });
    const findForMatchingLike = pickedPost.likeCount.some(
      (like) => like.usersWhoLiked === infoAboutLike.usersWhoLiked
    );
    if (findForMatchingLike) {
      await Posts.updateOne(
        { privateId: postId },
        { $pull: { likeCount: { usersWhoLiked: infoAboutLike.usersWhoLiked } } }
      );
      res.status(200).json(null);
    } else {
      await Posts.updateOne(
        { privateId: postId },
        { $push: { likeCount: { usersWhoLiked: infoAboutLike.usersWhoLiked } } }
      );

      res.status(200).json(infoAboutLike.usersWhoLiked);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
export const getAllPosts = async (req, res) => {
  const { name, _page, _limit } = req.query;

  try {
    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit);

    const skip = (page - 1) * limit;

    const totalCount = await Posts.countDocuments({
      userWhoPost: name,
    });

    const getEveryPosts = await Posts.find({ userWhoPost: name })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const transformedPosts = getEveryPosts.map((post) => {
      const likes = post.likeCount.map((like) => like.usersWhoLiked);
      return {
        ...post.toObject(),
        likeCount: likes,
      };
    });

    res.status(200).json({ data: transformedPosts, total: totalCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Помилка сервера" });
  }
};
export const getEveryFriendPosts = async (req, res) => {
  const { name, _page, _limit } = req.query;
  try {
    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit);

    const skip = (page - 1) * limit;

    const totalCount = await Posts.countDocuments({
      userWhoPost: { $ne: name },
    });

    const getEveryPosts = await Posts.find({ userWhoPost: { $ne: name } })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const transformedPosts = getEveryPosts.map((post) => {
      const likes = post.likeCount.map((like) => like.usersWhoLiked);
      return {
        ...post.toObject(),
        likeCount: likes,
      };
    });
    res.status(200).json({ data: transformedPosts, total: totalCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Помилка сервера" });
  }
};
