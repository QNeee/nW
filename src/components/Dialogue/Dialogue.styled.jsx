import styled from '@emotion/styled';


export const DialogueContainer = styled.div`
overflow-y: scroll;
outline:1px solid tomato;
background-color: yellow;
height: 300px;
`;
export const TimeMessage = styled.div`
display: flex;
margin-top:15px;
`;
export const TimeContainer = styled.div`
margin-right:15px;
`;
export const DateContainer = styled.div``;
export const Container = styled.div`
/* margin-left:${props => !props.prop ? '-300px' : '300px'}; */
display: flex;
justify-content: ${props => props.prop ? 'left' : 'right'};
align-items: center;
`;
export const ContainerInContainer = styled.div`
height: 50px;
background-color: blue;
color:white;
width:300px;
display: flex;
padding:15px;
flex-direction: column;
justify-content: center;
align-items: center;
`;
export const FormContainer = styled.div`
display:flex;
justify-content: right;
`;
export const Form = styled.form`
display:flex;
justify-content: right;
`;
export const Input = styled.input`
width: 600px;
`;
export const NicknamesDiv = styled.div`
display: flex;
justify-content: space-between;
padding-left:20px;
padding-right: 20px;
margin-bottom:10px;
text-transform: uppercase;
color:red;
`;
export const DialogueButtonDelete = styled.button`

 text-decoration: none;
  display: inline-block;
    color: white;
  padding: 5px 5px;
  border-radius: 10px;
  margin-left:100px;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-image: linear-gradient(to right, grey 0%, black 51%, red 100%);
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
  /* background-color:${props => props.prop === false ? "red" : 'black'}; */
  cursor: pointer;
  &:hover{
    background-position: right center;
  }
`;
export const ButtonWrapper = styled.div`
display: flex;
justify-content: space-between;
`;