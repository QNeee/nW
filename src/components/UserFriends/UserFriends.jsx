import { useSelector } from "react-redux";
import { getFilter, getUserFriends } from "Redux/networkSlice";
import { Link } from "react-router-dom";
import { FriendsContainer } from "./UserFriends.styled";
export const UserFriends = () => {
    const userFriends = useSelector(getUserFriends);
    const filter = useSelector(getFilter);
    const filteredFriends = userFriends.filter(item => item.nickName.toLowerCase().includes(filter.toLowerCase()))
    return <div>{filteredFriends.length > 0 ? filteredFriends.map(item => <FriendsContainer key={item._id}><p><Link to={`/home/profile/${item.find}`}>{item.nickName}</Link></p><p><img src={item.avatarURL} alt={item.nickName} /></p></FriendsContainer>) : <div>No friends</div>}</div>
}