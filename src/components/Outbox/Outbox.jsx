import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllOutboxMessages } from "Redux/messageOperaions";
import { getUserOutbox } from "Redux/networkSlice";
import { Link, useLocation, Outlet } from "react-router-dom";
import { OutboxContainer, OutboxFlex } from "./Outbox.styled";
export const Outbox = () => {
    const dispatch = useDispatch();
    const userOutbox = useSelector(getUserOutbox);
    const { pathname } = useLocation();
    useEffect(() => {
        dispatch(getAllOutboxMessages())
    }, [dispatch])
    return <div>
        {pathname === "/home/messages/outbox" && userOutbox.map(item => <OutboxContainer key={item._id}><div><Link to={`/home/profile/${item.owner}`}>{item.sender}</Link></div><div><Link to={`/home/messages/outbox/${item._id}`}>message</Link></div><div>{item.sendedTime}</div></OutboxContainer>)}
        <Outlet />
    </div>
}