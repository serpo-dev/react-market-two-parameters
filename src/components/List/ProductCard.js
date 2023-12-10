import listStyle from "../../styles/List.module.css";
import { NavLink } from "react-router-dom";

function ProductCard({ product }) {
    const { id, name, colors } = product;

    return (<NavLink
        className={listStyle["card"]}
        to={`/product?id=${id}`}
    >
        <img alt={name} src={colors[0]["images"][0]} />
        <h3>{name}</h3>
    </NavLink>)
}

export default ProductCard;