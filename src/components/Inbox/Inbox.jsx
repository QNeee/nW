import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllInboxMessage, getAllMessages } from "Redux/messageOperaions";
import { getAllUserMassages, getLoading, getOnlyRead, getOnlyUnread, getPage, getUserId, getUserInbox, getUserMessagesCount, setOnlyRead, setOnlyUnread, setPage, setReturn } from "Redux/networkSlice";
import { useLocation, Outlet } from "react-router-dom";
import { Container, InboxContainer, Span, ButtonContainer, MessageContainerFirst, MessageContainerSecond, MessageContainerThird, StyledLink } from "./Inbox.styled";
import { Button } from "components/App.styled";
import { getUserById } from "Redux/userOperaions";
import { useState } from "react";
import { time, date } from "func";
export const Inbox = () => {
    const [data, setData] = useState([]);
    const unread = useSelector(getOnlyUnread);
    const read = useSelector(getOnlyRead);
    let dataToSet = [];
    let page = useSelector(getPage);
    const loading = useSelector(getLoading);
    const skip = 5;
    const dispatch = useDispatch();
    const allUserMessages = useSelector(getAllUserMassages);
    const allUserInbox = allUserMessages.filter(item => item.view.inbox);
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
            dispatch(setReturn());
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
    const onClickUnread = () => {
        const unreadMessages = allUserMessages.filter(item => item.view.inbox).filter(item => !item.read.marked);
        dispatch(setOnlyUnread(true));
        setData(unreadMessages);
    }
    const onClickRead = () => {
        const readMessages = allUserMessages.filter(item => item.view.inbox).filter(item => item.read.marked);
        dispatch(setOnlyRead(true));
        setData(readMessages);
    }
    const onClickReturn = () => {
        dispatch(setReturn());
    }

    return <div>
        <div>
            {pathname === "/home/messages/inbox" && page === 1 && dataToSet.length > 0 && <Button type="button" onClick={onClickUnread}>Only Unread </Button>}
            {pathname === "/home/messages/inbox" && page === 1 && dataToSet.length > 0 && <Button type="button" onClick={onClickRead}>Only Read </Button>}
            {read && !unread && pathname === "/home/messages/inbox" && page === 1 && <Button type="button" onClick={onClickReturn}>return</Button>}
            {!read && unread && pathname === "/home/messages/inbox" && page === 1 && < Button type="button" onClick={onClickReturn}>return</Button>}
        </div>
        {read && !unread && pathname === "/home/messages/inbox" && data.length === 0 && <Container>no read messages found</Container>}
        {!read && unread && pathname === "/home/messages/inbox" && data.length === 0 && <Container>no unread messages found</Container>}
        {pathname === "/home/messages/inbox" && !read && !unread && dataToSet.map(item => <InboxContainer key={item._id}><MessageContainerFirst><StyledLink to={`/home/profile/${item.find}`}>{item.sender}</StyledLink></MessageContainerFirst><MessageContainerSecond><StyledLink to={`/home/messages/inbox/${item._id}`}><>message</>{item.read.marked === false ? <Span>(new)</Span> : null}</StyledLink></MessageContainerSecond><MessageContainerThird>Date:{date(item.sendedDate)} Time:{time(item.sendedDate)}</MessageContainerThird></InboxContainer>)}
        {pathname === "/home/messages/inbox" && !read && unread && data.map(item => <InboxContainer key={item._id}><MessageContainerFirst><StyledLink to={`/home/profile/${item.find}`}>{item.sender}</StyledLink></MessageContainerFirst><MessageContainerSecond><StyledLink to={`/home/messages/inbox/${item._id}`}>message{item.read.marked === false ? <Span>(new)</Span> : null}</StyledLink></MessageContainerSecond><MessageContainerThird>Date:{date(item.sendedDate)} Time:{time(item.sendedDate)}</MessageContainerThird></InboxContainer>)}
        {pathname === "/home/messages/inbox" && read && !unread && data.map(item => <InboxContainer key={item._id}><MessageContainerFirst><StyledLink to={`/home/profile/${item.find}`}>{item.sender}</StyledLink></MessageContainerFirst><MessageContainerSecond><StyledLink to={`/home/messages/inbox/${item._id}`}>message{item.read.marked === false ? <Span>(new)</Span> : null}</StyledLink></MessageContainerSecond><MessageContainerThird>Date:{date(item.sendedDate)} Time:{time(item.sendedDate)}</MessageContainerThird></InboxContainer>)}
        <Outlet />
        {count.inbox !== 0 && !read && !unread && allUserInbox.length > dataToSet.length && pathname === "/home/messages/inbox" && <ButtonContainer>
            <Button type="button" disabled={page === '1' || page === 1 ? true : false} onClick={onClickPrev}>prev</Button>
            <Button type="button" disabled={dataToSet.length === skip && allUserInbox.length / page !== dataToSet.length ? false : true} onClick={onClickNext}>next</Button>
        </ButtonContainer>}
        {loading && <Container>loading...</Container>}
        {userInbox.length === 0 && !loading && !read && !unread && < Container > No inbox messages</Container>
        }

    </div >
}