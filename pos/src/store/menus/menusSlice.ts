import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    checkoutMenu: false,
}

export const menusSlice = createSlice({
    name: "menus",
    initialState,
    reducers: {
        setCheckoutMenu: (state, action: PayloadAction<boolean>) => {
            state.checkoutMenu = action.payload
        },
    }
})

export const { setCheckoutMenu } = menusSlice.actions