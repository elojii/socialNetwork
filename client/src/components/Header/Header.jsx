import { useState, useEffect } from "react";
import style from "../../App.module.css";
import { Link } from "react-router-dom";
import { Module } from "./moduleWindow/Module";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import { logout, sendRequest } from "./HeaderApi";
import bell from "../../../pictures/bell.png";
import { useActions } from "../../hooks/useActions";

export const Header = ({ themeOfSite, theme, user }) => {
  const {
    setAuthFalse,
    changeTheme,
    clearPosts,
    clearFriendPosts,
  } = useActions();
  const [friendInfo, setFriendInfo] = useState({ name: "" });
  const [moduleActive, setModuleActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    const storedTheme = sessionStorage.getItem("theme");
    if (storedTheme) {
      changeTheme(JSON.parse(storedTheme));
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={themeOfSite}>
        <header className={style.header}>
          <div className={style.headerLeft}>
            <TextField
              id="filled-basic"
              label="Add friend"
              variant="filled"
              size="small"
              className={style.input}
              value={friendInfo.name}
              onChange={(e) =>
                setFriendInfo({ ...friendInfo, name: e.target.value })
              }
            />
            <Button
              variant="contained"
              size="medium"
              style={{ color: "white" }}
              onClick={() => {
                sendRequest(
                  friendInfo,
                  user,
                  setErrorMessage,
                );
              }}
            >
              Відправити
            </Button>
            <div style={{ color: "red" }}>
              {errorMessage ? errorMessage : null}
            </div>
            <div className={style.notificationContainer}>
              <img
                src={bell}
                style={{ width: "25px", heigth: "auto", cursor: "pointer" }}
                onClick={() => setModuleActive(true)}
              />
              {user.friendRequest && user.friendRequest.length > 0 ? (
                <div className={style.notificationBadge}>
                  {user.friendRequest.length}
                </div>
              ) : null}
            </div>
            {moduleActive && (
              <Module setModuleActive={setModuleActive} user={user} />
            )}
            <div>
              <Select
                labelId="demo-simple-select-standard-label"
                value={theme}
                onChange={(e) => {
                  changeTheme(e.target.value);
                  sessionStorage.setItem(
                    "theme",
                    JSON.stringify(e.target.value)
                  );
                }}
              >
                <MenuItem value="#ff3d00">Червоний</MenuItem>
                <MenuItem value="#4caf50">Зелений</MenuItem>
                <MenuItem value="#1565c0">Синій</MenuItem>
                <MenuItem value="#ffc107">Жовтий</MenuItem>
                <MenuItem value="#e91e63">Рожевий</MenuItem>
              </Select>
            </div>
          </div>
          <h1
            style={{ cursor: "pointer" }}
            onClick={(e) => logout(e, setAuthFalse, clearPosts, clearFriendPosts)}
          >
            <Typography>
              <Link
                to={"/login"}
                style={{
                  textDecoration: "none",
                  color: "#3f51b5",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Вийти
              </Link>
            </Typography>
          </h1>
        </header>
      </ThemeProvider>
    </>
  );
};
