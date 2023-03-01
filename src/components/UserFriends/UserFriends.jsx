import { useSelector, useDispatch } from "react-redux";
import { getFilter, getUserFriends, setAnswerData } from "Redux/networkSlice";
import { Link } from "react-router-dom";
import { FriendsContainer, FriendsDiv } from "./UserFriends.styled";
import { useNavigate } from "react-router-dom";
import { Button } from "components/App.styled";
export const UserFriends = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userFriends = useSelector(getUserFriends);
    const filter = useSelector(getFilter);
    const filteredFriends = userFriends.filter(item => item.nickName.toLowerCase().includes(filter.toLowerCase()))
    console.log(userFriends);
    const onClick = (e) => {
        dispatch(setAnswerData(e))
        navigate('/home/messages');
    }
    return <FriendsContainer>{filteredFriends.length > 0 ? filteredFriends.map(item => <FriendsDiv key={item._id}><p><Link to={`/home/profile/${item.find}`}>{item.nickName}</Link></p><p><img src={item.avatarURL} alt={item.nickName} /></p><Button onClick={() => onClick(item.nickName)} type="button">Write Message</Button>
        <Button type="button">Delete Friend</Button></FriendsDiv>) : <div>No friends</div>}
    </FriendsContainer>
}