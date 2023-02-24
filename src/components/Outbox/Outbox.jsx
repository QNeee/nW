import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllOutboxMessages } from "Redux/messageOperaions";
import { getLoading, getUserOutbox } from "Redux/networkSlice";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Container, OutboxContainer } from "./Outbox.styled";
export const Outbox = () => {
    const dispatch = useDispatch();
    const userOutbox = useSelector(getUserOutbox);
    const loading = useSelector(getLoading);
    const { pathname } = useLocation();
    useEffect(() => {
        dispatch(getAllOutboxMessages())
    }, [dispatch])
    return <div>
        {pathname === "/home/messages/outbox" && userOutbox.length > 0 && userOutbox.map(item => <OutboxContainer key={item._id}><div><Link to={`/home/profile/${item.owner}`}>{item.sender}</Link></div><div><Link to={`/home/messages/outbox/${item._id}`}>message</Link></div><div>{item.sendedTime}</div></OutboxContainer>)}
        {loading && <Container>loading...</Container>}
        {userOutbox.length === 0 && !loading && <Container>No outbox messages</Container>}
        <Outlet />
    </div>
}