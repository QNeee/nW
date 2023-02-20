import { useDispatch, useSelector } from "react-redux";
import { getUserFriends } from "Redux/networkSlice";

export const UserFriends = () => {
    const userFriends = useSelector(getUserFriends);
    return <div>{userFriends.length > 0 ? userFriends.map(item => <div key={item._id}>{item.nickName}<img src={item.avatarURL} alt="userPhoto" /></div>) : <div>No friends</div>}</div>
}