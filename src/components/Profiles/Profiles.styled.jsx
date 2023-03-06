import styled from "@emotion/styled";
import { Link } from "react-router-dom";
export const Container = styled.div`display:flex;
margin-top:auto;
margin-left:auto;
margin-right: auto;
margin-bottom:auto;
`;
export const MessageCount = styled.ul`
list-style: none;
margin-top:30px;
`;

export const ProfileStats = styled.div``;

export const LinkItem = styled(Link)`
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
  /* background-color:${props => props.prop === false ? "red" : 'black'}; */
  cursor: pointer;
  &:hover{
    background-position: right center;
  }
`;