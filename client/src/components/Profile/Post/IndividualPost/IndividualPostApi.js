import axios from "axios";
export const addLikeToThePost = (
  index,
  postId,
  user,
  currentPath,
  changeFriendPosts,
  changePosts
) => {
  const key = currentPath === "/profile" ? "posts" : "friendPosts";
  const getPost = JSON.parse(sessionStorage.getItem(key));
  const updateUI = (updatedPosts) => {
    if (key === "posts") {
      changePosts(updatedPosts);
    } else if (key === "friendPosts") {
      changeFriendPosts(updatedPosts);
    }
  };
  axios
    .put("http://localhost:5000/addLikesToThePost", {
      userName: user.name,
      postId: postId,
    })
    .then((res) => {
      if (res.data) {
        const updatePost = getPost.map((post, i) =>
          i === index
            ? { ...post, likeCount: [...post.likeCount, res.data] }
            : post
        );
        sessionStorage.setItem(key, JSON.stringify(updatePost));
        updateUI(updatePost);
      } else {
        const likeFilter = getPost.map((post, i) => {
          return i === index
            ? {
                ...post,
                likeCount: post.likeCount.filter((like) => like !== user.name),
              }
            : post;
        });
        updateUI(likeFilter);
        sessionStorage.setItem(key, JSON.stringify(likeFilter));
      }
    })
    .catch((err) => alert(err.message));
};