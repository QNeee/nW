import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const Header = styled.header`  top: 0;
width:1232px;
  left: 0;
  position: sticky;
  z-index: 122;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);`;
export const Nav = styled.nav`margin-left:auto;`;
export const NavItem = styled(NavLink)`
 margin-right:20px; 
text-decoration:none;
color:white;
  :hover {
  background-color:white;
    color:blue;
  }
`;
export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
export const Main = styled.main`display:flex;width:1280px`;
export const Button = styled.button`
 text-decoration: none;
  display: inline-block;
    color: red;
  padding: 20px 30px;
  margin: 10px 20px;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-image: linear-gradient(to right, white 0%, green 51%, #9EEFE1 100%);
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
  cursor: pointer;
  &:hover{
    background-position: right center;
  }
`;
