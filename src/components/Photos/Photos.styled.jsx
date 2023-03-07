import styled from "@emotion/styled";


export const PhotosGallery = styled.div`
padding: 15px;
width: 100%;
 display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
`;
export const PhotoItem = styled.div`
margin-right: 30px;
margin-bottom:30px;
cursor: pointer;
`;
export const PhotoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom:80px;
margin-right: 30px;
`;
export const ButtonWrapper = styled.div`
display: flex;
justify-content: space-between;
`;
export const Img = styled.img`
display: block;
height: 100%;
`;
export const Container = styled.div`
display: flex;
flex-direction: column;
`;
export const AddPhotoContainer = styled.div`
display: flex;
padding:75px;
justify-content: center;
align-items: center;
`;
export const InputFile = styled.input`
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
export const Label = styled.label`
    display: block;
    width: 300px;
  background-image: linear-gradient(to right, #9EEFE1 0%, #4830F0 51%, #9EEFE1 100%);
  background-size: 200% auto;
    padding: 10px;
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
    font-family: Tahoma;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
`;