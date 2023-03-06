import { getModal, getSortedMessages, getUserId, getUserNickName, setMessageClear } from "Redux/networkSlice"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllSortedMessages, sendMessage } from "Redux/messageOperaions";
import { Container, NicknamesDiv, ButtonWrapper, TimeContainer, TimeMessage, FormContainer, Form, DialogueContainer, ContainerInContainer, Input } from "./Dialogue.styled";
import { Button } from "components/App.styled";
import { useState } from "react";
import { ModalWindow } from "components/Modal/Modal";



export const Dialogue = () => {
    const navigate = useNavigate();

    const modal = useSelector(getModal);
    const dispatch = useDispatch();
    const userNickName = useSelector(getUserNickName);
    const [form, setForm] = useState({ message: '' });
    const userId = useSelector(getUserId);
    const { pathname } = useLocation();
    const receiver = pathname.split('/')[4];
    useEffect(() => {
        if (userId !== null)
            dispatch(getAllSortedMessages(receiver))
    }, [dispatch, userId, receiver])
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,

        }));
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            sender: userNickName,
            content: form.message,
            receiver: receiver
        }
        dispatch(sendMessage(newMessage));
        setForm({ message: '' });
    }

    const sortedMessages = useSelector(getSortedMessages);
    const onClickReturn = () => {
        dispatch(setMessageClear());
        navigate('/home/messages/dialogues')
    }

    const date = (date) => {
        const messageDate = date.split('T')[0];
        return messageDate
    }
    const time = (date) => {
        const messageTime = date.split('T')[1].split('.')[0];
        return messageTime;
    }
    return <><ButtonWrapper><Button type="button" onClick={onClickReturn}>Return to Dialogues</Button></ButtonWrapper><NicknamesDiv><div>{receiver}</div><div>{userNickName}</div></NicknamesDiv><DialogueContainer id="main">
        {sortedMessages.map(item => <Container prop={!item.view.inbox} key={item._id}><ContainerInContainer>{item.content}<TimeMessage><TimeContainer>{date(item.sendedDate)}</TimeContainer><div>{time(item.sendedDate)}</div></TimeMessage></ContainerInContainer></Container>)}
    </DialogueContainer>
        <FormContainer><Form onSubmit={onSubmit}>
            <Input placeholder={"ENTER YOUR MESSAGE"} type="text" name="message" value={form.message} onChange={inputHandler} />
            <Button type="submit">Send Message</Button>
        </Form></FormContainer>
        {modal.open && <ModalWindow />}
    </>
}