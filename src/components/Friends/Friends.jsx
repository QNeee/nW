import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllFriends } from "Redux/friendsOperations";
export const Friends = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllFriends());
    }, [dispatch])
    return <div>
        <Link to='/home/friends/find'>Find Friend</Link>
        <Outlet />
    </div>
}