import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProfile, getUserId } from "Redux/networkSlice";
import { getProfileById } from "Redux/profileOperations";
export const Profiles = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const splitId = pathname.split('/')
    const userId = useSelector(getUserId)
    const id = splitId[3];
    const userProfile = useSelector(getProfile);
    console.log(id);
    useEffect(() => {
        if (pathname === `/home/profile/${id}` && userId != null) {
            dispatch(getProfileById(id));
        }
    }, [dispatch, id, pathname, userId])

    return <div>
        {userProfile[0] === null && <div>
            user dont have profile
        </div>}
        {userProfile[0] !== null && userProfile.map(item => <div key={item._id}>
            <p>Name : {item.name}</p>
            <p>Surname : {item.surname}</p>
            <p>Age : {item.age}</p>
            {item.phone && <p>{item.phone}</p>}
            {item.job && <p>{item.job}</p>}
            {item.education && <p>{item.education}</p>}
        </div>)}
    </div>
    // return <Container>
    //     {pathname === '/home/profile' ? userInfo.map(item => <div key={item._id}>
    //         <ul>
    //             <li>Nickname : {item.nickName}</li>
    //             <li>Email : {item.email}</li>
    //             <li>Friends : {item.friends}</li>
    //         </ul>
    //         <MessageCount>
    //             Messages Count
    //             <li>Inbox: {item.messageCount.inbox}</li>
    //             <li>Outbox: {item.messageCount.outbox}</li>
    //         </MessageCount>
    //     </div>) : findedFriend.map(item => <div key={item._id}>
    //         <img src={item.avatarURL} alt={item.nickName} />
    //         <ul>
    //             <li>Nickname : {item.nickName}</li>
    //             <li>Email : {item.email}</li>
    //             <li>Friends : {item.friends}</li>
    //         </ul>
    //         <MessageCount>
    //             Messages Count
    //             <li>Inbox: {item.messageCount.inbox}</li>
    //             <li>Outbox: {item.messageCount.outbox}</li>
    //         </MessageCount>
    //     </div>)}
    //     <Outlet />
    // </Container>
}