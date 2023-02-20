
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersData } from "Redux/networkSlice";
import { getAllUsers } from "Redux/userOperaions";
import { Container, DivInContainer, TextDiv, NicknameLick } from "./People.styled";
export const People = () => {
    const dispatch = useDispatch();
    const usersData = useSelector(getAllUsersData);
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    return <Container>
        {usersData.length > 0 ? usersData.map(item => <DivInContainer key={item._id}>
            <div><p><img src={item.avatarURL} alt={item.nickName} /></p></div>
            <TextDiv><NicknameLick to={'/home/profile/' + item._id}><h2>{item.nickName}</h2></NicknameLick></TextDiv>
        </DivInContainer>) : <div>Not users</div>}
    </Container>
}