
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersData } from "Redux/networkSlice";
import { getAllUsers } from "Redux/userOperaions";
export const People = () => {
    const dispatch = useDispatch();
    const usersData = useSelector(getAllUsersData);
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])
    return <div>
        {usersData.length > 0 ? usersData.map(item => <div key={item._id}>
            <p><img src={item.avatarURL} alt={item.nickName} /></p>
            <p>{item.nickName}</p>
        </div>) : <div>Not users</div>}
    </div>
}