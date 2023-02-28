import { getAllUserMassages, getSortedMessages, getUserId, getUserNickName } from "Redux/networkSlice"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet, Link } from "react-router-dom";
import { getAllSortedMessages } from "Redux/messageOperaions";


export const Dialogue = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    useEffect(() => {
        if (userId !== null)
            dispatch(getAllSortedMessages())
    }, [dispatch, userId])
    const sortedMessages = useSelector(getSortedMessages);
    console.log(sortedMessages);
    const { pathname } = useLocation();
    const dialogMaker = pathname.split('/')[4];
    const messages = useSelector(getAllUserMassages);
    const userInbox = messages.filter(item => item.view.inbox).filter(item => item.sender === dialogMaker);
    const userOutbox = messages.filter(item => item.view.outbox).filter(item => item.receiver === dialogMaker);
    const dialogue = [...userInbox, ...userOutbox]

    return <div>
        {sortedMessages.map(item => <div key={item._id}>{item.content}</div>)}
    </div>
}