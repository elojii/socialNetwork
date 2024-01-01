import App from "../../App.module.css";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux/es/exports";
import { createUser } from "./RegisterApi";
import { useActions } from "../../hooks/useActions";
export const Register = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const navigate = useNavigate();
  const { changeName, changeAge, changePassword } = useActions();
  return (
    <div className={App.backgroundForLogin}>
      <div className={App.loginScreen}>
        <Typography variant="h4" style={{ color: "#f8f8f8" }}>
          Реєстрація
        </Typography>
        <TextField
          id="filled-basic"
          label="Введіть ім'я"
          variant="filled"
          size="small"
          value={userInfo.name}
          onChange={(e) => changeName(e.target.value)}
        />
        <TextField
          value={userInfo.age}
          id="outlined-number"
          label="Введіть вік"
          variant="filled"
          type="number"
          size="small"
          onChange={(e) => changeAge(e.target.value)}
        />

        <TextField
          id="filled-basic"
          label="Введіть пароль"
          variant="filled"
          size="small"
          value={userInfo.password}
          onChange={(e) => changePassword(e.target.value)}
        />
        <Button
          size="medium"
          variant="contained"
          onClick={() => createUser(userInfo, navigate)}
        >
          Створити профіль
        </Button>
      </div>
    </div>
  );
};
