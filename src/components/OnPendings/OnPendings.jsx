import { useSelector, useDispatch } from "react-redux";
import { getFilter, getLoading, getUserFriends, getUserId, setFilterValue } from "Redux/networkSlice";
import { Link } from "react-router-dom";
import { FriendsContainer, FindDiv, FriendsDiv } from "../UserFriends/UserFriends.styled";
import { Button } from "components/App.styled";
import { removeFriend, verifyFriend } from "Redux/friendsOperations";
export const OnPendings = () => {
    const dispatch = useDispatch();
    const userFriends = useSelector(getUserFriends);
    const filter = useSelector(getFilter);
    const userId = useSelector(getUserId);
    const loading = useSelector(getLoading);
    const filteredFriends = userFriends.filter(item => item.verificationToken).filter(item => item.owner === userId).filter(item => item.nickName.toLowerCase().includes(filter.toLowerCase()))
    const onClickAccept = (e) => {
        dispatch(verifyFriend(e))
    }
    const onClickDecline = async (e) => {
        dispatch(removeFriend(e))
    }
    return <>{filteredFriends.length > 0 && <FindDiv>Find Friend
        <input value={filter} onChange={(e) => dispatch(setFilterValue(e.target.value))} />
    </FindDiv>}{<FriendsContainer>{!loading && filteredFriends.length > 0 ? filteredFriends.map(item => <FriendsDiv key={item._id}><p><Link to={`/home/profile/${item.find}`}>{item.nickName}</Link></p><p><img src={item.avatarURL} alt={item.nickName} /></p>
        {!loading && <Button onClick={() => onClickAccept(item.verificationToken)} type="button">Accept</Button>}
        <Button onClick={() => onClickDecline(item.find)} type="button">Decline</Button></FriendsDiv>) : <div>No friends</div>}
    </FriendsContainer>}</>
}