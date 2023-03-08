import { Sidebar } from "components/Sidebar/Sidebar"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "Redux/friendsOperations";
import { getAllMessages } from "Redux/messageOperaions";
import { getUserEmail, getUserId } from "Redux/networkSlice";
import { useLocation } from "react-router-dom";
import { getUserById } from "Redux/userOperaions";
import { io } from 'socket.io-client'
import { host } from "host";
export const Home = () => {

    const { pathname } = useLocation();
    const userId = useSelector(getUserId);
    const findUser = pathname.split('/');
    const findUserId = findUser[3];
    const dispatch = useDispatch();
    const data = pathname.split('/')[3];
    const dialogName = pathname.split('/')[4];
    const email = useSelector(getUserEmail);
    const socket = io(host);
    useEffect(() => {
        let count = 0;
        socket.emit('userStatus', { email, status: 'online' });
        const intervalId = setInterval(() => {
            count++
            if (count === 10) {
                socket.emit('userStatus', { email, status: 'offline' })
                clearInterval(intervalId);
                return;
            }
        }, 5000);


    })
    useEffect(() => {
        if (userId !== null) {
            if (pathname !== '/home/messages' && pathname !== '/home/messages/inbox' && pathname !== `/home/messages/dialogues/${dialogName}`) {
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
    }, [dispatch, userId, pathname, findUserId, data, dialogName])
    window.onunload = () => {
        socket.emit('userStatus', { email, status: 'offline' })
    }
    return <div>
        <Sidebar />
    </div>
}