import { CSSProperties } from "react";

const Header: React.FC = () => {
    const fastStyles: CSSProperties = {
        backgroundColor: "#00a884",
        position: "absolute",
        top: 0,
        zIndex: -1,
        width: "100%",
        height: 222,
        marginBottom: 66,
    };

    return <header style={fastStyles}></header>;
};
export default Header;
