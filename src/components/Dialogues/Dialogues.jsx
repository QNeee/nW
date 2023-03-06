import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserDialogues } from "Redux/messageOperaions";
import { getAllUserMassages, getAllUsersData, getFilter, getUserFriends, getUserId, setFilterValue } from "Redux/networkSlice";
import { H2Container, ItemDiv, NickLink, DialoguesContainer, DialogueContainer, Div, ItemContainer } from "./Dialogues.styled";
import noAvatar from '../../images/NoAvatar.webp';
import { getAllUsers } from "Redux/userOperaions";
export const Dialogues = () => {
    let count = 1;
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    useEffect(() => {
        if (userId) {
            dispatch(getAllUserDialogues())
            dispatch(getAllUsers());
        }
    }, [dispatch, userId])
    const filter = useSelector(getFilter);
    const users = useSelector(getAllUsersData)
    const friends = useSelector(getUserFriends);
    const friendsName = friends?.filter(item => item.verify === true);
    const messages = useSelector(getAllUserMassages)
    const filteredFriendsName = friendsName.filter(item => item.nickName.toLowerCase().includes(filter.toLowerCase()))

    const func = (nickname) => {
        const unreadMessages = messages.filter(item => item.sender === nickname).filter(item1 => item1.read.marked === false);
        if (unreadMessages.length > 0) return '       (' + unreadMessages.length + 'new)';
    }

    return <div>Find Dialog<div>
        <input value={filter} onChange={(e) => dispatch(setFilterValue(e.target.value))} />
    </div><H2Container><h2>Dialogues</h2></H2Container><DialoguesContainer >
            {filteredFriendsName?.length > 0 ? filteredFriendsName.map(item => <DialogueContainer prop={count++} key={item._id}><ItemContainer><NickLink to={item.nickName}><img src={users.filter(item1 => item1.nickName === item.nickName).map(item2 => item2.avatarURL ? item2.avatarURL : noAvatar).join('')} alt={'dada'} width="300" height='300' /><ItemDiv>{item.nickName}</ItemDiv></NickLink></ItemContainer><Div>{func(item.nickName)}</Div></DialogueContainer>) : <div>No dialogues there , add friends to make a dialogue</div>}</DialoguesContainer>
    </div>
}