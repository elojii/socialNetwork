import axios from "axios";

export const logout = (e, setAuthFalse, clearPosts, clearFriendPosts) => {
  e.preventDefault();
  sessionStorage.clear();
  setAuthFalse();
  clearPosts();
  clearFriendPosts();
};

export const sendRequest = (
  friendInfo,
  user,
  setErrorMessage,
) => {
  axios
    .put("http://localhost:5000/addFriendRequest", friendInfo, {
      params: {
        _id: user._id,
      },
    })
    .catch((err) => setErrorMessage(err.response.data.error));
};
