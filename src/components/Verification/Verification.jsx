
import { Link } from "react-router-dom";
import { getUserEmail } from "Redux/networkSlice";
import { useSelector } from "react-redux";
export const Verification = () => {
    const email = useSelector(getUserEmail);
    return <div>We Send verification on your {email},
        check and u can <Link to='/'>Login</Link>
    </div>
}