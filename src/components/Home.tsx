"use client";
import "@/styles/Home.scss";
import { useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import FormBtn from "./FormBtn";
import Messages from "./Messages";
import { getResourse } from "@/server/fetch";
// Types
import { FormEvent, KeyboardEvent } from "react";
import { IInputFieldProps, IFormDataState, IMessage } from "@/Types/types";

const Home: React.FC = () => {
    // Vars
    const [firstPartFormStatus, setFirstPartFormStatus] = useState<boolean>(false);
    const [secondPartFormStatus, setsecondPartFormStatus] = useState<boolean>(false);
    const focusRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false);
    const [messagesData, setMessagesData] = useState<Array<IMessage>>([
        { output: "This is a test chat" },
        { input: "Wow, so cool :)" },
        { output: "You can write messages" },
    ]);
    const [formDataState, setFormDataState] = useState<IFormDataState>({
        idInstance: "",
        apiTokenInstance: "",
        chatId: "",
        message: "",
        error: false,
    });
    const { idInstance, apiTokenInstance, chatId, message } = formDataState;

    // Functions

    useEffect(() => {
        if (focusRef.current) {
            focusRef.current.focus();
        }
    }, []);

    useEffect(() => {
        let intervalId: NodeJS.Timer | null = null;

        if (secondPartFormStatus) {
            setMessagesData(messagesData => [...messagesData, { input: "Wow, so nice to meet you! Lets chat." }]);
            intervalId = setInterval(() => {
                getResourse("/api/receive").then(res => {
                    console.log(res);
                    setMessagesData(messagesData => [...messagesData, { input: res }]);
                });
            }, 8000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [secondPartFormStatus]);

    function handleSubmit(e?: FormEvent<HTMLFormElement>): void {
        e && e.preventDefault();

        if (!firstPartFormStatus) {
            handleFirstPartForm();
        } else {
            handleSecondPartForm();
        }
    }

    function handleFirstPartForm() {
        if (!firstPartFormStatus && idInstance.length !== 0 && apiTokenInstance.length !== 0) {
            setFirstPartFormStatus(firstPartFormStatus => !firstPartFormStatus);
            setFormDataState((formDataState: IFormDataState) => ({
                ...formDataState,
                idInstance: idInstance,
                apiTokenInstance: apiTokenInstance,
            }));
            setError(error => (error = false));
        } else {
            setError(error => (error = true));
        }
    }

    function handleSecondPartForm() {
        if (firstPartFormStatus && chatId.length !== 0 && message.length !== 0) {
            setFormDataState((formDataState: IFormDataState) => ({
                ...formDataState,
                chatId: chatId,
                message: message,
            }));
            setError(error => (error = false));
            sendMessage();
            setsecondPartFormStatus(state => (state = true));
        }
    }

    function sendMessage() {
        /* postResourse(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
            chatId: chatId,
            message: message,
        })
            .then(res => {
                if (res.idMessage) {
                    setMessagesData(messagesData => [...messagesData, { output: message }]);
                }
            })
            .catch(err => {
                throw new Error(err);
            }); */

        setMessagesData(messagesData => [...messagesData, { output: message }]);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLFormElement>): void {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }

    // Props

    const idInstanceProps: IInputFieldProps = {
        name: "idInstance",
        placeholder: "Your id (anything)",
        formDataState,
        setFormDataState,
        error,
        ref: focusRef,
    };

    const ApiTokenProps: IInputFieldProps = {
        name: "apiTokenInstance",
        placeholder: "Your token (anything)",
        formDataState,
        setFormDataState,
        error,
    };

    const phoneInputProps: IInputFieldProps = {
        name: "chatId",
        placeholder: "Phone number (anything)",
        formDataState,
        setFormDataState,
        error,
    };

    const messageInputProps: IInputFieldProps = {
        name: "message",
        placeholder: "Your message (anything)",
        formDataState,
        setFormDataState,
        error,
    };

    // TSX

    return (
        <section className="main">
            <div className="container">
                <div className="main__wrap">
                    <div className="main__input">
                        <form className="main__form" onSubmit={e => handleSubmit(e)} onKeyDown={e => handleKeyDown(e)}>
                            {firstPartFormStatus ? (
                                <>
                                    <InputField {...phoneInputProps} />
                                    <InputField {...messageInputProps} />
                                    <div className="main__wrap-btn">
                                        <button
                                            className="main__btn main__btn-back"
                                            type="button"
                                            onClick={() => {
                                                setFirstPartFormStatus(firstPartFormStatus => !firstPartFormStatus),
                                                    setsecondPartFormStatus(state => (state = false));
                                            }}
                                        >
                                            GO BACK
                                        </button>
                                        <FormBtn error={error} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <InputField {...idInstanceProps} />
                                    <InputField {...ApiTokenProps} />
                                    <FormBtn error={error} />
                                </>
                            )}
                        </form>
                    </div>
                    <div className="main__window">
                        {messagesData ? <Messages messagesData={messagesData} /> : "Enter your profile data to start chatting"}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Home;
