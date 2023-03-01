import { getSortedMessages, getUserId, getUserNickName } from "Redux/networkSlice"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllSortedMessages, sendMessage } from "Redux/messageOperaions";
import { Container, FormContainer, Form, DialogueContainer, ContainerInContainer, Input } from "./Dialogue.styled";
import { Button } from "components/App.styled";
import { useState } from "react";


export const Dialogue = () => {
    const div = document.getElementById('main');
    const navigate = useNavigate();
    const slowScreen = () => {
        const { height: cardHeight } = div
            .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth"
        });
    }
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
        slowScreen();
    }

    const sortedMessages = useSelector(getSortedMessages);
    const onClickReturn = () => {
        navigate('/home/messages/dialogues')
    }

    return <><Button onClick={onClickReturn}>Return to Dialogues</Button><DialogueContainer id="main">
        {sortedMessages.map(item => <Container prop={!item.view.inbox} key={item._id}><ContainerInContainer>{item.content}</ContainerInContainer></Container>)}
    </DialogueContainer>
        <FormContainer><Form onSubmit={onSubmit}>
            <Input placeholder={"ENTER YOUR MESSAGE"} type="text" name="message" value={form.message} onChange={inputHandler} />
            <Button type="submit">Send Message</Button>
        </Form></FormContainer>
    </>
}