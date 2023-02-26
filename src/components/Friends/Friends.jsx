import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "Redux/friendsOperations";
import { Container } from "./Friends.styled";
import { getUserId } from "Redux/networkSlice";
export const Friends = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    useEffect(() => {
        if (userId)
            dispatch(getAllFriends());
    }, [dispatch, userId])
    return <Container>
        <Link to='/home/friends/find'>Find Friend</Link>
        <Outlet />
    </Container>
}