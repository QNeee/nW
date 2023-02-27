import { getFirstProfile, getProfile, getUserId } from "Redux/networkSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserById } from "Redux/userOperaions";
import { CloseSvg, Container, Input, InputContainer, Label, Modal, Wrapper } from "./Profile.styled";
import { useLocation } from "react-router-dom";
import { getProfileById, postProfile } from "Redux/profileOperations";
import { useState } from "react";
import close from '../../images/close.svg';
import { Button } from "components/App.styled";
export const Profile = () => {
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({
        name: '', surname: '', age: '', education: '', job: '', phone: ''
    });
    const dispatch = useDispatch();
    const id = useSelector(getUserId);
    const { pathname } = useLocation();
    useEffect(() => {
        if (id !== null && pathname === '/home/profile')
            dispatch(getUserById(id));
    }, [dispatch, id, pathname])
    const firstProfile = useSelector(getFirstProfile);
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
        setForm({
            name: '', surname: '', age: '', education: '', job: '', phone: ''
        });
        dispatch(postProfile(form));
        dispatch(getProfileById(id));
        setModal(false);
    }
    console.log(userProfile);
    return <Container>
        {!firstProfile && userProfile.length === 0 && !modal && <> Hello its u profile,
            u need to create <Button onClick={onClick} type="button">create Profile</Button></>}
        {modal && <Modal><CloseSvg onClick={closeModal}>
            <img src={close} alt="close" />
        </CloseSvg><Wrapper onSubmit={onSubmit}>
                <InputContainer>
                    <Label>Name<Input type="text" name="name" required={true} value={form.name} onChange={inputHandler} /></Label>
                    <Label>Surname<Input type="text" name="surname" required={true} value={form.surname} onChange={inputHandler} /></Label>
                    <Label>Age<Input type="number" name="age" required={true} value={form.age} onChange={inputHandler} /></Label>
                    <Label>Job<Input type="text" name="job" value={form.job} onChange={inputHandler} /></Label>
                    <Label>Phone<Input type="text" name="phone" value={form.phone} onChange={inputHandler} /></Label>
                    <Label>Education<Input type="text" name="education" value={form.education} onChange={inputHandler} /></Label>
                </InputContainer>
                <button type="submit">Create</button>
            </Wrapper></Modal>}
        {userProfile.length > 0 && userProfile.map(item => <div key={item._id}>
            <p>Name : {item.name}</p>
            <p>Surname : {item.surname}</p>
            <p>Age : {item.age}</p>
            {item.phone && <p>{item.phone}</p>}
            {item.job && <p>{item.job}</p>}
            {item.education && <p>{item.education}</p>}
        </div>)}
    </Container>
}