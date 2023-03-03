
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnotherUserPhotos, getModal, getUserId, getUserPhotos } from "Redux/networkSlice";
import { addPhoto, getAllAnotherUserPhotos, getAllUserPhotos } from "Redux/photosOperations";
import { PhotosGallery, PhotoItem, Container } from "./Photos.styled";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
export const Photos = () => {
    const userPhotos = useSelector(getUserPhotos);
    const anotherUserPhotos = useSelector(getAnotherUserPhotos);
    const { pathname } = useLocation();
    const data = pathname?.split('/')[3];
    let photosData = pathname === `/home/profile/${data}/photos` ? anotherUserPhotos : userPhotos;
    console.log(anotherUserPhotos);
    // userPhotos = pathname === `/home/profile/${data}/photos` ? userPhotos.data : userPhotos;
    const userId = useSelector(getUserId)
    const dispatch = useDispatch();
    const navigate = useNavigate('');
    const modal = useSelector(getModal);
    // let photosData = pathname === `/home/profile/${data}/photos` ? anotherUserPhotos.data : userPhotos;

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
    return <><Container>{pathname === '/home/photos' && <div>
        <input type="file" onChange={inputHandler} />
    </div>}
        {!modal.open && <PhotosGallery>
            {photosData.length > 0 ? photosData.map(item =>
                <PhotoItem onClick={(e) => onClickPhoto(item.photoURL)} key={item._id}><img src={item.photoURL} alt='zalypa' height="250" width="250" /></PhotoItem>
            ) : <div>No photos </div>}
        </PhotosGallery>}
    </Container><Outlet /></>
}