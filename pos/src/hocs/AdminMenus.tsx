/*
    TODO lazy import menus
*/

import { useSelector } from "react-redux"
import AddProductMenu from "../components/admin/product_menu/AddProductMenu"
import EditProductMenu from "../components/admin/edit_product_menu/EditProductMenu"
import EditCategoryMenu from "../components/admin/edit_category_menu/EditCategoryMenu"
import type { RootState } from "../store/store"

const AdminMenus = () => {

    const menus = useSelector<RootState>(state => state.menus)

    if (menus.addProductMenu) return <AddProductMenu />
    if (menus.editProductMenu.open) return <EditProductMenu />
    if (menus.editCategoryMenu) return <EditCategoryMenu />
}

export default AdminMenus