//Types
import { IMessage } from "@/Types/types";

interface MessageProps {
    message: IMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
    const { input, output } = message;

    return (
        <>
            {output && (
                <li className="main__window-message _left">
                    <span>{output}</span>
                </li>
            )}
            {input && (
                <li className="main__window-message _right">
                    <span>{input}</span>
                </li>
            )}
        </>
    );
};
export default Message;
