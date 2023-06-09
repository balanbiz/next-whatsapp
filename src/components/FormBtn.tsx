interface IFormBtnProps {
    error: boolean;
}

const FormBtn: React.FC<IFormBtnProps> = ({ error }) => {
    return (
        <button className="main__btn" type="submit" style={error ? { border: "4px solid red" } : undefined}>
            CONFIRM
        </button>
    );
};
export default FormBtn;
