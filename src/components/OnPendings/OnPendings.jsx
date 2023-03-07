import { useSelector, useDispatch } from "react-redux";
import { getFilter, getLoading, getUserFriends, getUserId, setFilterValue } from "Redux/networkSlice";
import { FriendsContainer, FindDiv, FriendsDiv, NickItem } from "../UserFriends/UserFriends.styled";
import { Button } from "components/App.styled";
import { removeFriend, verifyFriend } from "Redux/friendsOperations";
import noAvatar from '../../images/NoAvatar.webp';
import { P } from "./OnPendings.styled";
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
    return <><FriendsContainer><FindDiv>Find Friend
        <input value={filter} onChange={(e) => dispatch(setFilterValue(e.target.value))} />
    </FindDiv>{!loading && filteredFriends.length > 0 ? filteredFriends.map(item => <FriendsDiv key={item._id}><P><NickItem to={`/home/profile/${item.find}`}>{item.nickName}</NickItem></P><p><img src={item.avatarURL ? item.avatarURL : noAvatar} alt={item.nickName} width='250' height='250' /></p>
        {!loading && <Button onClick={() => onClickAccept(item.verificationToken)} type="button">Accept</Button>}
        <Button onClick={() => onClickDecline(item.find)} type="button">Decline</Button></FriendsDiv>) : <div>No friends</div>}
    </FriendsContainer></>
}