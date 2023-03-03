import { Sidebar } from "components/Sidebar/Sidebar"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "Redux/friendsOperations";
import { getAllMessages } from "Redux/messageOperaions";
import { getUserId } from "Redux/networkSlice";
import { useLocation } from "react-router-dom";
import { getUserById } from "Redux/userOperaions";
export const Home = () => {
    const { pathname } = useLocation();
    const userId = useSelector(getUserId);
    const findUser = pathname.split('/');
    const findUserId = findUser[3];
    const dispatch = useDispatch();
    const data = pathname.split('/')[3];
    useEffect(() => {
        if (userId !== null) {
            if (pathname !== '/home/messages' && pathname !== '/home/messages/inbox') {
                dispatch(getAllMessages());
            }
            if (pathname !== '/home/friends' && pathname !== '/home/friends/your-friends' && pathname !== '/home/friends/on-pending'
                && pathname !== `/home/profile/${data}/friends`) {
                dispatch(getAllFriends());
            }
            if (pathname !== `/home/profile${findUserId}` && pathname !== '/home/messages/inbox') {
                dispatch(getUserById(userId));
            }
        }
    }, [dispatch, userId, pathname, findUserId, data])
    return <div>
        <Sidebar />
    </div>
}