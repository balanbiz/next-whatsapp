import { getResourse, deleteResourse } from "@/server/fetch";

export default async function receivingQuery() {
    let idInstance = "";
    let apiTokenInstance = "";
    getResourse(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`).then(res => {
        console.log(res, "close");

        // deleteResourse(`https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}`, res.receiptId);
        // console.log(res, "deleted");
        try {
            return res.body.messageData.extendedTextMessageData;
        } catch (error) {
            console.log(error);
        }
        /* try {
            return;
        } catch (error) {
            console.log(error);
        } */
    });
}
