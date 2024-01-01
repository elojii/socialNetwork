import axios from "axios";
import io from "socket.io-client";

export const getChatRoom = (setSocket, setGetRoom, user, idOfUser) => {
  const newSocket = io("http://localhost:5000");
  setSocket(newSocket);

  axios
    .get("http://localhost:5000/getChatRoom", {
      params: {
        myPrivateId: user.privateId,
        privateId: idOfUser,
      },
    })
    .then((res) => setGetRoom(res.data))
    .catch((err) => alert(err.message));

  return () => {
    newSocket.disconnect();
  };
};

export const getAllMessagesInTheRoom = (getRoom, socket, setMessageGet) => {
  if (getRoom && getRoom.number) {
    socket.emit("join-room", getRoom.number);
    axios
      .get("http://localhost:5000/getAllMessagesInTheRoom", {
        params: {
          roomNumber: getRoom.number,
        },
      })
      .then((res) => {
        setMessageGet(res.data);
      })
      .catch((err) => alert(err.message));
  }
};

export const sendMessage = (
  socket,
  messageText,
  setMessageText,
  getRoom,
  user,
) => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  if (socket && messageText !== "") {
    const messageData = {
      message: messageText,
      room: getRoom.number,
      senderId: user.privateId,
      date: `${hours} : ${minutes}`,
      senderPfp: user.pfp,
    };
    socket.emit("send-message", messageData);
    setMessageText("");
    axios
      .put("http://localhost:5000/addMessageToTheRoom", {
        roomNumber: getRoom.number,
        message: messageText,
        userId: user.privateId,
        date: `${hours} : ${minutes < 10 ? `0${minutes}` : minutes}`,
        senderPfp: user.pfp,
      })
      .then(() => {
        console.log("Message sent to server");
      })
      .catch((err) => alert(err.message));
  }
};
export const receiveMessage = (socket, messageGet, setMessageGet) => {
  if (socket) {
    console.log("receive-message")
    socket.on("receive-message", (data) => {
      setMessageGet([...messageGet, data]);
    });
  }
};

export const showMessageOptions = (
  e,
  index,
  messageOptions,
  setMessageOptions,
  selectedMessageIndex,
  setSelectedMessageIndex
) => {
  e.preventDefault();
  setSelectedMessageIndex(index);
  const updatedOptions = [...messageOptions];
  if (selectedMessageIndex === index) {
    const turnOffOptions = updatedOptions.map(() => false);
    setMessageOptions(turnOffOptions);
    setSelectedMessageIndex("");
  } else {
    updatedOptions[selectedMessageIndex] = false;
    updatedOptions[index] = !updatedOptions[index];
    setMessageOptions(updatedOptions);
  }
};

export const deleteChatMessage = (
  messageId,
  getRoom,
  setMessageGet,
  messageOptions,
  setMessageOptions
) => {
  axios
    .delete("http://localhost:5000/deleteChatMessage", {
      data: {
        messageId: messageId,
        room: getRoom.number,
      },
    })
    .then((res) => {
      sessionStorage.setItem("messages", JSON.stringify(res.data));
      setMessageGet(JSON.parse(sessionStorage.getItem("messages")));
      const turnOffOptions = messageOptions.map(() => false);
      setMessageOptions(turnOffOptions);
    })
    .catch((err) => alert(err.message));
};
