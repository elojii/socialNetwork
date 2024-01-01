import axios from "axios";

export const findFriend = (user, searchFriend, setFriend) => {
  const existingProfile = user.dialogs.some(
    (friend) => friend.name == searchFriend.name
  );

  if (!existingProfile) {
    axios
      .put("http://localhost:5000/addDialogUser", searchFriend, {
        params: {
          _id: user._id,
        },
      })
      .then((res) => {
        setFriend(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => alert(err.message));
  }
};

export const addChatRoom = (searchFriend, user, friend) => {
  if (!friend) return;
  axios
    .post("http://localhost:5000/addChatRoom", {
      data: {
        privateId: user.privateId,
        name: searchFriend
      },
    })
    .catch((err) => alert(err.message));
};

export const openDialog = (id, setFriendId, setFlagDialogTrue) => {
  setFlagDialogTrue()
  setFriendId(id);
};
