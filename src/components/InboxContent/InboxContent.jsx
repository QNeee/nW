
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getInboxMessageById, } from "Redux/messageOperaions";
import { useDispatch, useSelector } from "react-redux";
import { getInboxContent, getModal, setAnswerData, setModal } from "Redux/networkSlice";
import { ContentContainer, InboxContentContainer, Span, P, ButtonContainer } from "./InboxContent.styled";
import { ModalWindow } from "components/Modal/Modal";

export const InboxContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const modal = useSelector(getModal);
    const splitId = pathname.split('/')
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
    return <div>
        {Object.values(inboxContent).length > 0 && !modal.open && <><InboxContentContainer><Span>From:{inboxContent.message.sender}</Span><Span>Time:{inboxContent.message.sendedTime}</Span></InboxContentContainer><ContentContainer><P>{inboxContent.message.content}</P></ContentContainer><ButtonContainer><button onClick={onClickDelete} type="button">Delete Message</button><button onClick={onClickAnswer} type="button">Answer</button></ButtonContainer></>}
        {modal.open && <ModalWindow />}
    </div>
}