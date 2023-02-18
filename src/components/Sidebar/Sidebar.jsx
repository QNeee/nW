import { Aside, PhotoDiv, LinkWrapper, SideLink } from "./Sidebar.styled"
import { Link } from "react-router-dom";
export const Sidebar = () => {
    return <Aside>
        <PhotoDiv>
        </PhotoDiv>
        <h3>Nickname</h3>
        <LinkWrapper>
            <SideLink to="/home/friends">Friends</SideLink>
            <SideLink to="/home/messages">messages</SideLink>
            <SideLink to="/home/photos">photos</SideLink>
        </LinkWrapper>
    </Aside>
}