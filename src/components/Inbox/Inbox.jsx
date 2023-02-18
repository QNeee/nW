import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllInboxMessage } from "Redux/messageOperaions";
import { getUserInbox } from "Redux/networkSlice";
import { Link, useLocation, Outlet } from "react-router-dom";
export const Inbox = () => {
    const dispatch = useDispatch();
    const userInbox = useSelector(getUserInbox);
    console.log(userInbox);
    const { pathname } = useLocation();
    useEffect(() => {
        dispatch(getAllInboxMessage())
    }, [dispatch])
    return <div>
        {pathname === "/home/messages/inbox" && userInbox.map(item => <div key={item._id}><p>{item.sender}<Link to={`/home/messages/inbox/${item._id}`}>content</Link>{item.sendedTime}</p></div>)}
        <Outlet />
    </div>
}