
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOutboxMessageById } from "Redux/messageOperaions";
import { useDispatch, useSelector } from "react-redux";
import { getModal, getOutboxContent, setModal } from "Redux/networkSlice";
import { Button } from "components/App.styled";
import { ModalWindow } from "components/Modal/Modal";
import { ButtonContainer, ContentContainer, InboxContentContainer, P, SpanFirst, SpanSecond } from "components/InboxContent/InboxContent.styled";

export const OutboxContent = () => {
    const modal = useSelector(getModal);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const splitId = pathname.split('/')
    const id = splitId[4];
    const outBoxContent = useSelector(getOutboxContent);
    useEffect(() => {
        if (id)
            dispatch(getOutboxMessageById(id))
    }, [dispatch, id])
    const onClickDelete = () => {
        dispatch(setModal({ id: id, open: true }));
    }
    const onClickReturn = () => {
        navigate('/home/messages/outbox');
    }
    console.log(outBoxContent);
    return <div>
        <Button type="button" onClick={onClickReturn}>return to Outbox</Button>
        {Object.values(outBoxContent).length > 0 && !modal.open && <><InboxContentContainer><SpanFirst>To:</SpanFirst><SpanSecond>{outBoxContent.message.receiver}</SpanSecond><SpanFirst>Time:</SpanFirst><SpanSecond>{outBoxContent.message.sendedDate}</SpanSecond></InboxContentContainer><ContentContainer><P>{outBoxContent.message.content}</P></ContentContainer><ButtonContainer><Button onClick={onClickDelete} type="button">Delete Message</Button></ButtonContainer></>}
        {modal.open && <ModalWindow />}
    </div>
}