import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useActions } from "../../hooks/useActions";

export const Navbar = () => {
  const {setFlagDialogFalse} = useActions()
  const setDialogFalse = () => {
    setFlagDialogFalse()
  };


  return (
    <>
      <div className={style.navbar}>
        <div className={style.navOptions}>
          <div className={style.navButton}>
            <Typography>
              <Link to={"/profile"}>Профіль</Link>
            </Typography>
          </div>
          <div className={style.navButton}>
            <Typography>
              <Link to={"/posts"}>Стрічка постів</Link>
            </Typography>
          </div>
          <div className={style.navButton} onClick={() => setDialogFalse()}>
            <Typography>
              <Link to={"/dialogs"}>Діалоги</Link>
            </Typography>
          </div>
          <div className={style.navButton}>
            <Typography>
              <Link to={"/music"}>Музика</Link>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
