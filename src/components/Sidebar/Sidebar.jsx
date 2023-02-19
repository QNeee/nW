import { getUserInbox, getUserNickName, getUserUnreadMessages } from "Redux/networkSlice"
import { Aside, PhotoDiv, LinkWrapper, SideLink } from "./Sidebar.styled"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllInboxMessage, getUnreadMessages } from "Redux/messageOperaions";
export const Sidebar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllInboxMessage());
    }, [dispatch])
    const userNickname = useSelector(getUserNickName);
    const inboxMessages = useSelector(getUserInbox);
    const unreadMessages = inboxMessages.filter(item => item.read.marked === false);
    return <Aside>
        <PhotoDiv>
        </PhotoDiv>
        <h3>{userNickname}</h3>
        <LinkWrapper>
            <SideLink to="/home/friends">Friends</SideLink>
            <SideLink to="/home/messages">messages {unreadMessages.length > 0 && unreadMessages.length}</SideLink>
            <SideLink to="/home/photos">photos</SideLink>
        </LinkWrapper>
    </Aside>
}