import styled from "@emotion/styled";
export const InboxContainer = styled.div`
height: 30px;
margin-top:50px;
display: flex;
padding-left:40px;
padding-right: 40px;
justify-content: space-between;
border-bottom: 1px solid blue;
/* background-color: ${props => props.prop !== true && "grey"}; */
`;
export const Container = styled.div`
margin-top:80px;
display: flex;
justify-content: center;
align-items: center;
`;
export const MessageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
export const Span = styled.span`
color:white;
background: green;
`;