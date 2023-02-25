import styled from "@emotion/styled";
export const Modal = styled.div`
padding:35px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index:122;
  transform: translate(-50%, -50%);
  color: #52555f;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgba(82, 85, 95, 0.4);
`;
export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
export const ButtonContainer = styled.div`
margin-top:20px;
display: flex;
justify-content: space-around;
align-items: center;
`    ;
export const Span = styled.span`
display: flex;
justify-content: center;
align-items: center;
`;
