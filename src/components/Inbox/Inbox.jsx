import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllInboxMessage, getNextInboxLimit, getPrevInboxLimit } from "Redux/messageOperaions";
import { getPage, getUserInbox } from "Redux/networkSlice";
import { Link, useLocation, Outlet } from "react-router-dom";
import { InboxContainer } from "./Inbox.styled";
export const Inbox = () => {
    let dataToSet = [];
    let page = useSelector(getPage);
    const skip = 5;
    const dispatch = useDispatch();
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
        {pathname === "/home/messages/inbox" && dataToSet.map(item => <InboxContainer prop={item.read.marked} key={item._id}><div><Link to={`/home/profile/${item.owner}`}>{item.sender}</Link></div><div><Link to={`/home/messages/inbox/${item._id}`}>message</Link></div><div>{item.sendedTime}</div></InboxContainer>)}
        <Outlet />
        <button type="button" onClick={onClickPrev}>prev</button>
        <button type="button" onClick={onClickNext}>next</button>
    </div>
}