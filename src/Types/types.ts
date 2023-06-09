import { RefObject, SetStateAction, Dispatch } from "react";

export interface IInputFieldProps {
    name: string;
    placeholder: string;
    formDataState: IFormDataState;
    setFormDataState: Dispatch<SetStateAction<IFormDataState>>;
    error: boolean;
    ref?: RefObject<HTMLInputElement>;
}

export interface ITemporaryFormData {
    [key: string]: string;
}

export interface IFormDataState {
    idInstance: string;
    apiTokenInstance: string;
    chatId: string;
    message: string;
    [key: string]: string | boolean;
}

export interface IMessage {
    input?: string;
    output?: string;
}
