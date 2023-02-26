
import { Outlet } from 'react-router-dom';
import { Header, Nav, NavItem, Main, Button, Container } from "./Layout.styled"
import { useDispatch } from "react-redux";
import { logOut } from 'Redux/authOperations';
import { Home } from 'components/Home/Home';

export const Layout = () => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (id !== null)
    //         dispatch(getUserById(id))
    // }, [dispatch, id])
    const onClick = () => {
        dispatch(logOut());
    }
    return <Container><Header>
        <h1>Network</h1>
        <Nav>
            <NavItem to={"/home"}>Main</NavItem>
            <NavItem to={"/home/profile"}>Profile</NavItem>
            <Button type='button' onClick={onClick}>Exit</Button>
        </Nav>
    </Header>
        <Main><Home /><Outlet /></Main></Container>
}