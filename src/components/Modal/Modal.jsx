import { Modal, Backdrop, ButtonContainer } from "./Modal.styled"
import { getModal, setModal } from "Redux/networkSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "Redux/messageOperaions";
import { useNavigate } from "react-router-dom";
export const ModalWindow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modal = useSelector(getModal);
    const onClickYes = async () => {
        dispatch(deleteMessage(modal.id))
        dispatch(setModal({ id: '', open: false }));
        navigate('/home/messages/inbox');
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