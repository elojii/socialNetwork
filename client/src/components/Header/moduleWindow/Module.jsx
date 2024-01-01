import { useState } from "react";
import style from "./Module.module.css";
import NO_PFP from "../../../../pictures/NO_PFP.png";
import { filterArray, handleAdditionToFriends } from "./ModuleApi";
import { useActions } from "../../../hooks/useActions";
import { Button } from "@mui/material";

export const Module = ({ setModuleActive, user }) => {
  const [errorMessage, setErrorMessage] = useState();
  const { changeUserFriends, changeUserFriendRequest } =
    useActions();

  return (
    <div
      className={style.modal}
      onClick={() => {
        setModuleActive(false);
      }}
    >
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.moduleWindow}>
          {user.friendRequest.length ? (
            user.friendRequest.map((req) => {
              return (
                <div className={style.wrapper}>
                  <div className={style.infoStyle}>
                    <div style={{ color: "red" }}>
                      {errorMessage ? <h6>{errorMessage}</h6> : null}
                    </div>
                    {
                      <img
                        src={req.pfp ? req.pfp : NO_PFP}
                        style={{ width: "50px", height: "auto" }}
                      />
                    }
                    {req.name}
                  </div>
                  <div className={style.buttonStyle}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ fontSize: "10px" }}
                      onClick={() => {
                        handleAdditionToFriends(
                          user,
                          setErrorMessage,
                          req,
                          changeUserFriends,
                          changeUserFriendRequest
                        );
                      }}
                    >
                      Прийняти
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ fontSize: "10px" }}
                      onClick={() =>
                        filterArray(user, req, changeUserFriendRequest)
                      }
                    >
                      Відмовити
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>запитів у друзі немає :(</h1>
          )}
        </div>
      </div>
    </div>
  );
};
