import styled from "@emotion/styled";
export const InboxContainer = styled.div`
padding:40px;
margin-top:50px;
display: flex;
justify-content: space-between;
outline:1px solid black;
background-color: ${props => props.prop !== true && "red"};
`;