
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModal, getUserId, getUserPhotos } from "Redux/networkSlice";
import { addPhoto, getAllUserPhotos } from "Redux/photosOperations";
import { PhotosGallery, PhotoItem, Container } from "./Photos.styled";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
export const Photos = () => {
    const userPhotos = useSelector(getUserPhotos);
    const userId = useSelector(getUserId)
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate('');
    const modal = useSelector(getModal);
    useEffect(() => {
        if (userId !== null && pathname === '/home/photos')
            dispatch(getAllUserPhotos())
    }, [dispatch, userId, pathname])
    const inputHandler = (e) => {
        const file = e.target.files[0];
        dispatch(addPhoto(file));
    }
    const onClickPhoto = (e) => {
        const url = e.split('/')[4];
        navigate(`/home/photos/${url}`)
    }
    return <>{pathname === '/home/photos' && <Container><div>
        <input type="file" onChange={inputHandler} />
    </div>
        {!modal.open && <PhotosGallery>
            {userPhotos.length > 0 ? userPhotos.map(item =>
                <PhotoItem onClick={(e) => onClickPhoto(item.photoURL)} key={item._id}><img src={item.photoURL} alt='zalypa' height="250" width="250" /></PhotoItem>
            ) : <div>No photos </div>}
        </PhotosGallery>}
    </Container>}<Outlet /></>
}