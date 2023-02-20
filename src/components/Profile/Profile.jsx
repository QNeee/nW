import { getUserId, getUserInfo } from "Redux/networkSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserById } from "Redux/userOperaions";
import { Container, MessageCount } from "./Profile.styled";
import { useLocation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
export const Profile = () => {
    const dispatch = useDispatch();
    const id = useSelector(getUserId);
    const { pathname } = useLocation();
    useEffect(() => {
        if (id)
            dispatch(getUserById(id))
    }, [dispatch, id])
    const userInfo = useSelector(getUserInfo);
    return <Container>
        {pathname === '/home/profile' && userInfo.map(item => <div key={item._id}>
            <ul>
                <li>Nickname : {item.nickName}</li>
                <li>Email : {item.email}</li>
                <li>Friends : {item.friends}</li>
            </ul>
            <MessageCount>
                Messages Count
                <li>Inbox: {item.messageCount.inbox}</li>
                <li>Outbox: {item.messageCount.outbox}</li>
            </MessageCount>
        </div>)}
        <Outlet />
    </Container>
}