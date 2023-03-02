import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserDialogues } from "Redux/messageOperaions";
import { getUserFriends, getUserId } from "Redux/networkSlice";
import { H2Container, NickLink, DialoguesContainer, DialogueContainer, ItemContainer } from "./Dialogues.styled";
export const Dialogues = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    useEffect(() => {
        if (userId) {
            dispatch(getAllUserDialogues())
        }
    }, [dispatch, userId])
    const friends = useSelector(getUserFriends);
    const friendsName = friends.map(item => item.nickName);
    return <div><H2Container><h2>Dialogues</h2></H2Container><DialoguesContainer>
        {friendsName.length > 0 ? friendsName.map(item => <DialogueContainer key={item}><ItemContainer><NickLink to={item}>{item}</NickLink></ItemContainer></DialogueContainer>) : <div>No dialogues there , add friends to make a dialogue</div>}</DialoguesContainer>
    </div>
}