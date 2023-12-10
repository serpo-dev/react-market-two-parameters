import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartStyle from "../styles/Cart.module.css";
import { CartItem } from "../components/Cart";

export default function Cart() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    useEffect(() => {

    }, []);

    return (<>
        <div className={cartStyle["cart"]}>
            <div>
                <p>
                    Всего в корзине товаров: <b>{cart.count} шт</b>
                </p>
                <p>
                    Общая стоимость: <b style={{ fontSize: 24 }}>{cart.totalPrice} $</b>
                </p>
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