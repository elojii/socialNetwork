import axios from "axios";

export const createUser = (userInfo, navigate) => {
  axios
    .post("http://localhost:5000/registerUser", userInfo)
    .then(() => {
      navigate("/login");
    })
    .catch((err) => alert(err.message));
};
