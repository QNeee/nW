import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`display:flex;
margin-top:auto;
margin-left:auto;
margin-right: auto;
`;
export const MainContainer = styled.div`
background-color: grey;
display: flex;
flex-direction: column;
width:100%;
margin-left:auto;
margin-right: auto;
`;

export const DivInContainer = styled.div`
padding:15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const TextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const NicknameLick = styled(Link)`
max-width: 200px;
overflow: hidden;
color:white;
&:hover{
    color:red;
    background-color: blue;
}
`;
export const Li = styled.li`

`;
export const H1Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
export const Peoplelist = styled.ul`
 align-items: center;
  display: flex;
  height: 490px;

`;
export const ButtonContainer = styled.div`
margin-top:15px;
display: flex;
justify-content: center;
align-items: center;
`;
export const SearchDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
export const H1 = styled.h1`
color:white;
`;
export const P = styled.p`
  text-decoration: none;
  display: inline-block;
    color: red;
  padding: 20px 30px;
  margin: 10px 20px;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-image: linear-gradient(to right, #9EEFE1 0%, yellow 51%, #9EEFE1 100%);
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
`;
export const PeopleButton = styled.button`
text-decoration: none;
  display: inline-block;
    color: Maroon;
  padding: 20px 30px;
  margin: 10px 20px;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
    background-image:${props => !props.prop ? 'linear-gradient(to right, #9EEFE1 0%, #4830F0 51%, #9EEFE1 100%)' : 'linear-gradient(to right, #9EEFE1 0%, black 51%, red 100%)'};
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
  cursor: pointer;
  &:hover{
    color:white;
    background-position: right center;
  }
`;

