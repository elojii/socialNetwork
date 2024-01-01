import { useState, memo } from "react";
import style from "../Profile.module.css";
import { Button, TextField, ThemeProvider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { changeSettingsState } from "./SettingsApi";

export const Settings = memo(({ openFileFolder, themeOfSite, user }) => {
  const navigate = useNavigate();
  const { changeUserName, changeUserAge, changeUserDescription } = useActions();
  const userChange = {
    name: user.name,
    age: user.age,
    description: user.description,
  };
  const [changing, setChanging] = useState(userChange);

  return (
    <div className={style.settingsContainer}>
      <ThemeProvider theme={themeOfSite}>
        <div className={style.centeringSettings}>
          <TextField
            id="filled-basic"
            label="Змінити ім'я"
            variant="filled"
            size="small"
            value={changing.name}
            onChange={(e) =>
              setChanging((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <TextField
            id="outlined-number"
            label="Змінити вік"
            variant="filled"
            type="number"
            size="small"
            value={changing.age}
            onChange={(e) =>
              setChanging((prev) => ({ ...prev, age: e.target.value }))
            }
          />
          <TextField
            id="filled-basic"
            label="Змінити опис"
            variant="filled"
            size="small"
            value={changing.description}
            onChange={(e) =>
              setChanging((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <div style={{ marginTop: "5px" }}></div>
          <Button onClick={() => openFileFolder()}>Змінити аватарку</Button>
          <Button
            variant="outlined"
            onClick={() => {
              changeSettingsState(changeUserName, changeUserAge, changeUserDescription, changing);
              axios
                .put("http://localhost:5000/updateUser", changing, {
                  params: {
                    userId: user.privateId,
                  },
                })
                .then((res) => {
                  sessionStorage.setItem("user", JSON.stringify(res.data));
                  navigate("/profile");
                })
                .catch((err) => alert(err.message));
            }}
          >
            Зберегти зміни
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
});
