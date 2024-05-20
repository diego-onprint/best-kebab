import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    checkoutMenu: false,
    customProductMenu: false,
}

export const menusSlice = createSlice({
    name: "menus",
    initialState,
    reducers: {
        setCheckoutMenu: (state, action: PayloadAction<boolean>) => {
            state.checkoutMenu = action.payload
        },
        setCustomProductMenu: (state, action: PayloadAction<boolean>) => {
            state.customProductMenu = action.payload
        }
    }
})

export const { 
    setCheckoutMenu,
    setCustomProductMenu,
} = menusSlice.actions