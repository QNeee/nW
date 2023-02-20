import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllFriends } from "Redux/friendsOperations";
import { Container } from "./Friends.styled";
export const Friends = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllFriends());
    }, [dispatch])
    return <Container>
        <Link to='/home/friends/find'>Find Friend</Link>
        <Outlet />
    </Container>
}