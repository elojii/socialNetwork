import axios from "axios";

const filterRequests = (friends, request) => {
  return friends.filter((friend) => friend.id !== request.id);
};

export const filterArray = (user, req, changeUserFriendRequest) => {
  axios
    .delete("http://localhost:5000/deleteRequest", {
      data: {
        friendId: req.privateId,
        userId: user.privateId,
      },
    })
    .then((res) => {
      changeUserFriendRequest(filterRequests(user.friends, req.name));
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...user, friendRequest: res.data })
      );
    })
    .catch((err) => alert(err.message));
};

export const handleAdditionToFriends = (
  user,
  setErrorMessage,
  req,
  changeUserFriends,
  changeUserFriendRequest
) => {
  axios
    .put(
      "http://localhost:5000/addFriend",
      { name: req.name },
      {
        params: {
          _id: user._id,
        },
      }
    )
    .then((res) => {
      changeUserFriends(res.data);
      changeUserFriendRequest(filterRequests(user.friends, res.data));
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...user, friends: res.data })
      );
    })
    .catch((err) => {
      setErrorMessage(err.response.data.error);
    });

  axios
    .put(
      "http://localhost:5000/addOtherFriend",
      { name: req.name },
      {
        params: {
          _id: user._id,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      setErrorMessage(err.response.data.error);
    });

  axios
    .delete("http://localhost:5000/deleteRequest", {
      data: {
        friendId: req.privateId,
        userId: user.privateId,
      },
    })
    .then((res) => {
      sessionStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch((err) => alert(err.message));
};
