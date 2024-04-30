import type { Order } from "../types";

export const CurrentOrderModel: Order = {
    id: "",
    data: {
        name: "",
        cart: {
            products: [],
            total: 0,
        }
    },
}