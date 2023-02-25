import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const InboxContainer = styled.div`
height: 30px;
margin-top:50px;
display: flex;
justify-content:left;
`;
export const Container = styled.div`
margin-top:80px;
display: flex;
justify-content: center;
align-items: center;
`;
export const StyledLink = styled(Link)`
color:white;
  :hover {
  background-color:white;
    color:blue;
  }
`;
export const MessageContainerFirst = styled.div`width:calc(100%/3.33);
display: flex;
justify-content: center;
align-items: center;
background-color: blue;
`;
export const MessageContainerSecond = styled.div`width:calc(100%/3.33);
display: flex;
justify-content: center;
align-items: center;
background-color: grey;
`;
export const MessageContainerThird = styled.div`width:calc(100%/3.33);
display: flex;
justify-content: center;
align-items: center;
background-color: purple;
color:white;
`;
export const Span = styled.span`
color:white;
background: green;
`;