import styled from '@emotion/styled';

export const AuthContainer = styled.div`
display:flex;
align-items: center;
justify-content: center;
margin-top: 200px;
`;
export const LogoContainer = styled.div`
margin-left:-100px;
`;
export const LoginFormContainer = styled.div`
padding:35px;
display:flex;
flex-direction: column;
margin-left:200px;
border-radius: 30px;
outline: 2px solid grey;
`;
export const LoginButtonWrapper = styled.div`
display: flex;
justify-content:space-around;
align-items: center;
`;
export const H1 = styled.h1`
font-size: 55px;
color:blue;
`;
export const P = styled.p`
font-size : 20px;
`;
export const LoginForm = styled.form`
    padding:15px;
   display:flex;
   flex-direction: column;
`
export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index:100;
  transform: translate(-50%, -50%);
  color: #52555f;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgba(82, 85, 95, 0.4);
`;

export const Wrapper = styled.form`
  padding: 50px 20px 60px;
  @media screen and (min-width: 768px) {
    display: block;
    padding: 50px 58px 60px;
  }
`;

export const Text = styled.p`
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.14;
  letter-spacing: 0.02em;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

export const CloseSvg = styled.button`
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  cursor: pointer;
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
export const InputContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;`;

export const Input = styled.input`
border-color: grey;
border-radius: 4px;
height: 30px;
width:100%;
`;
export const Label = styled.label`
width:100%;
margin-bottom: 30px;
`;
export const H3 = styled.h3`
text-align:center;
`;
export const Button = styled.button`
width:300px;
height: 50px;
margin-top:15px;
background-color:grey;
cursor:pointer;
&:hover{
    color:white;
    background-color: green;
}
`;