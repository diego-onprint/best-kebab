export const getLastMonthDates = () => {
    const today = new Date();
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    // Format dates as "yyyy-mm-dd"
    const firstDay = formatDate(firstDayOfLastMonth);
    const lastDay = formatDate(lastDayOfLastMonth);

    return { firstDay, lastDay };
}

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}