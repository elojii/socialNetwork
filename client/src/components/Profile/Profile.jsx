import { useEffect } from "react";
import style from "./Profile.module.css";
import { Friends } from "./Friends/Friends";
import { Post } from "./Post/Post";
import { Loader } from "../Loader/Loader";
import { ProfilePicture } from "./ProfilePicture/ProfilePicture";
import { InformationAboutTheUser } from "./InformationAboutTheUser/InformationAboutTheUser";
import { Button, Typography, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useActions } from "../../hooks/useActions";

export const Profile = ({ themeOfSite, user }) => {
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  const navigate = useNavigate();
  const { changeUser, setLoadingFalse } = useActions();

  useEffect(() => {
    changeUser(JSON.parse(sessionStorage.getItem("user")));
    setLoadingFalse();
  }, []);

  return (
    <div className={style.main}>
      <ThemeProvider theme={themeOfSite}>
        <div className={style.profilePicture}>
          <ProfilePicture userPfp={user.pfp} />
        </div>

        <div className={style.information}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <InformationAboutTheUser
                userName={user.name}
                userAge={user.age}
                userDescription={user.description}
              />
              <Button
                size="medium"
                variant="contained"
                style={{ color: "white" }}
                onClick={() => {
                  navigate("/settings");
                }}
              >
                Налаштування
              </Button>
            </>
          )}
        </div>

        <div className={style.friends}>
          <Typography
            variant="h5"
            style={{ fontWeight: "normal", color: "var(--theme-color)" }}
            className={style.fontColor}
          >
            Друзі
          </Typography>
          <Friends user={user} />
        </div>

        <div className={style.posts}>
          <Post user={user} isLoading={isLoading} themeOfSite={themeOfSite} />
        </div>
      </ThemeProvider>
    </div>
  );
};
