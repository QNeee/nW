import { useSelector, useDispatch } from "react-redux";
import { getFilter, getUserFriends, setAnswerData } from "Redux/networkSlice";
import { Link } from "react-router-dom";
import { FriendsContainer } from "./UserFriends.styled";
import { useNavigate } from "react-router-dom";
export const UserFriends = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userFriends = useSelector(getUserFriends);
    const filter = useSelector(getFilter);
    const filteredFriends = userFriends.filter(item => item.nickName.toLowerCase().includes(filter.toLowerCase()))
    console.log(filteredFriends);
    const onClick = (e) => {
        dispatch(setAnswerData(e))
        navigate('/home/messages');
    }
    return <div>{filteredFriends.length > 0 ? filteredFriends.map(item => <FriendsContainer key={item._id}><p><Link to={`/home/profile/${item.find}`}>{item.nickName}</Link></p><p><img src={item.avatarURL} alt={item.nickName} /></p> <button onClick={() => onClick(item.nickName)} type="button">Write Message</button>
        <button type="button">Delete Friend</button></FriendsContainer>) : <div>No friends</div>}
    </div>
}