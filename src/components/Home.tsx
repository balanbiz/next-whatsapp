"use client";
import "@/styles/Home.scss";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import InputField from "./InputField";
import FormBtn from "./FormBtn";
import Messages from "./Messages";
import { postResourse, getResourse, deleteResourse } from "@/server/fetch";
// Types
import { FormEvent, KeyboardEvent } from "react";
import { IInputFieldProps, IFormDataState } from "@/Types/types";

const Home: React.FC = () => {
    // Vars
    const [firstPartFormStatus, setFirstPartFormStatus] = useState<boolean>(false);
    const focusRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false);
    const [messagesData, setMessagesData] = useState<Array<Object>>([]);
    const [formDataState, setFormDataState] = useState<IFormDataState>({
        idInstance: "",
        apiTokenInstance: "",
        chatId: "",
        message: "",
        error: false,
    });
    const { idInstance, apiTokenInstance, chatId, message } = formDataState;
    useQuery("receives", () => receivingQuery(), { keepPreviousData: true, refetchInterval: 7000 });

    // Functions

    useEffect(() => {
        if (focusRef.current) {
            focusRef.current.focus();
        }
    }, []);

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
        }
    }

    function sendMessage() {
        postResourse(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
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
            });
    }

    function receivingQuery() {
        getResourse(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`).then(res => {
            console.log(res);
            if (res) {
                if (res.body.messageData) {
                    setMessagesData(messagesData => [...messagesData, { input: res.body.messageData.extendedTextMessageData.text }]);
                    deleteResourse(
                        `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}`,
                        res.receiptId
                    );
                }
            }
        });
    }

    function handleKeyDown(e: KeyboardEvent<HTMLFormElement>): void {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }

    function log(...x: any): any {
        console.log(x);
    }

    // Props

    const idInstanceProps: IInputFieldProps = {
        name: "idInstance",
        placeholder: "Ваш id",
        formDataState,
        setFormDataState,
        error,
        ref: focusRef,
    };

    const ApiTokenProps: IInputFieldProps = {
        name: "apiTokenInstance",
        placeholder: "Ваш токен",
        formDataState,
        setFormDataState,
        error,
    };

    const phoneInputProps: IInputFieldProps = {
        name: "chatId",
        placeholder: "Номер 11001234567@c.us",
        formDataState,
        setFormDataState,
        error,
    };

    const messageInputProps: IInputFieldProps = {
        name: "message",
        placeholder: "Ваше сообщение",
        formDataState,
        setFormDataState,
        error,
    };

    // TSX

    return (
        <section className="main">
            {log("render Home", formDataState)}
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
                                            onClick={() => setFirstPartFormStatus(firstPartFormStatus => !firstPartFormStatus)}
                                        >
                                            ВЕРНУТЬСЯ
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
