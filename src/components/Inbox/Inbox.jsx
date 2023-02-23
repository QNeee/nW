import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllInboxMessage, getNextInboxLimit, getPrevInboxLimit } from "Redux/messageOperaions";
import { getLoading, getPage, getUserInbox, getUserMessagesCount } from "Redux/networkSlice";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Container, InboxContainer, MessageContainer } from "./Inbox.styled";
export const Inbox = () => {
    let dataToSet = [];
    let page = useSelector(getPage);
    const loading = useSelector(getLoading);
    const skip = 5;
    const per_page = 5;
    const dispatch = useDispatch();
    const count = useSelector(getUserMessagesCount);
    const userInbox = useSelector(getUserInbox);
    const readMessage = userInbox.filter(item => item.read.marked === true);
    const unReadMessage = userInbox.filter(item => item.read.marked === false);
    dataToSet = [...unReadMessage, ...readMessage];
    dataToSet.length = 5;
    const { pathname } = useLocation();
    useEffect(() => {
        dispatch(getAllInboxMessage())
    }, [dispatch])
    const onClickPrev = () => {
        page--;
        const data = {
            page,
            skip
        }
        dispatch(getPrevInboxLimit(data));
    }

    const onClickNext = () => {
        page++;
        const data = {
            page,
            skip
        }
        dispatch(getNextInboxLimit(data));
    }
    return <div>
        {pathname === "/home/messages/inbox" && dataToSet.map(item => <InboxContainer prop={item.read.marked} key={item._id}><MessageContainer><Link to={`/home/profile/${item.owner}`}>{item.sender}</Link></MessageContainer><MessageContainer><Link to={`/home/messages/inbox/${item._id}`}>message</Link></MessageContainer><MessageContainer>{item.sendedTime}</MessageContainer></InboxContainer>)}
        <Outlet />
        {count.inbox !== 0 && count.inbox > dataToSet.length && < div >
            <button type="button" disabled={page === '1' ? true : false} onClick={onClickPrev}>prev</button>
            <button type="button" disabled={userInbox.length > per_page ? false : true} onClick={onClickNext}>next</button>
        </div>
        }

        {loading && <Container>loading...</Container>}
        {userInbox.length === 0 && !loading && <Container>No inbox messages</Container>}
    </div >
}