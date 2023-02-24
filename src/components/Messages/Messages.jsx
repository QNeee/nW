import { useDispatch, useSelector } from "react-redux";
import { getAllMessages, sendMessage } from "Redux/messageOperaions";
import { getAnswerData, getUserId, getUserNickName, setAnswerData } from "Redux/networkSlice";
import { useLocation, Outlet } from "react-router-dom";
import { useState } from "react";
import { FormDiv, LinkDiv, MessageLink, MainContainer } from "./Messages.styled";
import "../../index.css"
import { useEffect } from "react";
export const Messages = () => {
    const userId = useSelector(getUserId)
    const dispatch = useDispatch();
    const answerData = useSelector(getAnswerData);
    const [form, setForm] = useState(
        { nickName: '', content: '' });
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,

        }));
    }
    const userNickName = useSelector(getUserNickName);
    const { pathname } = useLocation();
    const onSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            sender: userNickName,
            content: form.content,
            receiver: answerData === '' ? form.nickName : answerData
        }
        dispatch(sendMessage(newMessage));
        dispatch(setAnswerData(''));
        setForm({ nickName: '', content: '' });
    }
    useEffect(() => {
        if (pathname === '/home/messages' && userId !== null) {
            dispatch(getAllMessages())
        }
    }, [dispatch, pathname, userId])
    return <MainContainer>{(pathname === '/home/messages' || pathname === '/home/messages/inbox' || pathname === '/home/messages/outbox') && <LinkDiv><MessageLink to='/home/messages/outbox'>Outbox</MessageLink>
        <MessageLink to='/home/messages/inbox'>Inbox</MessageLink></LinkDiv>}
        {pathname === "/home/messages" && <FormDiv><form className="decor" onSubmit={onSubmit}>
            <div className="form-left-decoration"></div>
            <div className="form-right-decoration"></div>
            <div className="circle"></div>
            <div className="form-inner">
                <input type="text" name="nickName" onChange={inputHandler} value={answerData === '' ? form.nickName : answerData} autoComplete="off" placeholder="Nickname" />
                <textarea type="text" name="content" onChange={inputHandler} value={form.content} autoComplete="off" placeholder="message" ></textarea>
                <button className="gradient-button" type="submit" value="Отправить" >Send</button>
            </div>
        </form></FormDiv>}<Outlet />
    </MainContainer>
}