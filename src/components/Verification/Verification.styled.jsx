import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export const MainDiv = styled.div`
margin-top:200px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
export const LinkItem = styled(Link)`
width:300px;
height: 50px;
margin-top:15px;
display: flex;
justify-content: center;
align-items: center;
background-color:grey;
text-decoration: none;
color:black;
cursor:pointer;
&:hover{
    color:white;
    background-color: green;
}
`;