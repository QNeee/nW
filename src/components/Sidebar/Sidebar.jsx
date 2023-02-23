import { getAllUserMassages, getUserId, getUserInbox, getUserInfo, getUserMessagesCount } from "Redux/networkSlice"
import { Aside, PhotoDiv, LinkWrapper, SideLink } from "./Sidebar.styled"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllInboxMessage } from "Redux/messageOperaions";
export const Sidebar = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(getUserInfo);
    const count = useSelector(getUserMessagesCount);
    const allMessages = useSelector(getAllUserMassages);
    const inboxMessages = allMessages.filter(item => item.view.inbox === true).filter(item => item.read.marked === false);
    // useEffect(() => {
    //     if (userId)
    //         dispatch(getAllInboxMessage());
    // }, [dispatch, userId])
    return <Aside>

        {userInfo.map(item => <div key={item._id}><PhotoDiv>
            <img src={item.avatarURL} alt={userInfo.nickName} />
        </PhotoDiv> <h3>{item.nickName}</h3></div>)}
        <LinkWrapper>
            <SideLink to="/home/friends">Friends</SideLink>
            <SideLink to="/home/messages">messages {inboxMessages.length > 0 && inboxMessages.length}</SideLink>
        </LinkWrapper>
    </Aside>
}