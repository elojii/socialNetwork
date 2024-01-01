import { memo } from "react";
import style from "../Profile.module.css";
import NO_PFP from "../../../../pictures/NO_PFP.png";
export const ProfilePicture = memo(({ userPfp }) => {
  return (
    <>
      <img src={userPfp || NO_PFP} alt="pfp" className={style.styleForPfp} />
    </>
  );
});
