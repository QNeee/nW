import { Sidebar } from "components/Sidebar/Sidebar"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "Redux/friendsOperations";
import { getAllMessages } from "Redux/messageOperaions";
import { getUserId } from "Redux/networkSlice";
import { useLocation } from "react-router-dom";
export const Home = () => {
    const { pathname } = useLocation();
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    useEffect(() => {
        if (userId) {
            if (pathname !== '/home/messages' && pathname !== '/home/messages/inbox') {
                dispatch(getAllMessages());
            }
            if (pathname !== '/home/friends') {
                dispatch(getAllFriends());
            }
        }
    }, [dispatch, userId, pathname])
    return <div>
        <Sidebar />
    </div>
}