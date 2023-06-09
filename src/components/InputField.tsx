"use client";
import "@/styles/InputField.scss";
import { forwardRef } from "react";
//Types
import { IInputFieldProps } from "@/Types/types";
type Ref = HTMLInputElement;

// Component

const InputField = forwardRef<Ref, IInputFieldProps>(({ name, placeholder, setFormDataState, formDataState }, ref) => {
    // Functions

    function log(x: string): any {
        console.log(x);
    }

    // TSX

    return (
        <label htmlFor={name} className="input-field">
            {log(`render input ${name}`)}
            <div className="input-field__header">{name}</div>
            <input
                ref={ref}
                type="text"
                name={name}
                placeholder={placeholder}
                value={formDataState[name].toString()}
                onChange={e =>
                    setFormDataState(prevState => ({
                        ...prevState,
                        [name]: e.target.value,
                    }))
                }
            />
        </label>
    );
});

InputField.displayName = "InputField";

export default InputField;
