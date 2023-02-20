
import { Outlet } from 'react-router-dom';
import { Header, Nav, NavItem, Main } from "./Layout.styled"
import { useDispatch, useSelector } from "react-redux";
import { logOut } from 'Redux/authOperations';
import { Home } from 'components/Home/Home';
import { useEffect } from 'react';
import { getUserById } from 'Redux/userOperaions';
import { getUserId } from 'Redux/networkSlice';
export const Layout = () => {
    const id = useSelector(getUserId);
    const dispatch = useDispatch();
    useEffect(() => {
        if (id)
            dispatch(getUserById(id))
    }, [dispatch, id])
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