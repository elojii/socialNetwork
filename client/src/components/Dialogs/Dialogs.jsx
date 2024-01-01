import { useState, useEffect } from "react";
import style from "./Dialogs.module.css";
import { Chat } from "./Chats/Chat";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { Button, TextField, Typography, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux/es/exports";
import { findFriend, addChatRoom, openDialog } from "./DialogApi";
import { useActions } from "../../hooks/useActions";

export const Dialogs = ({ themeOfSite }) => {
  const navigate = useNavigate();
  const { setLoadingFalse, setFlagDialogTrue } = useActions();
  const flagForDialog = useSelector(
    (state) => state.flagForDialog.flagForDialog
  );
  const [user, setUser] = useState([]);
  const isLoading = useSelector((state) => state.isLoading.isLoading);

  const [searchFriend, setSearchFriend] = useState({ name: "" });
  const [friend, setFriend] = useState();
  const [friendId, setFriendId] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
    setLoadingFalse();
    navigate("/dialogs");
  }, []);

  useEffect(() => {
    if (searchFriend.name) {
      addChatRoom(searchFriend, user, friend);
    }
  }, [friend]);

  return (
    <div className={style.main}>
      <ThemeProvider theme={themeOfSite}>
        <div className={style.friends}>
          <TextField
            value={searchFriend.name}
            onChange={(e) => setSearchFriend({ name: e.target.value })}
            type="text"
            label="Choose a friend"
            variant="filled"
          />
          <Button
            variant="text"
            onClick={() => findFriend(user, searchFriend, setFriend)}
          >
            Find friend
          </Button>
          {isLoading ? (
            <Loader />
          ) : (
            user?.dialogs?.map((friend) => (
              <div key={friend.privateId}>
                <Link to={`dialog/${friend.privateId}`} className={style.link}>
                  <div
                    className={style.friendItem}
                    onClick={() =>
                      openDialog(
                        friend.privateId,
                        setFriendId,
                        setFlagDialogTrue
                      )
                    }
                  >
                    <img
                      src={
                        friend.pfp ||
                        "https://pbs.twimg.com/media/FGCpQkBXMAIqA6d.jpg:large"
                      }
                      alt="pfp"
                      className={style.friendPfp}
                    />
                    <div>
                      <Typography
                        variant="h5"
                        style={{ color: "var(--theme-color)" }}
                      >
                        {friend.name}
                      </Typography>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
        {flagForDialog ? (
          <Routes>
            <Route
              path={`dialog/${friendId}`}
              element={
                <Chat idOfUser={friendId} dialogs={user.dialogs} user={user} />
              }
            />
          </Routes>
        ) : (
          <div className={style.chooseDialogText}>
            <Typography variant="h4">Виберіть діалог</Typography>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
};
