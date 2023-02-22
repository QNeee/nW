import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import { getUserInfo } from "Redux/networkSlice";
import { getUserById } from "Redux/userOperaions";
import { Container, MessageCount } from "./Profiles.styled";
export const Profiles = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const splitId = pathname.split('/')
    const userInfo = useSelector(getUserInfo);
    const id = splitId[3];
    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id])
    console.log(userInfo);
    return <Container>
        {userInfo.map(item => <div key={item._id}>
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