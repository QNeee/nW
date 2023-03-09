
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersData, getFind, getLoading, getPage, getTotalHits, getUserFriends, getUserId, getUserInfo, setPage } from "Redux/networkSlice";
import { getAllUsers } from "Redux/userOperaions";
import { Container, PeopleButton, MainContainer, H1, Status, SearchDiv, H1Container, DivInContainer, TextDiv, NicknameLick, ButtonContainer, P } from "./People.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "components/App.styled";
import { FindPeople } from "components/FindPeople/FindPeople";
import { addFriend, getAllFriends, removeFriend } from "Redux/friendsOperations";
import noAvatar from '../../images/NoAvatar.webp';
export const People = () => {
    const navigate = useNavigate();
    const loading = useSelector(getLoading);
    const find = useSelector(getFind);
    const skip = 5;
    const dispatch = useDispatch();
    const usersData = useSelector(getAllUsersData);
    const userId = useSelector(getUserId);
    const totalHits = useSelector(getTotalHits);
    const userInfo = useSelector(getUserInfo);
    let page = useSelector(getPage);
    const { pathname } = useLocation();
    const friends = useSelector(getUserFriends);
    const userNickname = userInfo.map(item => item.nickName).join('');
    const userTempFriends = userInfo.map(item => item.tempFriends);
    const userFriendsId = userInfo.map(item => item.friendsId);
    const filteredUsersData = usersData.filter(item => item.verify);

    useEffect(() => {
        if (userId !== null) {
            const data = {
                page,
                skip
            }
            if (page !== '0') {
                dispatch(getAllUsers(data));
            }

            if (page !== 1) {
                dispatch(getAllFriends());
            }
        }
    }, [dispatch, userId, page])

    const onClickPrev = () => {
        page--;
        dispatch(setPage(page));
        dispatch(getAllFriends());
    }

    const onClickNext = () => {
        page++;
        dispatch(setPage(page));
    }
    const onClickGeneral = (e, email, id) => {
        const data = {
            page,
            skip
        }
        const userTempFriends = userInfo.map(item => item.tempFriends);
        const userFriendsId = userInfo.map(item => item.friendsId);
        const tokenNeed = friends.filter(item => item.verificationToken);
        if (userFriendsId[0].includes(email)) {
            dispatch(removeFriend(id));
            return dispatch(getAllUsers(data));
        }
        if (userTempFriends[0].includes(email) && tokenNeed.length !== 0) {
            return navigate('/home/friends/on-pending')
        }
        if (e.target.textContent === 'pending') return;
        const friend = {
            id: id
        }
        dispatch(addFriend(friend));
        return dispatch(getAllUsers(data));
    }
    const onClickPeople = (name) => {
        if (name === null) return;
        const url = name.split('/')[4];
        navigate(`/home/photos/${url}`)
    }
    return <MainContainer>
        <H1Container>
            <H1>Peoples</H1>
        </H1Container>
        <SearchDiv><FindPeople /></SearchDiv>
        <Container>
            {!find && filteredUsersData.length > 0 && filteredUsersData.map(item => <DivInContainer key={item._id}>
                <div><p><img onClick={() => onClickPeople(item.avatarURL)} src={item.avatarURL ? item.avatarURL : noAvatar} alt={item.nickName} width="100" height='100' /></p></div>
                <TextDiv><NicknameLick to={item._id !== userId ? '/home/profile/' + item._id : '/home/profile'}><h2>{item.nickName}</h2></NicknameLick><Status prop={item.status}></Status></TextDiv>{item.nickName === userNickname ? <P>its U</P> : <PeopleButton disabled={!loading ? false : true} id="people" onClick={(e) => onClickGeneral(e, item.email, item._id)} type="button">{
                    userTempFriends[0]?.includes(item.email) ? 'pending' :
                        userFriendsId[0]?.includes(item.email) ? 'delete friend' : 'add friend'
                }</PeopleButton>}
            </DivInContainer>)}
        </Container>
        {totalHits !== null && totalHits > usersData.length && pathname === "/home" && <ButtonContainer>
            {page !== 1 && <Button type="button" onClick={onClickPrev}>prev</Button>}
            {totalHits / page !== skip && usersData.length === skip && <Button type="button" onClick={onClickNext}>next</Button>}
        </ButtonContainer>
        }
        {/* {loading && <Container>loading...</Container>} */}
    </MainContainer >
}