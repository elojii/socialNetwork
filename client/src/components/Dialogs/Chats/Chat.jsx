import { useState, useEffect, useRef, memo } from "react";
import style from "./Chat.module.css";
import { TextField, Typography } from "@mui/material";
import {
  deleteChatMessage,
  getAllMessagesInTheRoom,
  getChatRoom,
  receiveMessage,
  sendMessage,
  showMessageOptions,
} from "./ChatApi";
export const Chat = memo(({ idOfUser, dialogs, user }) => {
  const chatContentRef = useRef();
  const [messageText, setMessageText] = useState("");
  const [messageGet, setMessageGet] = useState([]);
  const [socket, setSocket] = useState(null);
  const [getRoom, setGetRoom] = useState(null);
  const [messageOptions, setMessageOptions] = useState([]);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState();

  useEffect(() => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
  }, [messageGet]);

  useEffect(() => {
    getChatRoom(setSocket, setGetRoom, user, idOfUser);
  }, [idOfUser]);

  useEffect(() => {
    getAllMessagesInTheRoom(getRoom, socket, setMessageGet);
  }, [getRoom]);

  useEffect(() => {
    if (messageGet) {
      receiveMessage(
        socket,
        messageGet,
        setMessageGet,
        messageText,
        setMessageText
      );
    }
  }, [socket, messageGet]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(
      socket,
      messageText,
      setMessageText,
      getRoom,
      user,
      messageGet,
      setMessageGet
    );
  };

  const findFriend = dialogs.find(
    (dialogUSer) => dialogUSer.privateId === idOfUser
  );

  return (
    <div className={style.container}>
      <div className={style.userName}>
        <div>
          {findFriend.pfp ? (
            <div>
              <img src={findFriend.pfp} alt="pfp" className={style.friendPfp} />
            </div>
          ) : (
            <div>
              <img
                src="https://pbs.twimg.com/media/FGCpQkBXMAIqA6d.jpg:large"
                alt="pfp"
                className={style.friendPfp}
              />
            </div>
          )}
        </div>
        <div className={style.dialogName}>
          <Typography>{findFriend.name}</Typography>
        </div>
      </div>
      <div ref={chatContentRef} className={style.chatContent}>
        {messageGet &&
          messageGet.map((message, index) => {
            const isSender = message.senderId === user.privateId;
            const containerStyle = isSender
              ? `${style.messageContainer} ${style.flexEnd}`
              : `${style.messageContainer} ${style.flexStart}`;

            return (
              <div key={index} className={containerStyle}>
                <img
                  src={
                    message.senderPfp
                      ? message.senderPfp
                      : "https://pbs.twimg.com/media/FGCpQkBXMAIqA6d.jpg:large"
                  }
                  alt="pfp"
                  className={style.smallPfp}
                />
                {messageOptions[index] ? (
                  <div
                    className={style.messageOptionsTable}
                    onClick={() =>
                      deleteChatMessage(
                        message.messageId,
                        getRoom,
                        setMessageGet,
                        messageOptions,
                        setMessageOptions
                      )
                    }
                  >
                    Видалити
                  </div>
                ) : null}
                <div
                  onContextMenu={(e) =>
                    showMessageOptions(
                      e,
                      index,
                      messageOptions,
                      setMessageOptions,
                      selectedMessageIndex,
                      setSelectedMessageIndex
                    )
                  }
                  className={style.messageContent}
                  style={{
                    alignItems: isSender ? "flex-end" : "flex-start",
                  }}
                >
                  {message.message}
                  <h6 className={style.messageDate}>{message.date}</h6>
                </div>
              </div>
            );
          })}
      </div>
      <div className={style.inputField}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Почніть діалог"
            variant="filled"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            inputProps={{ autoComplete: "off" }}
            fullWidth
          />
          <button type="submit" style={{ display: "none" }}></button>
        </form>
      </div>
    </div>
  );
});
