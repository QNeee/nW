
import { useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { getInboxMessageById, getOutboxMessageById } from "Redux/messageOperaions";
import { useDispatch, useSelector } from "react-redux";
import { getInboxContent, getOutboxContent } from "Redux/networkSlice";

export const InboxContent = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const splitId = pathname.split('/')
    const id = splitId[4];
    const inboxContent = useSelector(getInboxContent);
    useEffect(() => {
        if (id)
            dispatch(getInboxMessageById(id))
    }, [dispatch, id])
    return <div>
        {Object.values(inboxContent).length > 0 && <p>{inboxContent.message.content}</p>}
    </div>
}