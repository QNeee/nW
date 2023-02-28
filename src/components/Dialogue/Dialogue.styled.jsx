import styled from '@emotion/styled';


export const DialogueContainer = styled.div`
overflow-y: scroll;
margin-top:100px;
outline:1px solid tomato;
background-color: yellow;
height: 300px;
`;


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