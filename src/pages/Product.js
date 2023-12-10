import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom"
import { getProduct, getSizes } from "../services/api";
import productStyle from "../styles/Product.module.css";
import { removeProduct, setAllSizes, setProduct, updateProduct } from "../store/productSlice";
import { ColorPicker, SizePicker } from "../components/Product";


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

    function handleChangeColor(color_id) {
        const sizes = product.colors.find(c => c.id === color_id).sizes;
        const size_id = sizes.find(id => id === product.curSizeID)
            ? product.curSizeID
            : sizes[0];
        props.dispatch(updateProduct({
            curColorID: color_id,
            curSizeID: size_id
        }));
    }

    function handleChangeSize(size_id) {
        props.dispatch(updateProduct({ curSizeID: size_id }));
    }

    if (props.error) return <p className={productStyle["error"]}>{props.error} </p>

    if (!product.id || props.loading) return <p className={productStyle["loading"]}>Waiting...</p>;

    const colorVariant = product.colors.find(c => c.id === product.curColorID);

    return (<>
        <div className={productStyle["goBack"]}>
            <NavLink to="/">Назад</NavLink>
        </div>

        <div className={productStyle["product"]}>
            <div>

                <img
                    src={colorVariant.images[0]}
                    alt={`${product.name}`}
                />
            </div>
            <div className={productStyle["information"]}>
                <div className={productStyle["price"]}>
                    <h3>{colorVariant.price} $</h3>
                    <button>
                        Add to cart
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



