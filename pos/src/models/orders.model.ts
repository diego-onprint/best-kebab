/*
 * Takeaway orders schema:
 * {
 *      id: <orderId>
 *      name: <orderId> // With this build the name on View "Takeaway order #10"
 *      cart: {
 *          products: [] 
 *          total: string
 *      }
 *      customerData: {
 *          name: string
 *          surname: string
 *          address: string
 *          city: string
 *          postcode: string
 *          notes: string
 *      }
 * } 
*/

export const OrdersEmptyState = [
    {
        id: -1,
        isNewOrder: true,
        cart: { products: [], total: "0" },
        name: "New Takeaway Order"
    },
    {
        id: 911,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Salon 1"
    },
    {
        id: 912,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Salon 2"
    },
    {
        id: 913,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Salon 3"
    },
    {
        id: 914,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Salon 4"
    },
    {
        id: 915,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Salon 5"
    },
    {
        id: 916,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Salon 6"
    },
    {
        id: 917,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Salon 7"
    },
    {
        id: 918,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 4,
        name: "Salon 8"
    },
    {
        id: 951,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 4,
        name: "Terrase 9"
    },
    {
        id: 952,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 5,
        name: "Terrase 10"
    },
    {
        id: 953,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Terrase 11",
    },
    {
        id: 954,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Terrase 12",
    },
    {
        id: 955,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Terrase 13",
    },
    {
        id: 956,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Terrase 14",
    },
    {
        id: 957,
        isTable: true,
        cart: { products: [], total: "0" },
        capacity: 2,
        name: "Terrase 15",
    },
]