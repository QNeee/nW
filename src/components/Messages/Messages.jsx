import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages, sendMessage } from "Redux/messageOperaions";
import { getUserId, getUserMessagesCount, getUserNickName } from "Redux/networkSlice";
import { getUserById } from "Redux/userOperaions";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useState } from "react";
export const Messages = () => {
    const [form, setForm] = useState({ nickName: '', content: '' });
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,

        }));
    }
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const messagesCount = useSelector(getUserMessagesCount);
    const userNickName = useSelector(getUserNickName);
    const { pathname } = useLocation();
    useEffect(() => {
        if (userId !== null)
            dispatch(getUserById(userId));
    }, [dispatch, userId])
    const onSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            sender: userNickName,
            content: form.content,
            receiver: form.nickName
        }
        dispatch(sendMessage(newMessage));
    }
    return <div><Link to='/home/messages/outbox'>Outbox {messagesCount.outbox}</Link>
        <Link to='/home/messages/inbox'>Inbox {messagesCount.inbox}</Link>
        Send Message
        {pathname === "/home/messages" && <form onSubmit={onSubmit}>
            <label>NickName
                <input type="text" name="nickName" onChange={inputHandler} value={form.nickName} autoComplete="off" /></label>
            <label>Content<input type="text" name="content" onChange={inputHandler} value={form.content} autoComplete="off" /></label>
            <button type="submit">Send Message</button>
        </form>}<Outlet /></div>
}