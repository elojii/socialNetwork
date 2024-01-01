import axios from "axios";

export const getFriendPosts = (
  friendPosts,
  changeFriendPosts,
  setFetching,
  page,
  setLoadingFalse
) => {
  const storedFriendPosts = sessionStorage.getItem("friendPosts");
  const storedUser = sessionStorage.getItem("user");

  if (friendPosts.length === 0 && storedFriendPosts) {
    changeFriendPosts(JSON.parse(storedFriendPosts));
    setLoadingFalse();
  }
  if (
    (friendPosts.length === 0 && !storedFriendPosts) ||
    (friendPosts.length > 0 && storedFriendPosts && storedUser)
  ) {
      const user = JSON.parse(storedUser);

      axios
        .get(`http://localhost:5000/getEveryFriendPosts`, {
          params: {
            _limit: 10,
            _page: page.current,
            name: user.name,
          },
        })
        .then((res) => {
          const newFriendPosts = [...friendPosts, ...res.data.data];

          newFriendPosts.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
          });

          changeFriendPosts(newFriendPosts);
          if (res.data.data.length !== 0) {
            page.current += 1;
          }
          sessionStorage.setItem("friendsPage", JSON.stringify(page.current));
          sessionStorage.setItem("friendPosts", JSON.stringify(newFriendPosts));
          setLoadingFalse();
          setFetching(false);
        })
        .catch((err) => alert(err.message))
        .finally(() => setFetching(false));
    }
};
