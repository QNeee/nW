import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import { getAllFriends } from "Redux/friendsOperations";
import { getProfile, getUserId } from "Redux/networkSlice";
import { getProfileById } from "Redux/profileOperations";
import { LinkItem } from "./Profiles.styled";
export const Profiles = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const splitId = pathname.split('/')
    const userId = useSelector(getUserId)
    const id = splitId[3];
    const userProfile = useSelector(getProfile);
    const data = pathname.split('/')[3];
    useEffect(() => {
        if (userId !== null) {
            if (pathname === `/home/profile/${id}`) {
                dispatch(getProfileById(id));
            }
            if (pathname === `/home/profile/${data}/friends`) {
                dispatch(getAllFriends(data));
            }
        }
    }, [dispatch, id, pathname, userId, data])

    return <>{pathname === `/home/profile/${id}` && <div>
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
            <LinkItem to={pathname + "/photos"}>Photos</LinkItem>
            <LinkItem to={pathname + "/friends"}>Friends</LinkItem>
        </div>)}
    </div>}<Outlet /></>

}