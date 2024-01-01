import { useEffect, useState, useRef } from "react";
import style from "../Profile.module.css";
import { Loader } from "../../Loader/Loader";
import { IndividualPost } from "../Post/IndividualPost/IndividualPost";
import { reloadScrollToTop } from "../../Abstraction/reloadScrollToTop";
import { useSelector } from "react-redux/es/exports";
import { getFriendPosts } from "./AllFriendPostsApi";
import { useActions } from "../../../hooks/useActions";

export const AllFriendPosts = ({ user }) => {
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  const friendPosts = useSelector((state) => state.friendPosts.friendPosts);
  const page = useRef(parseInt(sessionStorage.getItem("friendsPage"), 10) || 0);
  const [fetching, setFetching] = useState(false);
  const { setLoadingFalse, changeFriendPosts } = useActions();
  console.log("render");
  reloadScrollToTop();

  useEffect(() => {
    getFriendPosts(
      friendPosts,
      changeFriendPosts,
      setFetching,
      page,
      setLoadingFalse
    );
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (fetching) {
      getFriendPosts(
        friendPosts,
        changeFriendPosts,
        setFetching,
        page,
        setLoadingFalse
      );
    }
  }, [fetching]);

  return (
    <div className={style.mainForAllPosts}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {friendPosts.map((post, index) => (
            <IndividualPost
              key={post.privateId}
              post={post}
              index={index}
              changeFriendPosts={changeFriendPosts}
              user={user}
            />
          ))}
        </>
      )}
    </div>
  );
};
