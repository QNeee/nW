
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersData, getFind, getLoading, getPage, getTotalHits, getUserId, getUserInfo, setPage } from "Redux/networkSlice";
import { getAllUsers } from "Redux/userOperaions";
import { Container, PeopleButton, MainContainer, H1, SearchDiv, H1Container, DivInContainer, TextDiv, NicknameLick, ButtonContainer, P } from "./People.styled";
import { useLocation } from "react-router-dom";
import { Button } from "components/App.styled";
import { FindPeople } from "components/FindPeople/FindPeople";
import { addFriend, getAllFriends, removeFriend } from "Redux/friendsOperations";
export const People = () => {
    const loading = useSelector(getLoading);
    const find = useSelector(getFind);
    const skip = 5;
    const dispatch = useDispatch();
    const usersData = useSelector(getAllUsersData);
    const userId = useSelector(getUserId);
    const totalHits = useSelector(getTotalHits);
    const userInfo = useSelector(getUserInfo);
    const userFriends = userInfo.filter(item => item._id === userId);
    const usersFriends = userFriends.map(({ friendsId }) => friendsId);
    const usersFriendsData = usersFriends[0];
    let page = useSelector(getPage);
    const { pathname } = useLocation();
    const userNickname = userInfo.map(item => item.nickName).join('');
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
    }

    const onClickNext = () => {
        page++;
        dispatch(setPage(page));
    }
    const onClick = (e) => {

        const friend = {
            id: e
        }
        dispatch(addFriend(friend));
    }
    const onClickDelete = (e) => {

        dispatch(removeFriend(e));
    }
    return <MainContainer>
        <H1Container>
            <H1>Peoples</H1>
        </H1Container>
        <SearchDiv><FindPeople /></SearchDiv>
        <Container>
            {!find && usersData.length > 0 && usersData.map(item => <DivInContainer key={item._id}>
                <div><p><img src={item.avatarURL} alt={item.nickName} /></p></div>
                <TextDiv><NicknameLick to={'/home/profile/' + item._id}><h2>{item.nickName}</h2></NicknameLick></TextDiv>{item.nickName === userNickname ? <P>its U</P> : <PeopleButton prop={!usersFriendsData?.find(item1 => item._id === item1)} onClick={!usersFriendsData?.find(item1 => item._id === item1) ? () => onClick(item._id) : () => onClickDelete(item._id)} type="button">{!usersFriendsData?.find(item1 => item._id === item1) ? 'Add friend' : 'delete friend'}</PeopleButton>}
            </DivInContainer>)}
        </Container>{totalHits !== null && totalHits > usersData.length && pathname === "/home" && <ButtonContainer>
            {page !== 1 && !loading && <Button type="button" onClick={onClickPrev}>prev</Button>}
            {!loading && usersData.length === skip && <Button type="button" onClick={onClickNext}>next</Button>}
        </ButtonContainer>}
    </MainContainer>
}