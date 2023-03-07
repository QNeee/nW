export const date = (date) => {
    const messageDate = date.split('T')[0];
    return messageDate
}
export const time = (date) => {
    const messageTime = date.split('T')[1].split('.')[0];
    return messageTime;
}