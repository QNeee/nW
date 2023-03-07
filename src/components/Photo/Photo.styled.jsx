import styled from "@emotion/styled";
export const MainContainer = styled.div`
margin-left:auto;
margin-right: auto;
`;
export const NickItem = styled.p`
  text-decoration: none;
  display: inline-block;
    color: red;
  padding: 20px 30px;
margin-bottom: 45px;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-image: linear-gradient(to right, grey 0%, white 51%, #9EEFE1 100%);
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
 
`;
export const ItemContent = styled.p`
margin-right:auto;
display: flex;
align-items: center;
padding:21px;
background-color: grey;
color:white;
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
background-color: blue;
`;
export const DateItem = styled.p`
padding-left:45px;
padding-right: 45px;
background-color: grey;
color:white;
`;
export const TextComment = styled.textarea`
width: 300px;
`;
export const CommentForm = styled.form`
width: 100%;
display: flex;
justify-content: space-between;
padding: 45px;
`;
export const DateContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
background-color: yellow;
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