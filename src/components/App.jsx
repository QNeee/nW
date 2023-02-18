import { useEffect } from "react";
import { refresh } from "Redux/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getToken } from "Redux/networkSlice";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { AuthPage } from "./AuthPage/AuthPage";
import { Friends } from "./Friends/Friends";
import { Messages } from "./Messages/Messages";
import { Photos } from "./Photos/Photos";
import { Profile } from "./Profile/Profile";
import { People } from "./People/People";
import { Outbox } from "./Outbox/Outbox";
import { Inbox } from "./Inbox/Inbox";
import { OutboxContent } from "./OutboxContent/OutboxContent";
import { InboxContent } from "./InboxContent/InboxContent";
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
      <Route path="/" element={!token ? < AuthPage /> : <Navigate to='/home' />} />
      <Route path="/home" element={token ? <Layout /> : <Navigate to='/' />}>
        <Route index element={<People />} />
        <Route path="friends" element={<Friends />} />
        <Route path="messages" element={<Messages />} >
          <Route path="outbox" element={<Outbox />} >
            <Route path=":id" element={<OutboxContent />} />
          </Route>
          <Route path="inbox" element={<Inbox />} >
            <Route path=":id" element={<InboxContent />} />
          </Route>
        </Route>
        <Route path="photos" element={<Photos />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>

  );
};
