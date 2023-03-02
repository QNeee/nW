import { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "Redux/friendsOperations";
import { Container, NavContainer, Nav } from "./Friends.styled";
import { getUserId } from "Redux/networkSlice";
export const Friends = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    useEffect(() => {
        if (userId)
            dispatch(getAllFriends());
    }, [dispatch, userId])
    return <Container>
        <NavContainer>
            <Nav>
                <NavLink to={'/home/friends/your-friends'}>Your Friends</NavLink>
                <NavLink to={'/home/friends/on-pending'}>On Pending</NavLink>
            </Nav>
        </NavContainer>
        <Outlet />
    </Container>
}