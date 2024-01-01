import { useState } from "react";
import fr from "./Friends.module.css";
import style from "../Profile.module.css";
import { Typography, Box } from "@mui/material";
import { buttonReveal, deleteFriend } from "./FriendsApi";
import { useActions } from "../../../hooks/useActions";

export const Friends = ({ user }) => {
  const [deleteButtonReveal, setDeleteButtonReveal] = useState([]);
  const [selectedFriendIndex, setSelectedFriendIndex] = useState();
  const { changeUserFriends } = useActions();
  const handleDeleteFriend = (friendId) => {
    deleteFriend(friendId, user, changeUserFriends);
    sessionStorage.setItem("user", JSON.stringify(user));
  };
  console.log(user);
  const handleButtonReveal = (e, index) => {
    buttonReveal(
      e,
      index,
      deleteButtonReveal,
      setDeleteButtonReveal,
      selectedFriendIndex,
      setSelectedFriendIndex
    );
  };

  return (
    <div className={style.containerForPfps}>
      {user?.friends?.length > 0 ? (
        user.friends.map((friend, index) => {
          const shortenedName =
            friend.name.length > 8
              ? `${friend.name.slice(0, 8)}...`
              : friend.name;
          return (
            <div key={friend.privateId}>
              <Box>
                {deleteButtonReveal[index] && (
                  <div
                    className={fr.deleteButton}
                    onClick={() => handleDeleteFriend(friend.privateId)}
                  >
                    <Typography>видалити</Typography>
                  </div>
                )}
              </Box>
              <div className={style.pfpAndNamePosition}>
                <div
                  onContextMenu={(e) => handleButtonReveal(e, index)}
                  className={style.smallPfp}
                >
                  <img
                    src={
                      friend.pfp ||
                      "https://pbs.twimg.com/media/FGCpQkBXMAIqA6d.jpg:large"
                    }
                    alt="pfp"
                    className={style.smallPfp}
                  />
                </div>
                <Typography
                  variant="h5"
                  style={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  {shortenedName}
                </Typography>
              </div>
            </div>
          );
        })
      ) : (
        <Typography variant="h5" style={{ fontSize: "12px" }}>
          У вас немає друзів
        </Typography>
      )}
    </div>
  );
};
