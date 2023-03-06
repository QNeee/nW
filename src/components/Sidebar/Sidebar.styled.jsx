import styled from "@emotion/styled";
import { Link } from "react-router-dom";
export const PhotoDiv = styled.div`height:100%;`;
export const Aside = styled.aside`width:200px;text-align:center;border-right:1px solid black;overflow:hidden;
background-color:white;
height: 100%;
`;
export const LinkWrapper = styled.div`display:flex;flex-direction:column;margin-top:80px;`;
export const H1 = styled.h1`display:inline-block;
  max-width:150px;
  overflow:hidden;`
export const SideLink = styled(Link)`
text-decoration: none;
margin-bottom:16px;
width:100%;
color:black;
border-radius: 4px;
outline: 1px solid tomato;
&.active,:focus,:hover{
    background-color: red;
    color:white;
}
`;

export const H3 = styled.h3`
padding-top: 30px;
 margin: 10px 20px;
  `

export const Img = styled.img`
display: block;
width: 100%;
cursor:pointer;
`;
