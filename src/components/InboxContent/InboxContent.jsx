
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllInboxMessage, getInboxMessageById, } from "Redux/messageOperaions";
import { useDispatch, useSelector } from "react-redux";
import { getInboxContent, getModal, getPage, setAnswerData, setModal, setReturn } from "Redux/networkSlice";
import { ContentContainer, InboxContentContainer, Span, P, ButtonContainer } from "./InboxContent.styled";
import { ModalWindow } from "components/Modal/Modal";

export const InboxContent = () => {
    let page = useSelector(getPage);
    const skip = 5;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const modal = useSelector(getModal);
    const splitId = pathname.split('/');
    const id = splitId[4];
    const inboxContent = useSelector(getInboxContent);
    useEffect(() => {
        if (id)
            dispatch(getInboxMessageById(id));
    }, [dispatch, id])
    const onClickAnswer = () => {
        dispatch(setAnswerData(inboxContent.message.sender))
        navigate('/home/messages');
    }
    const onClickDelete = () => {
        dispatch(setModal({ id: id, open: true }));
    }
    const onClickReturn = () => {
        navigate('/home/messages/inbox');
        const data = {
            page,
            skip
        }
        dispatch(setReturn());
        dispatch(getAllInboxMessage(data));
    }
    return <div>
        <button type="button" onClick={onClickReturn}>return to Inbox</button>
        {Object.values(inboxContent).length > 0 && !modal.open && <><InboxContentContainer><Span>From:{inboxContent.message.sender}</Span><Span>Time:{inboxContent.message.sendedTime}</Span></InboxContentContainer><ContentContainer><P>{inboxContent.message.content}</P></ContentContainer><ButtonContainer><button onClick={onClickDelete} type="button">Delete Message</button><button onClick={onClickAnswer} type="button">Answer</button></ButtonContainer></>}
        {modal.open && <ModalWindow />}
    </div>
}