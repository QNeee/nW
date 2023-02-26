import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersData, setFindedUserId } from "Redux/networkSlice";
import { findUserById } from "Redux/userOperaions";
import { useNavigate } from "react-router-dom";
import Notiflix from 'notiflix';
export const FindPeople = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nickName: '' });
    const dispatch = useDispatch();
    const allUsers = useSelector(getAllUsersData);
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,

        }));
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const userId = allUsers.filter(item => item.nickName.toLowerCase() === form.nickName.toLowerCase()).map(item => item._id).join('');
        if (userId) {
            dispatch(findUserById(userId));
            setForm({ nickName: '' })
            navigate(`/home/profile/${userId}`);
            setFindedUserId(userId);
        } else {
            return Notiflix.Notify.failure(`no user with nickname ${form.nickName} found`);
        }

    }
    return <form onSubmit={onSubmit}>
        <input type="text" name="nickName" onChange={inputHandler} value={form.nickName} />
        <button type="submit">Find People</button>
    </form>
}