import { List, Product, Cart } from "../pages/index.js";

export const routes = [
    {
        name: "List",
        path: "/",
        element: <List />
    },
    {
        name: "Product",
        path: "/product",
        element: <Product />
    },
    {
        name: "Cart",
        path: "/cart",
        element: <Cart />
    },
];