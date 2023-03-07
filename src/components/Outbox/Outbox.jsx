import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllOutboxMessages } from "Redux/messageOperaions";
import { getLoading, getUserOutbox } from "Redux/networkSlice";
import { useLocation, Outlet } from "react-router-dom";
import { Container, InboxContainer, MessageContainerFirst, MessageContainerSecond, MessageContainerThird, StyledLink } from "./Outbox.styled";
import { time, date } from "func";
export const Outbox = () => {
    const dispatch = useDispatch();
    const userOutbox = useSelector(getUserOutbox);
    const loading = useSelector(getLoading);
    const { pathname } = useLocation();
    useEffect(() => {
        dispatch(getAllOutboxMessages())
    }, [dispatch])
    return <div>
        {pathname === "/home/messages/outbox" && userOutbox.length > 0 && userOutbox.map(item => <InboxContainer key={item._id}><MessageContainerFirst><StyledLink to={`/home/profile/${item.find}`}>{item.receiver}</StyledLink></MessageContainerFirst><MessageContainerSecond><StyledLink to={`/home/messages/outbox/${item._id}`}>message</StyledLink></MessageContainerSecond><MessageContainerThird>Date:{date(item.sendedDate)} Time:{time(item.sendedDate)}</MessageContainerThird></InboxContainer>)}
        {loading && <Container>loading...</Container>}
        {userOutbox.length === 0 && !loading && <Container>No outbox messages</Container>}
        <Outlet />
    </div>
}