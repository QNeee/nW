import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "Redux/authOperations";
import {
    Modal,
    Wrapper,
    InputContainer,
    Text,
    LoginButtonWrapper,
    Input,
    LogoContainer,
    AuthContainer,
    H1,
    P,
    H3,
    LoginForm,
    Label,
    LoginFormContainer,
    Button,
    ButtonWrapper,
    CloseSvg,
    Backdrop,
} from './AuthPage.styled';
import close from '../../images/close.svg';
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
    const closeModal = () => {
        setModal(false);
    }
    return <AuthContainer>
        <LogoContainer>
            <H1>Network</H1>
            <P>Keep in touch with loved ones</P>
        </LogoContainer>
        <div>
            {!modal && <LoginFormContainer><LoginForm onSubmit={onSubmit}>
                <Label>Email
                    <Input type="email" name="email" value={form.email} onChange={inputHandler} autoComplete="off" />
                </Label>
                <Label>Password
                    <Input type="password" name="password" value={form.password} onChange={inputHandler} autoComplete="off" />
                </Label>
                <LoginButtonWrapper>
                    <Button type="submit">Login</Button>
                    <Button type="button" onClick={onClickModal}>Register</Button>
                </LoginButtonWrapper>
            </LoginForm></LoginFormContainer>}

            {modal && <Modal><CloseSvg onClick={closeModal}>
                <img src={close} alt="close" />
            </CloseSvg><H3>Register</H3><Wrapper onSubmit={onSubmit}>
                    <InputContainer>
                        <Label>Email
                            <Input type="email" name="email" value={form.email} onChange={inputHandler} autoComplete="off" />
                        </Label>
                        <Label>Password
                            <Input type="password" name="password" value={form.password} onChange={inputHandler} autoComplete="off" />
                        </Label>
                        <Label>Nickname
                            <Input type="text" name="nickName" value={form.nickName} onChange={inputHandler} autoComplete="off" />
                        </Label>
                    </InputContainer>
                    <Button type="submit">Register</Button>
                </Wrapper></Modal>}
        </div>
    </AuthContainer>
}