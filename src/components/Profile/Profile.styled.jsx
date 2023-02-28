import styled from "@emotion/styled";

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

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index:144;
  transform: translate(-50%, -50%);
  color: #52555f;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgba(82, 85, 95, 0.4);
`;

export const Wrapper = styled.form`
  padding: 50px 20px 60px;
  @media screen and (min-width: 768px) {
    display: block;
    padding: 50px 58px 60px;
  }
`;
export const CloseSvg = styled.button`
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  cursor: pointer;
`;
export const InputContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;`;

export const Input = styled.input`
border-color: grey;
border-radius: 4px;
height: 30px;
width:100%;
`;
export const Label = styled.label`
width:100%;
margin-bottom: 30px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
`;