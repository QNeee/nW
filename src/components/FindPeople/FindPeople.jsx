import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersData, getUserInfo, setFind } from "Redux/networkSlice";
import { findUserById, getAllUsers, getUserById, getUserByNickName } from "Redux/userOperaions";

export const FindPeople = () => {
    const [form, setForm] = useState({ nickName: '' });
    const dispatch = useDispatch();
    const allUsers = useSelector(getAllUsersData);
    const userInfo = useSelector(getUserInfo);
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
        dispatch(findUserById(userId));
        dispatch(setFind(true));
        setForm({ nickName: '' })
    }
    return <form onSubmit={onSubmit}>
        <input type="text" name="nickName" onChange={inputHandler} value={form.nickName} />
        <button type="submit">Find People</button>
    </form>
}