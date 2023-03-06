import styled from "@emotion/styled";
import { Link } from "react-router-dom";
export const FindDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top:100px;
`;
export const FriendsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
`;
export const FriendsDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;
export const NickItem = styled(Link)`
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
export const NickContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
export const FriendsMainContainer = styled.div`
display: flex;
flex-direction: column;
`;