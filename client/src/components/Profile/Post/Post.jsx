import { useState, useEffect, useRef } from "react";
import style from "../Profile.module.css";
import { Loader } from "../../Loader/Loader";
import { IndividualPost } from "./IndividualPost/IndividualPost";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { createPost, handleFetching, openFileFolder } from "./PostApi";
import { reloadScrollToTop } from "../../Abstraction/reloadScrollToTop";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
export const Post = ({ user, isLoading, themeOfSite }) => {
  const { setLoadingFalse, changePosts } = useActions();
  const [postText, setPostText] = useState({ text: "" });
  const [postPicture, setPostPicture] = useState({ picture: "" });
  const [fetching, setFetching] = useState(false);
  const posts = useSelector((state) => state.posts.posts);
  const page = useRef(parseInt(sessionStorage.getItem("page"), 10) || 0);
  const FILESTACK_API_KEY = "AGMuxgomTTEyezPLlV9Qfz";
  const client = filestack.init(FILESTACK_API_KEY);
  reloadScrollToTop();

  useEffect(() => {
    handleFetching(
      page,
      posts,
      changePosts,
      setLoadingFalse,
      setFetching
    );
  }, []);

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
      handleFetching(
        page,
        posts,
        changePosts,
        setLoadingFalse,
        setFetching
      );
    }
  }, [fetching]);

  const handleCreatePost = () => {
    createPost(postText, postPicture, user, setPostText, changePosts);
  };

  return (
    <>
      <ThemeProvider theme={themeOfSite}>
        <div className={style.inputAndButton}>
          <TextField
            label="Напишіть щось"
            variant="standard"
            className={style.inputStyle}
            value={postText.text}
            onChange={(e) => setPostText({ text: e.target.value })}
          />
          <div className={style.createButtons}>
            <Button
              variant="outlined"
              onClick={handleCreatePost}
              className={style.createPostButton}
            >
              <h5>Створити пост</h5>
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                openFileFolder(client, setPostPicture, postPicture)
              }
              className={style.chooseFileButton}
            >
              &
            </Button>
          </div>
        </div>
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              {posts &&
                posts.map((post, index) => (
                  <IndividualPost
                    key={post.privateId}
                    post={post}
                    index={index}
                    user={user}
                  />
                ))}
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  );
};
