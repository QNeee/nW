import { useEffect } from "react";
import { refresh } from "Redux/authOperations";
import { Login } from "./Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { fetchByName } from "./services";

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refresh())
  }, [dispatch])
  return (
    <div>
      <Login />
    </div>
  );
};
