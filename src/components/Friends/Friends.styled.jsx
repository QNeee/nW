import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
export const Container = styled.div`
/* display:flex;
flex-direction: column;
justify-content: center;
align-items: center; */
margin-top:15px;
margin-left:auto;
margin-right: auto;
`;
export const NavItem = styled(NavLink)`
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

  cursor: pointer;
  &:hover{
    background-position: right center;
  }
`;
export const NavContainer = styled.div`
width: 599px;
`;
export const Nav = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
`;
export const ImgDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top:auto;
`;