import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "Redux/authOperations";


export const AuthPage = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({
        email: '', password: '', nickName: ''
    });
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,

        }));
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (!modal) {
            const newUser = {
                email: form.email,
                password: form.password
            }
            dispatch(login(newUser));
            setForm({ email: '', password: '' });
        } else {
            const newUser = {
                email: form.email,
                password: form.password,
                nickName: form.nickName
            }
            dispatch(register(newUser));
            setForm({ email: '', password: '', nickName: '' });
        }

    }
    const onClickModal = () => {
        setModal(true);
    }
    return <div>
        <div>
            <h1>Network</h1>
        </div>
        <div>
            {!modal && <form onSubmit={onSubmit}>
                <input type="email" name="email" value={form.email} onChange={inputHandler} autoComplete="off" />
                <input type="password" name="password" value={form.password} onChange={inputHandler} autoComplete="off" />
                <button type="submit">Login</button>
                <button type="button" onClick={onClickModal}>Register</button>
            </form>}
            {modal && <form onSubmit={onSubmit}>
                <input type="email" name="email" value={form.email} onChange={inputHandler} autoComplete="off" />
                <input type="password" name="password" value={form.password} onChange={inputHandler} autoComplete="off" />
                <input type="text" name="nickName" value={form.nickName} onChange={inputHandler} autoComplete="off" />
                <button type="submit">Login</button>
            </form>}
        </div>
    </div>
}