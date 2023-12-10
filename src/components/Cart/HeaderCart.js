import cartStyle from "../../styles/Cart.module.css";
import Cart from "../../assets/cart.svg";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function HeaderCart() {
    const count = useSelector(store => store.cart.count);

    return (<>
        <NavLink
            to="/cart"
            className={cartStyle["headerCart"]}
        >
            <img
                alt="cart"
                src={Cart}
            />
            <div className={cartStyle["headerCartCircle"]}>
                <span>{count}</span>
            </div>
        </NavLink>
    </>)
}