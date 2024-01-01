import axios from "axios";

export const openFileFolder = (client, setPostPicture, postPicture) => {
  const picker = client.picker({
    onUploadDone: (data) => {
      const fileData = data.filesUploaded[0];
      const fileURL = fileData.url;
      setPostPicture({ ...postPicture, picture: fileURL });
    },
  });
  picker.open();
};

export const handleFetching = (
  page,
  posts,
  changePosts,
  setLoadingFalse,
  setFetching
) => {
  const storedPosts = sessionStorage.getItem("posts");
  const storedUser = sessionStorage.getItem("user");
  if (posts.length === 0 && storedPosts) {
    changePosts(JSON.parse(storedPosts));
    setLoadingFalse();
    setFetching(false);
  }
  if (
    (posts.length === 0 && !storedPosts) ||
    (posts.length > 0 && storedPosts && storedUser)
  ) {
    const user = JSON.parse(storedUser);
    axios
      .get(`http://localhost:5000/getAllPosts`, {
        params: {
          _limit: 10,
          _page: page.current,
          name: user.name,
        },
      })
      .then((res) => {
        const newPosts = [...posts, ...res.data.data];

        newPosts.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        changePosts(newPosts);
        if (res.data.data.length !== 0) {
          page.current += 1;
        }
        sessionStorage.setItem("page", JSON.stringify(page.current));
        sessionStorage.setItem("posts", JSON.stringify(newPosts));
        setLoadingFalse();
        setFetching(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export const createPost = (
  postText,
  postPicture,
  user,
  setPostText,
  changePosts
) => {
  if (!postText.text && !postPicture.picture) return;
  axios
    .post("http://localhost:5000/addPostsToProfile", {
      text: postText.text,
      picture: postPicture.picture,
      userName: user.name,
      userPfp: user.pfp,
    })
    .then((res) => {
      const initialPosts = JSON.parse(sessionStorage.getItem("posts")) || [];
      const updatedPosts = [res.data, ...initialPosts];
      sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
      changePosts(updatedPosts);
    })
    .catch((err) => alert(err.message));
  setPostText({ text: "" });
};
