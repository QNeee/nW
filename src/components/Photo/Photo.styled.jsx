import styled from "@emotion/styled";
export const MainContainer = styled.div`
margin-left:auto;
margin-right: auto;
`;
export const PhotoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding:45px;
`;
export const CommentsCount = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
export const CommentContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width:100%;
outline: 1px solid tomato;
margin-top:15px;
`;
export const DateContainer = styled.div`
width: 300px;
display: flex;
justify-content: space-between;
`;
export const LikeContainer = styled.div`
margin-top:30px;
width:50%;
display: flex;
justify-content: space-between;
`;
export const LikeImg = styled.img`
width:150%;
background-color:${props => props.prop ? "blue" : 'inherit'};
cursor: pointer;
`;
export const LeaveCommentContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;