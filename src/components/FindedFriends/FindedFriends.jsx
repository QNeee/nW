import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "Redux/friendsOperations";
import { getFindFriend, getUserFriends } from "Redux/networkSlice";
export const FindedFriends = () => {
    const dispatch = useDispatch();
    const findedFriend = useSelector(getFindFriend);
    const userFriends = useSelector(getUserFriends);
    const userNickname = userFriends.map(item => item.nickName).join('');
    const findedFriendNickName = findedFriend.map(item => item.nickName).join('');
    const onClick = (e) => {
        const friend = {
            nickName: e
        }
        dispatch(addFriend(friend));
    }
    return <div>
        {findedFriend.length > 0 && !userNickname.includes(findedFriendNickName) ? findedFriend.map(item => <div key={item._id}>{item.nickName}
            <button onClick={() => onClick(item.nickName)} type="button">add</button></div>) : <div>No friends</div>}
    </div>
}