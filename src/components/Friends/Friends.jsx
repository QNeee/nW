import { Searchbar } from "components/Searchbar/Searchbar"
import { useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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