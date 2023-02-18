import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllOutboxMessages } from "Redux/messageOperaions";
import { getUserOutbox } from "Redux/networkSlice";
import { Link, useLocation, Outlet } from "react-router-dom";
export const Outbox = () => {
    const dispatch = useDispatch();
    const userOutbox = useSelector(getUserOutbox);
    const { pathname } = useLocation();
    useEffect(() => {
        dispatch(getAllOutboxMessages())
    }, [dispatch])
    return <div>
        {pathname === "/home/messages/outbox" && userOutbox.map(item => <div key={item._id}><p>{item.sender}<Link to={`/home/messages/outbox/${item._id}`}>content</Link>{item.sendedTime}</p></div>)}
        <Outlet />
    </div>
}