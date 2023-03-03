import { useSelector, useDispatch } from "react-redux";
import { getFilter, getUserFriends, setFilterValue } from "Redux/networkSlice";
import { Link } from "react-router-dom";
import { FriendsContainer, FindDiv, FriendsDiv } from "./UserFriends.styled";
import { Button } from "components/App.styled";
import { removeFriend } from "Redux/friendsOperations";
export const UserFriends = () => {
    const dispatch = useDispatch();
    const userFriends = useSelector(getUserFriends);
    const filter = useSelector(getFilter);
    const filteredFriends = userFriends.filter(item => item.verify === true).filter(item => item.nickName.toLowerCase().includes(filter.toLowerCase()))
    const onClickDelete = (e) => {
        dispatch(removeFriend(e));
    }
    return <><FindDiv>Find Friend
        <input value={filter} onChange={(e) => dispatch(setFilterValue(e.target.value))} />
    </FindDiv>{<FriendsContainer>{filteredFriends.length > 0 ? filteredFriends.map(item => <FriendsDiv key={item._id}><p><Link to={`/home/profile/${item.find}`}>{item.nickName}</Link></p><p><img src={item.avatarURL} alt={item.nickName} /></p>
        <Button onClick={() => onClickDelete(item.find)} type="button">Delete</Button></FriendsDiv>) : <div>No friends</div>}
    </FriendsContainer>}</>
}