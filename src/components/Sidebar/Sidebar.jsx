import { getUserId, getUserInbox, getUserInfo, getUserNickName, getUserUnreadMessages } from "Redux/networkSlice"
import { Aside, PhotoDiv, LinkWrapper, SideLink } from "./Sidebar.styled"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllInboxMessage, getUnreadMessages } from "Redux/messageOperaions";
import { getUserById } from "Redux/userOperaions";
export const Sidebar = () => {
    const dispatch = useDispatch();
    const inboxMessages = useSelector(getUserInbox);
    const userId = useSelector(getUserId);
    const userInfo = useSelector(getUserInfo);
    const unreadMessages = inboxMessages.filter(item => item.read.marked === false);
    useEffect(() => {
        if (userId)
            dispatch(getUserById(userId));
        dispatch(getAllInboxMessage());
    }, [dispatch, userId])
    return <Aside>

        {userInfo.map(item => <div key={item._id}><PhotoDiv>
            <img src={item.avatarURL} alt={userInfo.nickName} />
        </PhotoDiv> <h3>{item.nickName}</h3></div>)}
        <LinkWrapper>
            <SideLink to="/home/friends">Friends</SideLink>
            <SideLink to="/home/messages">messages {unreadMessages.length > 0 && unreadMessages.length}</SideLink>
            <SideLink to="/home/photos">photos</SideLink>
        </LinkWrapper>
    </Aside>
}