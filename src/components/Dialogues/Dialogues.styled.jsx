import styled from '@emotion/styled';
import { Link } from "react-router-dom";

export const H2Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
export const DialoguesContainer = styled.div`
margin-top:100px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
export const DialogueContainer = styled.div`
margin-bottom:30px;
height: 400px;
width:100%;
display: flex;
background-color: blue;
justify-content: ${props => props.prop % 2 === 0 ? 'right' : 'left'};

align-items: center;
`;
export const NickLink = styled(Link)`
color:white;
`;
export const ItemContainer = styled.div`
display: flex;
`;
export const ItemDiv = styled.div`
font-size: 40px;
padding-top:15px;
display: flex;
justify-content: space-between;
align-items: center;
`;
export const Div = styled.div`
color:white;
background-color: red;
`;
export const MainDiv = styled.div`
display: flex;
`;