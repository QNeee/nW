import { getUserInbox, getUserNickName, getUserUnreadMessages } from "Redux/networkSlice"
import { Aside, PhotoDiv, LinkWrapper, SideLink } from "./Sidebar.styled"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllInboxMessage } from "Redux/messageOperaions";
export const Sidebar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllInboxMessage());
        dispatch(getAllInboxMessage('false'));
    }, [dispatch])
    const userNickname = useSelector(getUserNickName);
    const unreadMessage = useSelector(getUserUnreadMessages);
    //   
    return <Aside>
        <PhotoDiv>
        </PhotoDiv>
        <h3>{userNickname}</h3>
        <LinkWrapper>
            <SideLink to="/home/friends">Friends</SideLink>
            <SideLink to="/home/messages">messages {unreadMessage.length > 0 && unreadMessage.length}</SideLink>
            <SideLink to="/home/photos">photos</SideLink>
        </LinkWrapper>
    </Aside>
}