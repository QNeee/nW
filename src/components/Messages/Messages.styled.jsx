import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const FormContainer = styled.form`
 position: relative;
   max-width: 400px;
   margin: 50px auto 0;
   background: white;
   border-radius: 30px;

`;
export const FormDiv = styled.div`
margin-top:150px;
outline: 1px solid black;
`;
export const LinkDiv = styled.div`
display: flex;
justify-content: space-around;
padding-top:50px;
`;
export const MessageLink = styled(Link)`
 text-decoration: none;
  display: inline-block;
    color: red;
  padding: 20px 30px;
  margin: 10px 20px;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-image: linear-gradient(to right, #9EEFE1 0%, #4830F0 51%, #9EEFE1 100%);
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
  &:hover{
    background-position: right center;
  }
`;

export const MainContainer = styled.div`
position: relative;
width:1280px`;