import { useEffect, useMemo } from "react";
import style from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./components/Main/Main";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { useSelector } from "react-redux/es/exports";
import { createMyTheme } from "./components/ThemeMui/themeOfSite";
import { useActions } from "./hooks/useActions";
export const App = () => {
  const auth = useSelector((state) => state.auth.auth);
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.user);
  const { setAuthTrue } = useActions();
  
  const themeOfSite = useMemo(() => {
    return createMyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if(!sessionStorage.getItem('auth')) return
      setAuthTrue();
  }, []);

  return (
    <BrowserRouter>
      <div className={auth ? style.container : ""}>
        {auth ? (
          <>
            <Header themeOfSite={themeOfSite} theme={theme} user={user} />
            <Main themeOfSite={themeOfSite} user={user} />
            <Navbar />
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
};
