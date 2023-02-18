
import { Outlet } from 'react-router-dom';
import { Header, Nav, NavItem, Main } from "./Layout.styled"
import { useDispatch } from "react-redux";
import { logOut } from 'Redux/authOperations';
import { Home } from 'components/Home/Home';
export const Layout = () => {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(logOut());
    }
    return <><Header>
        <h1>Network</h1>
        <Nav>
            <NavItem to={"/home"}>Main</NavItem>
            <NavItem to={"/home/profile"}>Profile</NavItem>
            <button type='button' onClick={onClick}>Exit</button>
        </Nav>
    </Header>
        <Main><Home /><Outlet /></Main></>
}