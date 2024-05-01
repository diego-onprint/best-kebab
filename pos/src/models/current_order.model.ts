import type { Order } from "../types";
import { CustomerData } from "./customer_data.model";

export const CurrentOrderModel: Order = {
    id: "",
    data: {
        name: "",
        cart: {
            products: [],
            total: 0,
        },
        customerData: CustomerData,
    },
}