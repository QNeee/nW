import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllInboxMessage } from "Redux/messageOperaions";
import { getUserInbox } from "Redux/networkSlice";
import { Link, useLocation, Outlet } from "react-router-dom";
import { InboxContainer } from "./Inbox.styled";
export const Inbox = () => {
    const dispatch = useDispatch();
    const userInbox = useSelector(getUserInbox);
    const { pathname } = useLocation();
    useEffect(() => {
        dispatch(getAllInboxMessage())
    }, [dispatch])
    return <div>
        {pathname === "/home/messages/inbox" && userInbox.map(item => <InboxContainer key={item._id}><div><Link to={`/home/profile/${item.owner}`}>{item.sender}</Link></div><div><Link to={`/home/messages/inbox/${item._id}`}>message</Link></div><div>{item.sendedTime}</div></InboxContainer>)}
        <Outlet />
    </div>
}