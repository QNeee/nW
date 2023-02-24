import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllInboxMessage, getAllMessages } from "Redux/messageOperaions";
import { getAllUserMassages, getLoading, getPage, getUserId, getUserInbox, getUserMessagesCount, setDataToSendLength, setPage } from "Redux/networkSlice";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Container, InboxContainer, MessageContainer } from "./Inbox.styled";
import { getUserById } from "Redux/userOperaions";
export const Inbox = () => {
    let array = [];
    let dataToSet = [];
    let page = useSelector(getPage);
    const loading = useSelector(getLoading);
    const skip = 5;
    const dispatch = useDispatch();
    const allUserMessages = useSelector(getAllUserMassages);
    const count = useSelector(getUserMessagesCount);
    const userInbox = useSelector(getUserInbox);
    dataToSet = [...userInbox];
    dataToSet.length = dataToSet.length > skip ? skip : dataToSet.length;
    const { pathname } = useLocation();
    const userId = useSelector(getUserId)
    useEffect(() => {
        if (userId !== null) {
            dispatch(getUserById(userId));
            dispatch(getAllMessages());
            if (page !== '0') {
                const data = {
                    page,
                    skip
                }
                dispatch(getAllInboxMessage(data));
            }

        }
    }, [dispatch, userId, page])
    const onClickPrev = () => {
        page--;
        dispatch(setPage(page));
    }

    const onClickNext = () => {
        page++;
        dispatch(setPage(page));
    }
    return <div>
        {pathname === "/home/messages/inbox" && dataToSet.map(item => <InboxContainer key={item._id}><MessageContainer><Link to={`/home/profile/${item.owner}`}>{item.sender}</Link></MessageContainer><MessageContainer><Link to={`/home/messages/inbox/${item._id}`}>message{item.read.marked === false ? '(new)' : null}</Link></MessageContainer><MessageContainer>{item.sendedTime}</MessageContainer></InboxContainer>)}
        <Outlet />
        {count.inbox !== 0 && allUserMessages.length > dataToSet.length && pathname === "/home/messages/inbox" && <div>
            <button type="button" disabled={page === '1' || page === 1 ? true : false} onClick={onClickPrev}>prev</button>
            <button type="button" disabled={dataToSet.length === skip && allUserMessages.length / page !== dataToSet.length ? false : true} onClick={onClickNext}>next</button>
        </div>
        }

        {loading && <Container>loading...</Container>}
        {userInbox.length === 0 && !loading && <Container>No inbox messages</Container>}
    </div >
}