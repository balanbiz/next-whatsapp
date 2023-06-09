import { getResourse } from "@/server/fetch";

export async function GET() {
    let idInstance = "";
    let apiTokenInstance = "";

    /* getResourse(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`).then(res => {
        return new Response(JSON.stringify(res.body));
    }); */

    return new Response(JSON.stringify("Api is currently not working"));
    // deleteResourse(`https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}`, res.receiptId);
}
