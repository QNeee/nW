import { Modal, Backdrop, ButtonContainer } from "./Modal.styled"
import { getModal, setModal, setReturn } from "Redux/networkSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteInboxMessage, deleteOutboxMessage } from "Redux/messageOperaions";
import { useNavigate, useLocation } from "react-router-dom";
export const ModalWindow = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modal = useSelector(getModal);
    const onClickYes = async () => {
        if (pathname === `/home/messages/inbox/${modal.id}`) {
            dispatch(deleteInboxMessage(modal.id))
            navigate('/home/messages/inbox');
            dispatch(setReturn());
        }
        if (pathname === `/home/messages/outbox/${modal.id}`) {
            dispatch(deleteOutboxMessage(modal.id))
            navigate('/home/messages/outbox');
        }
        dispatch(setModal({ id: '', open: false }));
    }
    const onClickNo = () => {
        dispatch(setModal({ id: '', open: false }));
    }
    return <Backdrop><Modal>
        <span>Do u rly want to delete?</span>
        <ButtonContainer><button onClick={onClickYes} type="button">Yes</button>
            <button onClick={onClickNo} type="button">No</button></ButtonContainer>
    </Modal></Backdrop>
}