
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getOutboxMessageById } from "Redux/messageOperaions";
import { useDispatch, useSelector } from "react-redux";
import { getOutboxContent } from "Redux/networkSlice";
import { ContentContainer, Div } from "./OutboxContent.styled";

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
    return <ContentContainer>
        {Object.values(outBoxContent).length > 0 && <Div>{outBoxContent.message.content}</Div>}
        <button type="button">Delete Message</button>
    </ContentContainer>
}