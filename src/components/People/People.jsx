
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersData, getFind, getLoading, getPage, getTotalHits, getUserFriends, getUserId, getUserInfo, setPage } from "Redux/networkSlice";
import { getAllUsers } from "Redux/userOperaions";
import { Container, PeopleButton, MainContainer, H1, SearchDiv, H1Container, DivInContainer, TextDiv, NicknameLick, ButtonContainer, P } from "./People.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "components/App.styled";
import { FindPeople } from "components/FindPeople/FindPeople";
import { addFriend, getAllFriends, removeFriend } from "Redux/friendsOperations";
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
    const foo = (nickName) => {
        if (friends.length > 0) {
            const need = friends.filter(item => item.nickName === nickName).filter(item => item.owner === userId);
            const need1 = need.map(item => item.verify).join('');
            if (need1 === 'false') {
                return 'pending'
            }
            if (need1 === 'true') {
                return 'delete friend'
            }
        }
        return 'add friend'
    }
    const onClickGeneral = (e, nickName, id) => {
        const tokenNeed = friends.filter(item => item.verificationToken);
        if (friends.length > 0) {
            const need = friends.filter(item => item.nickName === nickName).filter(item => item.owner === userId);
            const need1 = need.map(item => item.verify).join('');
            if (need1 === 'true') {
                console.log('delete');
                return dispatch(removeFriend(id));
            }
            if (need1 === 'false' && tokenNeed.length !== 0) {

                return navigate('/home/friends/on-pending')
            }
        }
        if (e.target.textContent === 'pending') return;
        const friend = {
            id: id
        }
        return dispatch(addFriend(friend));
    }

    return <MainContainer>
        <H1Container>
            <H1>Peoples</H1>
        </H1Container>
        <SearchDiv><FindPeople /></SearchDiv>
        <Container>
            {!find && usersData.length > 0 && usersData.map(item => <DivInContainer key={item._id}>
                <div><p><img src={item.avatarURL} alt={item.nickName} /></p></div>
                <TextDiv><NicknameLick to={'/home/profile/' + item._id}><h2>{item.nickName}</h2></NicknameLick></TextDiv>{item.nickName === userNickname ? <P>its U</P> : <PeopleButton disabled={!loading ? false : true} id="people" onClick={(e) => onClickGeneral(e, item.nickName, item._id)} type="button">{foo(item.nickName)}</PeopleButton>}
            </DivInContainer>)}
        </Container>{
            totalHits !== null && totalHits > usersData.length && pathname === "/home" && <ButtonContainer>
                {page !== 1 && !loading && <Button type="button" onClick={onClickPrev}>prev</Button>}
                {usersData.length === skip && <Button type="button" onClick={onClickNext}>next</Button>}
            </ButtonContainer>
        }
        {/* {loading && <Container>loading...</Container>} */}
    </MainContainer >
}