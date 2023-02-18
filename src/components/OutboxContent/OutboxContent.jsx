
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getOutboxMessageById } from "Redux/messageOperaions";
import { useDispatch, useSelector } from "react-redux";
import { getOutboxContent } from "Redux/networkSlice";

export const OutboxContent = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const splitId = pathname.split('/')
    const id = splitId[4];
    const outBoxContent = useSelector(getOutboxContent);
    useEffect(() => {
        if (id)
            dispatch(getOutboxMessageById(id))
    }, [dispatch, id])
    return <div>
        {Object.values(outBoxContent).length > 0 && <p>{outBoxContent.message.content}</p>}
    </div>
}