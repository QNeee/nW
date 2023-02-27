import { Sidebar } from "components/Sidebar/Sidebar"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "Redux/friendsOperations";
import { getAllMessages } from "Redux/messageOperaions";
import { getUserId } from "Redux/networkSlice";
import { useLocation } from "react-router-dom";
import { getUserById } from "Redux/userOperaions";
import { getProfileById } from "Redux/profileOperations";
export const Home = () => {
    const { pathname } = useLocation();
    const userId = useSelector(getUserId);
    const findUser = pathname.split('/');
    const findUserId = findUser[3];
    const dispatch = useDispatch();
    useEffect(() => {
        if (userId !== null) {
            if (pathname !== '/home/messages' && pathname !== '/home/messages/inbox') {
                dispatch(getAllMessages());
            }
            if (pathname !== '/home/friends') {
                dispatch(getAllFriends());
            }
            if (pathname !== '/home/profile' && pathname !== `/home/profile${findUserId}` && pathname !== '/home/messages/inbox') {
                dispatch(getUserById(userId));
            }
            if (pathname === '/home/profile') {
                dispatch(getProfileById(userId))
            }
        }
    }, [dispatch, userId, pathname, findUserId])
    return <div>
        <Sidebar />
    </div>
}