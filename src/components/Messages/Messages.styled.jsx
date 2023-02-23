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
border-color: red;
border : 2px solid black;
border-radius: 4px;
text-decoration: none;
padding:3px;
color:black;
 &.active, :hover ,:focus{
  background-color:blue;
    color:white;
  }
`;
export const MainContainer = styled.div`
position: relative;
width:1200px`;