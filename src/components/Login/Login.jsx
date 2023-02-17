import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login } from "Redux/authOperations";
export const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
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
        const loginedUser = {
            email: form.email,
            password: form.password
        }
        dispatch(login(loginedUser));
    }
    return <form onSubmit={onSubmit}>
        <input type="email" name="email" value={form.email} onChange={inputHandler} autoComplete='off' />
        <input type="password" name="password" value={form.password} onChange={inputHandler} autoComplete='off' />
        <button type="submit">Login</button>
    </form>
}