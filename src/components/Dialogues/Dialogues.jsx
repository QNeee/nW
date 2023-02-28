import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet, Link } from "react-router-dom";
import { getAllSortedMessages } from "Redux/messageOperaions";
import { getAllUserMassages, getUserId } from "Redux/networkSlice";
export const Dialogues = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSortedMessages())
    }, [dispatch])
    const messages = useSelector(getAllUserMassages);
    const sortedMessages = useSelector(getAllSortedMessages);
    console.log(sortedMessages);
    const userInbox = messages.filter(item => item.view.inbox);
    const userOutbox = messages.filter(item => item.view.outbox);
    const inboxNicknames = userInbox.length > 0 && userOutbox.length === 0 ? userInbox.map(item => item.sender) : userOutbox.map(item => item.receiver);
    const uniqueNicknames = [...new Set(inboxNicknames)]
    return <div>dialogues
        {uniqueNicknames.map(item => <div key={item}><Link to={item}>{item}</Link></div>)}
    </div>
}