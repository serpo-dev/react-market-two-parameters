import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
    count: 0,
    items: [],
};

export const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        updateItems: (state, action) => {
            state.count = action.payload.length;
            state.items = _.cloneDeep(action.payload);
        },
        deleteItems: (state) => {
            for (const key in initialState) {
                state[key] = _.cloneDeep(initialState[key]);
            }
        },
    }
});

export const { updateItems, deleteItems } = listSlice.actions;

export const listReducer = listSlice.reducer;