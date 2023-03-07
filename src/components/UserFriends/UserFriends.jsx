import { useSelector, useDispatch } from "react-redux";
import { getFilter, getModal, getUserFriends, getUserId, setFilterValue, setModal } from "Redux/networkSlice";
import { useNavigate } from "react-router-dom";
import { FriendsContainer, NickItem, NickContainer, FriendsMainContainer, FindDiv, FriendsDiv } from "./UserFriends.styled";
import { Button } from "components/App.styled";
import { ModalWindow } from "components/Modal/Modal";
import noAvatar from '../../images/NoAvatar.webp';
export const UserFriends = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userFriends = useSelector(getUserFriends);
    const filter = useSelector(getFilter);
    const userId = useSelector(getUserId);
    const modal = useSelector(getModal);
    const filteredFriends = userFriends.filter(item => item.verify === true).filter(item => item.nickName.toLowerCase().includes(filter.toLowerCase()))
    const onClickDelete = (e) => {
        dispatch(setModal({ id: e, open: true }));
    }
    const onClickMessages = (e) => {
        navigate(`/home/messages/dialogues/${e}`)
    }
    return <><FriendsMainContainer><FindDiv>Find Friend
        <input value={filter} onChange={(e) => dispatch(setFilterValue(e.target.value))} />
    </FindDiv>{!modal.open && <FriendsContainer>{filteredFriends.length > 0 ? filteredFriends.map(item => <FriendsDiv key={item._id}><NickContainer><NickItem to={`/home/profile/${item.find}`}>{item.nickName}</NickItem></NickContainer><img src={item.avatarURL ? item.avatarURL : noAvatar} alt={item.nickName} width='250' height='250' />
        {item.find !== userId && <Button onClick={() => onClickDelete(item.find)} type="button">Delete</Button>}
        {item.find !== userId && <Button onClick={() => onClickMessages(item.nickName)} type="button">Messages</Button>}

    </FriendsDiv>) : <div>No friends</div>}
    </FriendsContainer>}</FriendsMainContainer>
        {modal.open && <ModalWindow />}
    </>
}