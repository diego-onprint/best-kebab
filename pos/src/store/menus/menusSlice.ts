/*
    TODO delete customProductMenu
*/

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    checkoutMenu: false,
    customProductMenu: false,
    editCategoryMenu: false,
    addProductMenu: false,
    editProductMenu: {
        open: false,
        productId: null,
    },
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
        },
        setEditCategoryMenu: (state, action: PayloadAction<boolean>) => {
            state.editCategoryMenu = action.payload
        },
        setAddProductMenu: (state, action: PayloadAction<boolean>) => {
            state.addProductMenu = action.payload
        },
        setEditProductMenu: (state, action) => {
            state.editProductMenu = action.payload
        }
    }
})

export const { 
    setCheckoutMenu,
    setCustomProductMenu,
    setEditCategoryMenu,
    setAddProductMenu,
    setEditProductMenu,
} = menusSlice.actions