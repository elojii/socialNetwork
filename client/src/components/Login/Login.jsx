import { useState } from "react";
import style from "../../App.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux/es/exports";
import { signIn } from "./LoginApi";
import { useActions } from "../../hooks/useActions";

export const Login = () => {
  const auth = useSelector((state) => state.auth.auth);
  const { setAuthTrue } = useActions();
  const navigate = useNavigate();
  const [errText, setErrText] = useState();
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });
  return (
    <div className={style.backgroundForLogin}>
      <div className={style.loginScreen}>
        <Typography variant="h4" style={{ color: "#f8f8f8" }}>
          Авторизація
        </Typography>
        <TextField
          id="filled-basic"
          label="Введіть ім'я"
          variant="filled"
          size="small"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <TextField
          id="filled-basic"
          label="Введіть пароль"
          variant="filled"
          size="small"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        {!auth && (
          <Button
            variant="contained"
            size="medium"
            style={{ width: "100%" }}
            onClick={() => {
              signIn(userData, navigate, setErrText, setAuthTrue, auth);
            }}
          >
            sign in
          </Button>
        )}
        {errText ? (
          <div>
            <h5>{errText}</h5>
          </div>
        ) : null}
        <div>
          <Typography
            variant="h6"
            style={{ color: "#f8f8f8", fontWeight: "normal", fontSize: "15px" }}
          >
            або зареєструйся натиснувши{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#f8f8f8",
                fontWeight: "bold",
              }}
            >
              тут
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};
