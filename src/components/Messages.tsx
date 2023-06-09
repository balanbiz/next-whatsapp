import Message from "./Message";

// Types
import { IMessage } from "@/Types/types";

interface IMessagesProps {
    messagesData: IMessage[];
}

const Messages: React.FC<IMessagesProps> = ({ messagesData }) => {
    return (
        <>
            <ul className="main__window-wrap">
                {messagesData.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </ul>
        </>
    );
};
export default Messages;
