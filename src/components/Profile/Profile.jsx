import { getUserId, getUserInfo } from "Redux/networkSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserById } from "Redux/userOperaions";
export const Profile = () => {
    const dispatch = useDispatch();
    const id = useSelector(getUserId);
    useEffect(() => {
        if (id)
            dispatch(getUserById(id))
    }, [dispatch, id])
    const userInfo = useSelector(getUserInfo);
    return <div>Profile
        {userInfo.map(item => <div key={item._id}>
            <ul>
                <li>Nickname : {item.nickName}</li>
                <li>Email : {item.email}</li>
                <li>Friends : {item.friends}</li>
            </ul>
            <ul>
                Messages Count
                <li>Inbox: {item.messageCount.inbox}</li>
                <li>Outbox: {item.messageCount.outbox}</li>
            </ul>
        </div>)}
    </div>
}