import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "Redux/authOperations";
import {
    Modal,
    Wrapper,
    InputContainer,
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
    CloseSvg,
} from './AuthPage.styled';
import close from '../../images/close.svg';
import { getError } from "Redux/networkSlice";
import Notiflix from 'notiflix';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const AuthPage = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const error = useSelector(getError);
    const dispatch = useDispatch();
    const [formRegister, setFormRegister] = useState({
        email: '', password: '', nickName: ''
    });
    const [formLogin, setFormLogin] = useState({
        email: '', password: ''
    });
    const inputHandlerRegister = (e) => {
        const { name, value } = e.target;
        setFormRegister(prev => ({
            ...prev,
            [name]: value,

        }));
    }
    const inputHandlerLogin = (e) => {
        const { name, value } = e.target;
        setFormLogin(prev => ({
            ...prev,
            [name]: value,

        }));
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (pathname === '/') {
            const newUser = {
                email: formLogin.email,
                password: formLogin.password
            }
            const loginUser = await dispatch(login(newUser));
            if (!loginUser.error) {
                setFormLogin({ email: '', password: '' });
                return Notiflix.Notify.success('Hello');
            }

        } else {
            const newUser = {
                email: formRegister.email,
                password: formRegister.password,
                nickName: formRegister.nickName
            }
            const registration = await dispatch(register(newUser));
            if (!registration.error) {
                setFormRegister({ email: '', password: '', nickName: '' });
                Notiflix.Notify.success('Registration Success');
                navigate('/verification')
            }
        }

    }
    const onClickModal = () => {
        navigate('/register')
    }
    const closeModal = () => {
        navigate('/')
    }
    useEffect(() => {
        if (error)
            checkErrors()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])
    const checkErrors = () => {

        if (pathname === '/') {
            if (error.response.status === 400) return Notiflix.Notify.failure(error.response.data.status.map(item => item.message).join(''));
            if (error.response.status === 404) return Notiflix.Notify.failure(error.response.data.message);
            if (error.response.status === 403) return Notiflix.Notify.failure(error.response.data.message);
        }
        if (pathname === '/register') {
            if (error.response.status === 400) return Notiflix.Notify.failure(error.response.data.status.map(item => item.message).join(''));
            if (error.response.status === 409) return Notiflix.Notify.failure(error.response.data.message);
        }

    }
    return <AuthContainer>
        <LogoContainer>
            <H1>Network</H1>
            <P>helps to keep in touch with family and friends.</P>
        </LogoContainer>
        <div>
            {pathname === '/' && <LoginFormContainer><LoginForm onSubmit={onSubmit}>
                <Label>Email
                    <Input type="email" name="email" value={formLogin.email} onChange={inputHandlerLogin} autoComplete="off" />
                </Label>
                <Label>Password
                    <Input type="password" name="password" value={formLogin.password} onChange={inputHandlerLogin} autoComplete="off" />
                </Label>
                <LoginButtonWrapper>
                    <Button type="submit">Login</Button>
                    <Button type="button" onClick={onClickModal}>Register</Button>
                </LoginButtonWrapper>
            </LoginForm></LoginFormContainer>}

            {pathname === '/register' && <Modal><CloseSvg onClick={closeModal}>
                <img src={close} alt="close" />
            </CloseSvg><H3>Register</H3><Wrapper onSubmit={onSubmit}>
                    <InputContainer>
                        <Label>Email
                            <Input type="email" name="email" value={formRegister.email} onChange={inputHandlerRegister} autoComplete="off" />
                        </Label>
                        <Label>Password
                            <Input type="password" name="password" value={formRegister.password} onChange={inputHandlerRegister} autoComplete="off" />
                        </Label>
                        <Label>Nickname
                            <Input type="text" name="nickName" value={formRegister.nickName} onChange={inputHandlerRegister} autoComplete="off" />
                        </Label>
                    </InputContainer>
                    <Button type="submit">Register</Button>
                </Wrapper></Modal>}
        </div>
    </AuthContainer>
}