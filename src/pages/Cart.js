import { useDispatch, useSelector } from "react-redux";
import cartStyle from "../styles/Cart.module.css";
import { CartItem } from "../components/Cart";
import { cleanCart } from "../store/cartSlice";

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    function handleDeleteAll() {
        dispatch(cleanCart());
    }

    return (<>
        <div className={cartStyle["cart"]}>
            <div className={cartStyle["information"]}>
                <div className={cartStyle["totals"]}>
                    <p>
                        Всего в корзине товаров: <b>{cart.count} шт</b>
                    </p>
                    <p>
                        Общая стоимость: <b style={{ fontSize: 24 }}>{cart.totalPrice} $</b>
                    </p>
                </div>
                <button
                    className={cartStyle["deleteAll"]}
                    onClick={handleDeleteAll}
                >
                    Удалить все
                </button>
            </div>
            <div className={cartStyle["itemsList"]}>
                {
                    cart.list.map((e, i) => (
                        <CartItem
                            {...e}
                            key={`${e.product_id}_${e.color_id}_${e.size_id}`}
                        />
                    ))
                }
            </div>
        </div>
    </>)
}