
import { getUserEmail } from "Redux/networkSlice";
import { useSelector } from "react-redux";
import { MainDiv, LinkItem } from "./Verification.styled";
export const Verification = () => {
    const email = useSelector(getUserEmail);
    return <MainDiv>We Send verification on your {email},
        check and u can <LinkItem to='/'>Login</LinkItem>
    </MainDiv>
}