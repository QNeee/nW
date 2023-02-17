import { useEffect } from "react";
import { refresh } from "Redux/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getToken } from "Redux/networkSlice";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { AuthPage } from "./AuthPage/AuthPage";
import { Home } from "./Home/Home";
export const App = () => {
  const token = useSelector(getToken);
  const logged = useSelector(getIsLoggedIn)
  const dispatch = useDispatch();
  useEffect(() => {
    if (logged)
      dispatch(refresh())
  }, [dispatch, logged])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={!token ? < AuthPage /> : <Navigate to='/home' />} />
        <Route path="home" element={token ? <Home /> : <Navigate to='/' />} />
      </Route>
    </Routes>
  );
};
