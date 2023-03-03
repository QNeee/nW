import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "Redux/friendsOperations";
import { Container, NavContainer, Nav, NavItem, ImgDiv } from "./Friends.styled";
import { getLoading, getUserFriends, getUserId } from "Redux/networkSlice";
import close from '../../images/zaglywka.jpg';
export const Friends = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const { pathname } = useLocation();
    useEffect(() => {
        if (userId !== null)
            dispatch(getAllFriends());
    }, [dispatch, userId])
    const loading = useSelector(getLoading);
    const userFriends = useSelector(getUserFriends);
    const onPending = userFriends.filter(item => item.verificationToken);
    return <Container>
        <NavContainer>
            <Nav>
                <NavItem to={'/home/friends/your-friends'}>Your Friends</NavItem>
                <NavItem to={'/home/friends/on-pending'}>On Pending {onPending.length > 0 && (onPending.length)}</NavItem>
            </Nav>
        </NavContainer>
        {pathname === '/home/friends' && <ImgDiv><img src={close} alt="close" width='500px' /></ImgDiv>}
        {!loading && < Outlet />}
    </Container>
}