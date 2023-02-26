
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersData, getFind, getPage, getTotalHits, getUserId, setPage } from "Redux/networkSlice";
import { getAllUsers } from "Redux/userOperaions";
import { Container, DivInContainer, TextDiv, NicknameLick, ButtonContainer } from "./People.styled";
import { useLocation } from "react-router-dom";
import { Button } from "components/App.styled";
import { FindPeople } from "components/FindPeople/FindPeople";
export const People = () => {
    const find = useSelector(getFind);
    const skip = 5;
    const dispatch = useDispatch();
    const usersData = useSelector(getAllUsersData);
    const userId = useSelector(getUserId);
    const totalHits = useSelector(getTotalHits);
    let page = useSelector(getPage);
    const { pathname } = useLocation();
    useEffect(() => {
        if (userId !== null) {
            if (page !== '0') {
                const data = {
                    page,
                    skip
                }
                dispatch(getAllUsers(data));
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
    return <>
        <Container>
            <div><h1>Peoples</h1><div>Find People<FindPeople /></div></div>
            {!find && usersData.length > 0 && usersData.map(item => <DivInContainer key={item._id}>
                <div><p><img src={item.avatarURL} alt={item.nickName} /></p></div>
                <TextDiv><NicknameLick to={'/home/profile/' + item._id}><h2>{item.nickName}</h2></NicknameLick></TextDiv>
            </DivInContainer>)}
        </Container>{totalHits !== null && totalHits > usersData.length && pathname === "/home" && <ButtonContainer>
            <Button type="button" disabled={page === '1' || page === 1 ? true : false} onClick={onClickPrev}>prev</Button>
            <Button type="button" disabled={usersData.length === skip && totalHits / page !== usersData.length ? false : true} onClick={onClickNext}>next</Button>
        </ButtonContainer>}
    </>
}