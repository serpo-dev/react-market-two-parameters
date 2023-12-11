import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { getProduct, getSizes } from "../services/api";
import productStyle from "../styles/Product.module.css";
import { removeProduct, setAllSizes, setProduct, updateProduct } from "../store/productSlice";
import { ColorPicker, Gallery, GoBackButton, SizePicker } from "../components/Product";
import { addItem, deleteItem } from "../store/cartSlice";


// Прокси - для getSizes, чтобы не было лишних перерендеров
export default function ProductProxy() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const state = {
        loading,
        setLoading,
        error,
        setError,

        dispatch,
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getSizes()
                .then(sizes => dispatch(setAllSizes(sizes)))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        })();
        return () => dispatch(removeProduct())
    }, []);

    return <Product {...state} />
}

function Product(props) {
    const { search } = useLocation();
    const id = useMemo(() => (new URLSearchParams(search)).get("id"), [search]);

    const product = useSelector((state) => state.product);
    const cartList = useSelector(state => state.cart.list);

    useEffect(() => {
        if (!id) {
            props.setError("There's no product ID specificated.");
            return;
        } else {
            props.setError(null);
        }

        (async () => {
            props.setLoading(true);
            await getProduct(id)
                .then((data) => props.dispatch(setProduct(data)))
                .catch(err => props.setError(err.message))
                .finally(() => props.setLoading(false));
        })();
        return () => props.dispatch(removeProduct())
    }, [id]);

    const isItemAddedToCard = useMemo(
        () => Boolean(cartList.find(
            e => e.product_id === product.id
                && e.color_id === product.curColorID
                && e.size_id === product.curSizeID)),
        [product, cartList]
    );

    const handleChangeColor = useCallback((color_id) => {
        const sizes = product.colors.find(c => c.id === color_id).sizes;
        const size_id = sizes.find(id => id === product.curSizeID)
            ? product.curSizeID
            : sizes[0];
        props.dispatch(updateProduct({
            curColorID: color_id,
            curSizeID: size_id
        }));
    }, [product]);

    const handleChangeSize = useCallback((size_id) => {
        props.dispatch(updateProduct({ curSizeID: size_id }));
    }, []);

    const handleAddtoCart = useCallback(() => {
        if (isItemAddedToCard) {
            props.dispatch(
                deleteItem({
                    product_id: product.id,
                    color_id: product.curColorID,
                    size_id: product.curSizeID,
                }));
        } else {
            const cv = product.colors.find(c => c.id === product.curColorID);
            props.dispatch(
                addItem({
                    product_id: product.id,
                    color_id: product.curColorID,
                    size_id: product.curSizeID,
                    price: cv.price,
                    img: cv.images,
                    product_name: product.name,
                    color_name: cv.name,
                    size_name: product.allSizes.find(s => s.id === product.curSizeID).label,
                }));
        }
    }, [product, isItemAddedToCard]);

    if (props.error) return <p className={productStyle["error"]}>{props.error} </p>

    if (!product.id || props.loading) return <p className={productStyle["loading"]}>Waiting...</p>;

    const colorVariant = product.colors.find(c => c.id === product.curColorID);

    return (<>
        <GoBackButton />

        <div className={productStyle["product"]}>
            <Gallery
                images={colorVariant.images}
                alt={product.name}
            />
            
            <div className={productStyle["information"]}>
                <div className={productStyle["price"]}>
                    <h3>{colorVariant.price} $</h3>
                    <button
                        onClick={handleAddtoCart}
                        className={isItemAddedToCard ? productStyle["active"] : ""}
                    >
                        {isItemAddedToCard ? "Delete from cart" : "Add to cart"}
                    </button>
                </div>

                <div className={productStyle["params"]}>
                    <ColorPicker
                        colors={product.colors}
                        activeColor={product.curColorID}
                        changeColor={handleChangeColor}
                    />
                    <SizePicker
                        allSizes={product.allSizes}
                        curSizes={colorVariant.sizes}
                        activeSize={product.curSizeID}
                        changeSize={handleChangeSize}
                    />
                </div>

            </div>
        </div>
    </>)
}



