import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserId, getUserNickName, getUserPhoto } from "Redux/networkSlice";
import { getUserPhotoById, postComment, postLike, unLike } from "Redux/photosOperations";
import { PhotoContainer, LikeImg, CommentContainer, LeaveCommentContainer, DateContainer, LikeContainer } from "./Photo.styled";
import like from '../../images/like.png';
export const Photo = () => {
    const [form, setForm] = useState({ content: '' })
    const dispatch = useDispatch();
    const userPhoto = useSelector(getUserPhoto);
    const { pathname } = useLocation();
    const userId = useSelector(getUserId);
    const nickName = useSelector(getUserNickName);
    const id = pathname.split('/')[3];
    const comments = userPhoto.map(item => item.comments);
    const checkLikeBackground = userPhoto?.map(item => item.likes)[0];
    const checkLikeColor = checkLikeBackground?.find(item => item.name === nickName);
    console.log(checkLikeColor);
    // console.log(checkLikeBackground);
    const inputHandlerRegister = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,

        }));
    }
    useEffect(() => {
        if (userId)
            dispatch(getUserPhotoById(id));
    }, [dispatch, id, userId])
    const onSubmit = (e) => {
        e.preventDefault();
        const comment = {
            name: nickName,
            content: form.content.split('\n').join(' '),
            id: id,
            sendedDate: Date.now()
        }
        dispatch(postComment(comment));
        setForm({ content: '' });
    }
    const onClickLike = (e) => {
        const like = {
            nickName,
            id: id,
        }
        if (checkLikeColor) {
            return dispatch(unLike(like));
        }

        return dispatch(postLike(like));
    }
    return <div>Photo

        {userPhoto?.length > 0 && userPhoto.map(item =>
            <PhotoContainer key={item._id}>
                <div>
                    <img src={item.photoURL} alt={item.name} width="1000" />
                </div>
                <LikeContainer>
                    <div>
                        <LikeImg prop={checkLikeColor} onClick={onClickLike} src={like} alt="like" />
                    </div>
                    <div>
                        <p>likes:{item.likesCount}</p>
                    </div>
                </LikeContainer>
            </PhotoContainer>)}
        {comments[0]?.length > 0 && <div>Comments: {comments[0].length} </div>}
        {comments[0]?.length > 0 ? comments[0].map(item => <div key={item._id}>
            <CommentContainer>
                <p>{item.name}</p>
                <p>{item.content}</p>
                <DateContainer>
                    <p>{item.sendedDate.split('T')[0]}</p>
                    <p>{item.sendedDate.split('T')[1].split('.')[0]}</p>
                </DateContainer>
            </CommentContainer>
        </div>)

            : <LeaveCommentContainer>no comments</LeaveCommentContainer>}
        <LeaveCommentContainer>
            {userPhoto?.length > 0 && <p>Leave Comment</p>}
            {userPhoto?.length > 0 && <form onSubmit={onSubmit}>
                <textarea onChange={inputHandlerRegister} name='content' value={form.content} />
                <button type="submit">send</button>
            </form>}</LeaveCommentContainer>
    </div >
}