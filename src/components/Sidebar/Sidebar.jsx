import { getAllUserMassages, getUserInfo } from "Redux/networkSlice"
import { Aside, PhotoDiv, LinkWrapper, H3, SideLink, Img } from "./Sidebar.styled"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import noAvatar from '../../images/NoAvatar.webp';
export const Sidebar = () => {
    const navigate = useNavigate();
    const allUserMessages = useSelector(getAllUserMassages);
    const unreadMessages = allUserMessages.filter(item => item.view.inbox).filter(item => !item.read.marked);
    const userInfo = useSelector(getUserInfo);
    const onClickPhoto = (name) => {
        if (name === null) return;
        const url = name.split('/')[4];
        navigate(`/home/photos/${url}`)
    }
    return < Aside >
        {
            userInfo.map(item => <div key={item._id}><PhotoDiv>
                <Img onClick={() => onClickPhoto(item.avatarURL)} src={item.avatarURL ? item.avatarURL : noAvatar} alt={userInfo.nickName} />
            </PhotoDiv> <H3>{item.nickName}</H3></div>)
        }
        <LinkWrapper>
            <SideLink to="/home/friends">Friends</SideLink>
            <SideLink to="/home/messages">Messages {unreadMessages.length > 0 && unreadMessages.length}</SideLink>
            <SideLink to="/home/photos">Photos</SideLink>
        </LinkWrapper >
    </Aside >
}