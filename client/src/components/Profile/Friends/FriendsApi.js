import axios from "axios";

export const deleteFriend = (friendId, user, changeUserFriends) => {
    axios
      .delete("http://localhost:5000/deleteUser", {
        data: {
          friendId: friendId,
          userId: user.privateId,
        },
      })
      .then((res) => {
        changeUserFriends(res.data)
        sessionStorage.setItem("user", JSON.stringify({...user, friends: res.data}));
      })
      .catch((err) => alert(err.message));

    axios
      .delete("http://localhost:5000/deleteOtherUser", {
        data: {
          friendId: friendId,
          userId: user.privateId,
        },
      })
      .then()
      .catch((err) => alert(err.message));
  };

export const buttonReveal = (e, index, deleteButtonReveal, setDeleteButtonReveal, selectedFriendIndex, setSelectedFriendIndex) => {
    e.preventDefault();
    setSelectedFriendIndex(index);
    const updatedOptions = [...deleteButtonReveal];
    if (selectedFriendIndex === index) {
      const turnOffOptions = updatedOptions.map((option) => (option = false));
      setDeleteButtonReveal(turnOffOptions);
      setSelectedFriendIndex("");
    } else {
      updatedOptions[selectedFriendIndex] = false;
      updatedOptions[index] = !updatedOptions[index];
      setDeleteButtonReveal(updatedOptions);
    }
  };