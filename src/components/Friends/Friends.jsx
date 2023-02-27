import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "Redux/friendsOperations";
import { Container } from "./Friends.styled";
import { getFilter, getUserId, setFilterValue } from "Redux/networkSlice";
export const Friends = () => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);
    const userId = useSelector(getUserId);
    useEffect(() => {
        if (userId)
            dispatch(getAllFriends());
    }, [dispatch, userId])
    return <Container>
        <div>
            <input value={filter} onChange={(e) => dispatch(setFilterValue(e.target.value))} />
        </div>
        <Outlet />
    </Container>
}