import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserId, getUserNickName, getUserPhoto } from "Redux/networkSlice";
import { getUserPhotoById, postComment, postLike, unLike } from "Redux/photosOperations";
import { PhotoContainer, TextComment, CommentForm, LikeImg, NickItem, DateItem, ItemContent, MainContainer, CommentsCount, CommentContainer, LeaveCommentContainer, DateContainer, LikeContainer } from "./Photo.styled";
import like from '../../images/like.png';
import { Button } from "components/App.styled";
export const Photo = () => {
    const [form, setForm] = useState({ content: '' })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userPhoto = useSelector(getUserPhoto);
    const { pathname } = useLocation();
    const userId = useSelector(getUserId);
    const nickName = useSelector(getUserNickName);
    const id = pathname.split('/')[3];
    const comments = userPhoto.map(item => item.comments);
    const checkLikeBackground = userPhoto?.map(item => item.likes)[0];
    const checkLikeColor = checkLikeBackground?.find(item => item.name === nickName);
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
    const onClickReturn = (e) => {
        if (e !== userId) {
            return navigate(`/home/profile/${e}/photos`)
        }
        return navigate('/home/photos')
    }
    return <MainContainer>
        {userPhoto?.length > 0 && userPhoto.map(item =>

            <PhotoContainer key={item._id}>
                <Button onClick={() => onClickReturn(item.owner)} type="button">Return</Button>
                <div>
                    <img src={item.photoURL} alt={item.name} width="500" height='500' />
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
        {comments[0]?.length > 0 && <CommentsCount><h2>Comments:  {comments[0].length}</h2></CommentsCount>}
        {comments[0]?.length > 0 ? comments[0].map(item => <div key={item._id}>
            <CommentContainer>
                <NickItem>{item.name}</NickItem>
                <ItemContent>{item.content}</ItemContent>
                <DateContainer>
                    <DateItem>{item.sendedDate.split('T')[0]}</DateItem>
                    <DateItem>{item.sendedDate.split('T')[1].split('.')[0]}</DateItem>
                </DateContainer>
            </CommentContainer>
        </div>)

            : <LeaveCommentContainer>no comments</LeaveCommentContainer>}
        <LeaveCommentContainer>
            {userPhoto?.length > 0 && <h2>Leave Comment</h2>}
            {userPhoto?.length > 0 && <CommentForm onSubmit={onSubmit}>
                <TextComment onChange={inputHandlerRegister} name='content' value={form.content} />
                <Button type="submit">send</Button>
            </CommentForm>}</LeaveCommentContainer>
    </MainContainer >
}