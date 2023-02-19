
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { changeStatusReadMessage, getAllInboxMessage, getInboxMessageById, getUnreadMessages } from "Redux/messageOperaions";
import { useDispatch, useSelector } from "react-redux";
import { getInboxContent } from "Redux/networkSlice";
import { ContentContainer } from "./InboxContent.styled";

export const InboxContent = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const splitId = pathname.split('/')
    const id = splitId[4];
    const inboxContent = useSelector(getInboxContent);
    useEffect(() => {
        if (id)
            dispatch(getInboxMessageById(id));
        dispatch(getAllInboxMessage('false'));
    }, [dispatch, id])
    return <ContentContainer>
        {Object.values(inboxContent).length > 0 && <p>{inboxContent.message.content}</p>}
    </ContentContainer>
}