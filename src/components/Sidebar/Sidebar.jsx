import { getAllUserMassages, getPage, getUserId, getUserInbox, getUserInfo, getUserMessagesCount } from "Redux/networkSlice"
import { Aside, PhotoDiv, LinkWrapper, SideLink } from "./Sidebar.styled"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllInboxMessage, getAllMessages } from "Redux/messageOperaions";
export const Sidebar = () => {
    const allUserMessages = useSelector(getAllUserMassages);
    const unreadMessages = allUserMessages.filter(item => !item.read.marked);
    const userInfo = useSelector(getUserInfo);
    const userInbox = useSelector(getUserInbox);
    const unReadMessage = userInbox.filter(item => item.read.marked === false);
    const page = useSelector(getPage);
    return < Aside >
        {
            userInfo.map(item => <div key={item._id}><PhotoDiv>
                <img src={item.avatarURL} alt={userInfo.nickName} />
            </PhotoDiv> <h3>{item.nickName}</h3></div>)
        }
        < LinkWrapper >
            <SideLink to="/home/friends">Friends</SideLink>
            <SideLink to="/home/messages">messages {unreadMessages.length > 0 && unreadMessages.length}</SideLink>
        </LinkWrapper >
    </Aside >
}