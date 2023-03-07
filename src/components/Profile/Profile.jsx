import { getProfile, getUserId, getUserInfo } from "Redux/networkSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ButtonWrapper, CloseSvg, Container, Input, InputContainer, Label, Modal, Wrapper } from "./Profile.styled";
import { useLocation } from "react-router-dom";
import { getProfileById, patchProfile, postProfile } from "Redux/profileOperations";
import { useState } from "react";
import close from '../../images/close.svg';
import { Button } from "components/App.styled";
import { Outlet } from "react-router-dom";
import Notiflix from 'notiflix';
export const Profile = () => {
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({
        name: '', surname: '', age: '', education: '', job: '', phone: ''
    });
    const [redactor, setRedactor] = useState(false);
    const dispatch = useDispatch();
    const id = useSelector(getUserId);
    const userInfo = useSelector(getUserInfo);
    const firstProfile = userInfo.map(item => item.firstProfile).join('');
    const { pathname } = useLocation();
    useEffect(() => {
        if (id !== null && pathname === '/home/profile')
            dispatch(getProfileById(id));
    }, [dispatch, id, pathname])
    const userProfile = useSelector(getProfile)
    const onClick = () => {
        setModal(true);
    }
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }
    const closeModal = () => {
        setModal(false);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const checkAge = form.age;
        if (checkAge.split('-')[0].length > 4) return Notiflix.Notify.failure('wrong field age : year');
        setForm({
            name: '', surname: '', age: '', education: '', job: '', phone: ''
        });
        dispatch(postProfile(form));
        setModal(false);
    }
    const onClickOpenRedactor = () => {
        setForm({
            name: '', surname: '', age: '', education: '', job: '', phone: ''
        })
        setRedactor(true);
    }
    const onClickCloseRedactor = () => {
        setRedactor(false);
        setForm({
            name: '', surname: '', age: '', education: '', job: '', phone: ''
        })
    }
    const onClickRedactorSubmit = (e) => {
        e.preventDefault();
        const refs = {
            name: document.getElementById('name'),
            surname: document.getElementById('surname'),
            age: document.getElementById('age'),
            job: document.getElementById('job'),
            phone: document.getElementById('phone'),
            education: document.getElementById('education'),
        }
        const dataToPatch = {
            name: form.name === '' ? refs.name.getAttribute("placeholder") : form.name,
            surname: form.surname === '' ? refs.surname.getAttribute("placeholder") : form.surname,
            age: form.age === '' ? refs.age.getAttribute("placeholder") : form.age,
            job: form.job === '' ? refs.job.getAttribute("placeholder") : form.job,
            phone: form.phone === '' ? refs.phone.getAttribute("placeholder") : form.phone,
            education: form.education === '' ? refs.education.getAttribute("placeholder") : form.education,

        }
        const data = {
            id,
            dataToPatch
        }
        dispatch(patchProfile(data));
        setRedactor(false);
    }
    return <Container>
        {pathname === '/home/profile' && firstProfile === 'false' && userProfile[0] === null && !modal && <> Hello its u profile,
            u need to create <Button onClick={onClick} type="button">create Profile</Button></>}
        {modal && <Modal><CloseSvg onClick={closeModal}>
            <img src={close} alt="close" />
        </CloseSvg><Wrapper onSubmit={onSubmit}>
                <InputContainer>
                    <Label>Name<Input type="text" name="name" required={true} value={form.name} onChange={inputHandler} /></Label>
                    <Label>Surname<Input type="text" name="surname" required={true} value={form.surname} onChange={inputHandler} /></Label>
                    <Label>Age<Input type="date" name="age" required={true} value={form.age} onChange={inputHandler} /></Label>
                    <Label>Job<Input type="text" name="job" value={form.job} onChange={inputHandler} /></Label>
                    <Label>Phone<Input type="text" name="phone" value={form.phone} onChange={inputHandler} /></Label>
                    <Label>Education<Input type="text" name="education" value={form.education} onChange={inputHandler} /></Label>
                </InputContainer>
                <button type="submit">Create</button>
            </Wrapper></Modal>}
        {userProfile[0] !== null && pathname === '/home/profile' && userProfile.map(item => <Wrapper key={item._id}><InputContainer>
            {!redactor ? <p>Name : {item.name}</p> : <p><Label>Name: <Input type="text" id="name" name="name" required={true} value={form.name} onChange={inputHandler} placeholder={item.name} /></Label></p>}
            {!redactor ? <p>Surname : {item.surname}</p> : <p><Label>Surname: <Input type="text" id="surname" name="surname" value={form.surname} onChange={inputHandler} placeholder={item.surname} /></Label></p>}
            {!redactor ? <p>Age : {item.age}</p> : <p><Label>Age: <Input type="number" name="age" id="age" value={form.age} onChange={inputHandler} placeholder={item.age} /></Label></p>}
            {item.phone && !redactor && <p>Phone : {item.phone}</p>}
            {redactor && <p><Label>Phone: <Input type="text" name="phone" id="phone" value={form.phone} onChange={inputHandler} placeholder={item.phone} /></Label></p>}
            {item.job && !redactor && <p>Job : {item.job}</p>}
            {redactor && <p><Label>Job: <Input type="text" name="job" id="job" value={form.job} onChange={inputHandler} placeholder={item.job} /></Label></p>}
            {item.education && !redactor && <p>Education : {item.education}</p>}
            {redactor && <p><Label>Education: <Input type="text" name="education" id="education" value={form.education} onChange={inputHandler} placeholder={item.education} /></Label></p>}
            {!redactor && <Button onClick={onClickOpenRedactor} type="button">Redactor</Button>}
            <ButtonWrapper>
                {redactor && <Button onClick={onClickCloseRedactor} type="button">Return</Button>}
                {redactor && <Button onClick={onClickRedactorSubmit} type="submit">Save</Button>}
            </ButtonWrapper></InputContainer></Wrapper>)}
        <Outlet />
    </Container>
}