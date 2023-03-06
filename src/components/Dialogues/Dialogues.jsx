import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserDialogues } from "Redux/messageOperaions";
import { getAllUsersData, getUserFriends, getUserId } from "Redux/networkSlice";
import { H2Container, ItemDiv, NickLink, DialoguesContainer, DialogueContainer, ItemContainer } from "./Dialogues.styled";
import noAvatar from '../../images/NoAvatar.webp';
import { getAllUsers } from "Redux/userOperaions";
export const Dialogues = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    useEffect(() => {
        if (userId) {
            dispatch(getAllUserDialogues())
            dispatch(getAllUsers());
        }
    }, [dispatch, userId])
    const users = useSelector(getAllUsersData)
    const friends = useSelector(getUserFriends);
    const friendsName = friends?.filter(item => item.verify === true);

    return <div><H2Container><h2>Dialogues</h2></H2Container><DialoguesContainer>
        {friendsName?.length > 0 ? friendsName.map(item => <DialogueContainer key={item._id}><ItemContainer><NickLink to={item.nickName}><img src={users.filter(item1 => item1.nickName === item.nickName).map(item2 => item2.avatarURL ? item2.avatarURL : noAvatar).join('')} alt={'dada'} width="300" height='300' /><ItemDiv>{item.nickName}</ItemDiv></NickLink></ItemContainer></DialogueContainer>) : <div>No dialogues there , add friends to make a dialogue</div>}</DialoguesContainer>
    </div>
}