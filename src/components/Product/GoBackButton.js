import { NavLink } from "react-router-dom";
import productStyle from "../../styles/Product.module.css";

export default function GoBackButton() {
    return (<>
        <div className={productStyle["goBackContainer"]}>
            <NavLink
                to="/"
                className={productStyle["goBackButton"]}
            >
                Назад
            </NavLink>
        </div>
    </>)
}