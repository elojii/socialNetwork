import style from "../../Profile.module.css";
import like from "../../../../../pictures/like.png";
import NO_PFP from "../../../../../pictures/NO_PFP.png";
import { useLocation } from "react-router-dom";
import { addLikeToThePost } from "./IndividualPostApi";
import { useActions } from "../../../../hooks/useActions";
export const IndividualPost = ({ post, index, changeFriendPosts, user }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { changePosts } = useActions();
  const handleAddLikeToThePost = (index, postId) => {
    addLikeToThePost(
      index,
      postId,
      user,
      currentPath,
      changeFriendPosts,
      changePosts
    );
  };
  return (
    <div>
      <div key={post.privateId} className={style.postContent}>
        <div className={style.pictureContent}>
          <div className={style.userInfo}>
            <img
              src={post.pfpWhoPost ? post.pfpWhoPost : NO_PFP}
              alt=""
              className={style.styleForPostPfp}
            />
            <div>{post.userWhoPost}</div>
          </div>
          {post.picture ? (
            <img src={post.picture} alt="pfp" className={style.image} />
          ) : null}
          <div>{post.text}</div>
          <div>
            <img
              src={like}
              alt="like"
              style={{ width: "20px", height: "auto" }}
              onClick={() => handleAddLikeToThePost(index, post.privateId)}
            />
            <h5>Likes: {post.likeCount && post.likeCount.length}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
