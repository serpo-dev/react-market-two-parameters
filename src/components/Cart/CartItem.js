import cartStyle from "../../styles/Cart.module.css";
import Trash from "../../assets/trash.svg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../store/cartSlice";

export default function CartItem({
    product_id,
    product_name,
    size_id,
    size_name,
    color_id,
    color_name,
    img,
    price,
}) {
    const dispatch = useDispatch();

    function handleDeleteItem() {
        dispatch(deleteItem({ product_id, size_id, color_id }));
    }

    return (<>
        <div className={cartStyle["cartItem"]}>
            <NavLink to={`/product?id=${product_id}`}>
                <img
                    src={img[0]}
                    alt={product_id}
                    className={cartStyle["productImg"]}
                />
            </NavLink>

            <div className={cartStyle["cartItemDescription"]}>
                <div>
                    <b>{product_name}</b>
                </div>
                <div>
                    размер {size_name}, цвет {color_name}
                </div>
                <h3> <b>{price} $</b></h3>
            </div>

            <img
                onClick={handleDeleteItem}
                src={Trash}
                alt="deleting icon"
                className={cartStyle["deleteImg"]}
            />
        </div>
    </>)
}