import axios from "axios";

export const signIn = (userData, navigate, setErrText, setAuthTrue) => {
  axios
    .get("http://localhost:5000/getLoginUser", {
      params: {
        name: userData.name,
        password: userData.password,
      },
    })
    .then((res) => {
      setAuthTrue()
      sessionStorage.setItem("auth", "true");
      sessionStorage.setItem("user", JSON.stringify(res.data));
      navigate("/profile");
    })
    .catch((err) => setErrText(err.response.data.error));
};
