import { getUserNickName } from "Redux/networkSlice"
import { Aside, PhotoDiv, LinkWrapper, SideLink } from "./Sidebar.styled"
import { useSelector } from "react-redux";
export const Sidebar = () => {
    const userNickname = useSelector(getUserNickName);
    return <Aside>
        <PhotoDiv>
        </PhotoDiv>
        <h3>{userNickname}</h3>
        <LinkWrapper>
            <SideLink to="/home/friends">Friends</SideLink>
            <SideLink to="/home/messages">messages</SideLink>
            <SideLink to="/home/photos">photos</SideLink>
        </LinkWrapper>
    </Aside>
}