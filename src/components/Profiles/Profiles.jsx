import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import { getFindFriend, getUserId, getUserInfo } from "Redux/networkSlice";
import { findUserById } from "Redux/userOperaions";
import { Container, MessageCount } from "./Profiles.styled";
export const Profiles = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const splitId = pathname.split('/')
    const userInfo = useSelector(getUserInfo);
    const userId = useSelector(getUserId)
    const id = splitId[3];
    const findedFriend = useSelector(getFindFriend);
    useEffect(() => {
        if (pathname === `/home/profile/${id}` && userId) {
            console.log(id);
            dispatch(findUserById(id));
        }
    }, [dispatch, id, pathname, userId])
    return <Container>
        {pathname === '/home/profile' ? userInfo.map(item => <div key={item._id}>
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
        </div>) : findedFriend.map(item => <div key={item._id}>
            <img src={item.avatarURL} alt={item.nickName} />
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