
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnotherUserPhotos, getModal, getUserId, getUserPhotos } from "Redux/networkSlice";
import { addPhoto, deletePhoto, getAllAnotherUserPhotos, getAllUserPhotos, patchAvatar } from "Redux/photosOperations";
import { PhotosGallery, AddPhotoContainer, Label, PhotoItem, Container, PhotoContainer, ButtonWrapper } from "./Photos.styled";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "components/App.styled";
export const Photos = () => {
    const userPhotos = useSelector(getUserPhotos);
    const anotherUserPhotos = useSelector(getAnotherUserPhotos);
    const { pathname } = useLocation();
    const data = pathname?.split('/')[3];
    let photosData = pathname === `/home/profile/${data}/photos` ? anotherUserPhotos : userPhotos;
    const userId = useSelector(getUserId)
    const dispatch = useDispatch();
    const navigate = useNavigate('');
    const modal = useSelector(getModal);

    useEffect(() => {
        if (userId !== null) {
            if (pathname === '/home/photos') {
                dispatch(getAllUserPhotos())
            }
            if (pathname === `/home/profile/${data}/photos`) {
                dispatch(getAllAnotherUserPhotos(data))
            }
        }
    }, [dispatch, userId, pathname, data])
    const inputHandler = (e) => {
        const file = e.target.files[0];
        dispatch(addPhoto(file));
    }
    const onClickPhoto = (e) => {
        const url = e.split('/')[4];
        navigate(`/home/photos/${url}`)
    }
    const onClickDelete = (e) => {
        dispatch(deletePhoto(e));
    }
    const onClickAvatar = (e) => {
        dispatch(patchAvatar(e));
    }
    return <><Container>{pathname === '/home/photos' && <AddPhotoContainer>
        {/* <InputFile type="file" onChange={inputHandler} /> */}
        <Label htmlFor="uploadbtn">Upload Photo<div></div></Label>
        <input style={{ opacity: '0', zIndex: '-1' }} type="file" name="upload" id="uploadbtn" onChange={inputHandler} />
    </AddPhotoContainer>}
        {!modal.open && (pathname === '/home/photos' || pathname === `/home/profile/${data}/photos`) && <PhotosGallery>
            {photosData.length > 0 ? photosData.map(item => <PhotoContainer key={item._id}>
                <PhotoItem onClick={(e) => onClickPhoto(item.photoURL)}><img src={item.photoURL} alt='zalypa' height="250" width="250" />
                </PhotoItem>
                {item.owner === userId && <ButtonWrapper>
                    <Button onClick={() => onClickDelete(item.name)} type="button">delete</Button>
                    <Button onClick={() => onClickAvatar(item.name)} type="button">make an avatar</Button>
                </ButtonWrapper>}
            </PhotoContainer>
            ) : <div>No photos </div>}
        </PhotosGallery>}
    </Container><Outlet /></>
}