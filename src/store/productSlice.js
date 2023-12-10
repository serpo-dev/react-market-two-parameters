import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { findColorWithSize } from "../utils/findColorWithSize";


const initialState = {
    allSizes: [],
    id: null,
    name: null,
    colors: [],
    curColorID: 0,
    curSizeID: 0,
    isAddedToCart: false,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setAllSizes: (state, action) => {
            state.allSizes = _.cloneDeep(action.payload);
        },

        setProduct: (state, action) => {
            const { id, name, colors } = action.payload;

            state.id = id || null;
            state.name = name || null;
            if (!Array.isArray(colors)) return
            state.colors = _.cloneDeep(colors);
            const curColorID = findColorWithSize(colors);
            const curSizeID = curColorID !== -1
                ? colors.find(c => c.id === curColorID).sizes[0]
                : -1;
            state.curColorID = curColorID;
            state.curSizeID = curSizeID;
        },

        updateProduct: (state, action) => {
            for (const key in action.payload) {
                state[key] = _.cloneDeep(action.payload[key]);
            }
        },

        removeProduct: (state) => {
            for (const key in initialState) {
                state[key] = _.cloneDeep(initialState[key]);
            }
        },
    }
});

export const { setAllSizes, setProduct, updateProduct, removeProduct } = productSlice.actions;

export const productReducer = productSlice.reducer;