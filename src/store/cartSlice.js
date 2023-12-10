import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
    list: [], // для легкого доступа - триплеты ID {product_id, color_id, size_id, ...}
    count: 0,
    totalPrice: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const {
                product_id,
                color_id,
                size_id,
                img,
                price,
                product_name,
                color_name,
                size_name,
            } = action.payload;

            const isAddedToCart = state.list.find(e => e.product_id === product_id && e.color_id === color_id && e.size_id === size_id);

            if (!isAddedToCart) {
                const newList = _.cloneDeep(state.list);
                newList.push({
                    product_id,
                    color_id,
                    size_id,
                    img,
                    price,
                    product_name,
                    color_name,
                    size_name,
                });
                state.list = newList;
                state.count = newList.length;
                state.totalPrice = newList.reduce((acc, cur) => acc += Number(cur.price), 0);
            }
        },

        deleteItem: (state, action) => {
            const {
                product_id,
                color_id,
                size_id
            } = action.payload;

            const newList = state.list.filter(
                e => e.product_id + e.color_id + e.size_id !== product_id + color_id + size_id
            );

            state.list = _.cloneDeep(newList);
            state.count = newList.length;
            state.totalPrice = newList.reduce((acc, cur) => acc += Number(cur.price), 0);

            const newColors = _.cloneDeep(state.colors);
            newColors[color_id] = { ...newColors[color_id], [product_id]: undefined };
            state.colors = newColors;
        },

        cleanCart: (state) => {
            for (const key in initialState) {
                state[key] = _.cloneDeep(initialState[key]);
            }
        },
    }
});

export const {
    addItem,
    deleteItem,
    leanCart
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;