
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllInboxMessage, getInboxMessageById, } from "Redux/messageOperaions";
import { useDispatch, useSelector } from "react-redux";
import { getInboxContent, getModal, getPage, setAnswerData, setModal, setReturn } from "Redux/networkSlice";
import { ContentContainer, InboxContentContainer, P, ButtonContainer, SpanSecond, SpanFirst } from "./InboxContent.styled";
import { Button } from "components/App.styled";
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
        <Button type="button" onClick={onClickReturn}>return to Inbox</Button>
        {Object.values(inboxContent).length > 0 && !modal.open && <><InboxContentContainer><SpanFirst>From:</SpanFirst><SpanSecond>{inboxContent.message.sender}</SpanSecond><SpanFirst>Time:</SpanFirst><SpanSecond>{inboxContent.message.sendedTime}</SpanSecond></InboxContentContainer><ContentContainer><P>{inboxContent.message.content}</P></ContentContainer><ButtonContainer><Button onClick={onClickDelete} type="button">Delete Message</Button><Button onClick={onClickAnswer} type="button">Answer</Button></ButtonContainer></>}
        {modal.open && <ModalWindow />}
    </div>
}