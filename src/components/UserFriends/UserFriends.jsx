import { useSelector } from "react-redux";
import { getFilter, getUserFriends } from "Redux/networkSlice";
import { Link } from "react-router-dom";
export const UserFriends = () => {
    const userFriends = useSelector(getUserFriends);
    const filter = useSelector(getFilter);
    const filteredFriends = userFriends.filter(item => item.nickName.toLowerCase().includes(filter.toLowerCase()))
    return <div>{filteredFriends.length > 0 ? filteredFriends.map(item => <div key={item._id}><div><p><Link to={`/home/profile/${item.owner}`}>{item.nickName}</Link></p><p><img src={item.avatarURL} alt={item.nickName} /></p></div></div>) : <div>No friends</div>}</div>
}