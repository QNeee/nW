
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOutboxMessageById } from "Redux/messageOperaions";
import { useDispatch, useSelector } from "react-redux";
import { getModal, getOutboxContent, setModal } from "Redux/networkSlice";
import { ContentContainer, Div } from "./OutboxContent.styled";
import { ModalWindow } from "components/Modal/Modal";

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

    return <ContentContainer>
        <button type="button" onClick={onClickReturn}>return to Inbox</button>
        {Object.values(outBoxContent).length > 0 && <Div>{outBoxContent.message.content}</Div>}
        <button onClick={onClickDelete} type="button">Delete Message</button>
        {modal.open && <ModalWindow />}
    </ContentContainer>
}