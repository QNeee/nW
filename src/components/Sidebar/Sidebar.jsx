import { getAllUserMassages, getUserInfo } from "Redux/networkSlice"
import { Aside, PhotoDiv, LinkWrapper, H3, SideLink, Img } from "./Sidebar.styled"
import { useSelector } from "react-redux";
export const Sidebar = () => {
    const allUserMessages = useSelector(getAllUserMassages);
    const unreadMessages = allUserMessages.filter(item => item.view.inbox).filter(item => !item.read.marked);
    const userInfo = useSelector(getUserInfo);
    return < Aside >
        {
            userInfo.map(item => <div key={item._id}><PhotoDiv>
                <Img src={item.avatarURL} alt={userInfo.nickName} />
            </PhotoDiv> <H3>{item.nickName}</H3></div>)
        }
        <LinkWrapper>
            <SideLink to="/home/friends">Friends</SideLink>
            <SideLink to="/home/messages">Messages {unreadMessages.length > 0 && unreadMessages.length}</SideLink>
            <SideLink to="/home/photos">Photos</SideLink>
        </LinkWrapper >
    </Aside >
}