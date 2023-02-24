import { getAllUserMassages, getUserInfo } from "Redux/networkSlice"
import { Aside, PhotoDiv, LinkWrapper, SideLink } from "./Sidebar.styled"
import { useSelector } from "react-redux";
export const Sidebar = () => {
    const allUserMessages = useSelector(getAllUserMassages);
    const unreadMessages = allUserMessages.filter(item => item.view.inbox).filter(item => !item.read.marked);
    const userInfo = useSelector(getUserInfo);
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