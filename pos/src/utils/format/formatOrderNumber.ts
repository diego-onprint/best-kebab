export const formatOrderNumber = (orderNumber: number) => {
    return String(orderNumber).padStart(4, '0');
}