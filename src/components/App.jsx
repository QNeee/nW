import { useEffect } from "react";
import { refresh } from "Redux/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getToken, getUserEmail } from "Redux/networkSlice";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { AuthPage } from "./AuthPage/AuthPage";
import { Friends } from "./Friends/Friends";
import { Messages } from "./Messages/Messages";
import { Profile } from "./Profile/Profile";
import { People } from "./People/People";
import { Outbox } from "./Outbox/Outbox";
import { Inbox } from "./Inbox/Inbox";
import { OutboxContent } from "./OutboxContent/OutboxContent";
import { InboxContent } from "./InboxContent/InboxContent";
import { UserFriends } from "./UserFriends/UserFriends";
import { Profiles } from "./Profiles/Profiles";
import { Verification } from "./Verification/Verification";
import { Dialogues } from "./Dialogues/Dialogues";
import { Dialogue } from "./Dialogue/Dialogue";
import { OnPendings } from "./OnPendings/OnPendings";
import { Photos } from "./Photos/Photos";
import { Photo } from "./Photo/Photo";
export const App = () => {
  const token = useSelector(getToken);
  const logged = useSelector(getIsLoggedIn);
  const email = useSelector(getUserEmail);
  const dispatch = useDispatch();
  useEffect(() => {
    if (logged)
      dispatch(refresh())

  }, [dispatch, logged])
  return (
    <Routes>
      <Route path="/" element={!token ? < AuthPage /> : <Navigate to='/home' />} >
        <Route path="register" element={<AuthPage />} />
      </Route>
      <Route path="/verification" element={email ? <Verification /> : <Navigate to='/' />} />
      <Route path="/home" element={token ? <Layout /> : <Navigate to='/' />}>
        <Route index element={<People />} />
        <Route path="friends" element={<Friends />} >
          <Route path="your-friends" element={<UserFriends />} />
          <Route path="on-pending" element={<OnPendings />} />
        </Route>
        <Route path="messages" element={<Messages />} >
          <Route path="outbox" element={<Outbox />} >
            <Route path=":id" element={<OutboxContent />} />
          </Route>
          <Route path="inbox" element={<Inbox />} >
            <Route path=":id" element={<InboxContent />} />
          </Route>
          <Route path="dialogues" element={<Dialogues />} />
          <Route path="dialogues/:id" element={<Dialogue />} />
        </Route>
        <Route path="profile" element={<Profile />} >
          <Route path=":id" element={<Profiles />} >
            <Route path="photos" element={<Photos />} />
            <Route path="friends" element={<UserFriends />} />
          </Route>
        </Route>
        <Route path="photos" element={<Photos />}>
          <Route path=":id" element={<Photo />} />
        </Route>
      </Route>
    </Routes>

  );
};
