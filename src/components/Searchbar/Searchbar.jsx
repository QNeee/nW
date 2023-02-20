import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserByNickName } from "Redux/userOperaions";
import { Link, useLocation, Outlet } from "react-router-dom";
export const Searchbar = () => {
    const [form, setForm] = useState({ nickName: '' })
    const dispatch = useDispatch();
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,

        }));
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getUserByNickName(form.nickName));
    }
    return <><form onSubmit={onSubmit}>
        <input type="text" name="nickName" value={form.nickName} onChange={inputHandler} autoComplete="off" />
        <button type="submit">Find Friend</button>
    </form ><Outlet /></>
}