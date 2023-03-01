import { useSelector } from "react-redux";
import { getAllUserMassages } from "Redux/networkSlice";
import { H2Container, NickLink, DialoguesContainer, DialogueContainer, ItemContainer } from "./Dialogues.styled";
export const Dialogues = () => {
    const messages = useSelector(getAllUserMassages);
    const userInbox = messages.filter(item => item.view.inbox);
    const userOutbox = messages.filter(item => item.view.outbox);
    const inboxNicknames = userInbox.length > 0 && userOutbox.length === 0 ? userInbox.map(item => item.sender) : userOutbox.map(item => item.receiver);
    const nicknamesInbox = userInbox.map(item => item.sender);
    const nickNames = [...inboxNicknames, ...nicknamesInbox];
    const uniqueNicknames = [...new Set(nickNames)]
    console.log(uniqueNicknames);
    return <div><H2Container><h2>Dialogues</h2></H2Container><DialoguesContainer>
        {uniqueNicknames.map(item => <DialogueContainer key={item}><ItemContainer><NickLink to={item}>{item}</NickLink></ItemContainer></DialogueContainer>)}</DialoguesContainer>
    </div>
}