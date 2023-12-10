import { NavLink } from "react-router-dom";
import { HeaderCart } from "../Cart";


function Header() {
    return (
        <header>

            <h1>
                <NavLink to="/">
                    МАГАЗИН ОДЕЖДЫ
                </NavLink>
            </h1>


            <HeaderCart />
        </header>
    )
}

export default Header;