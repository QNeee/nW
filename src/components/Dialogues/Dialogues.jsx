import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUserMassages } from "Redux/networkSlice";
export const Dialogues = () => {
    // const dispatch = useDispatch();
    const messages = useSelector(getAllUserMassages);
    const userInbox = messages.filter(item => item.view.inbox);
    const userOutbox = messages.filter(item => item.view.outbox);
    const inboxNicknames = userInbox.length > 0 && userOutbox.length === 0 ? userInbox.map(item => item.sender) : userOutbox.map(item => item.receiver);
    const nicknamesInbox = userInbox.map(item => item.sender);
    const nickNames = [...inboxNicknames, ...nicknamesInbox];
    const uniqueNicknames = [...new Set(nickNames)]
    return <div>dialogues
        {uniqueNicknames.map(item => <div key={item}><Link to={item}>{item}</Link></div>)}
    </div>
}