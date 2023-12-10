import { useEffect, useState } from "react"
import { getProducts } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { deleteItems, updateItems } from "../store/listSlice";
import ProductCard from "../components/List/ProductCard";
import listStyle from "../styles/List.module.css";

export default function List() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const data = useSelector((state) => state.list);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getProducts()
                .then((data) => dispatch(updateItems(data)))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        })();

        return () => dispatch(deleteItems());
    }, []);

    if (error) return <p className={listStyle["error"]}>Error while fetching products. Pleasy try again later. </p>

    if (loading) return <p className={listStyle["loading"]}>Waiting...</p>;

    return (<>
        <p className={listStyle["count"]}>Всего: <b>{data.count}</b> </p>

        <div className={listStyle["items"]}>
            {data.items.map((p, i) => <ProductCard product={p} key={i} />)}
        </div>
    </>)
}