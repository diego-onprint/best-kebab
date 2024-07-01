export const getLastYearDates = () => {
    const today = new Date();
    const firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
    const lastDayOfLastYear = new Date(today.getFullYear() - 1, 11, 31);

    // Format dates as "yyyy-mm-dd"
    const firstDay = formatDate(firstDayOfLastYear);
    const lastDay = formatDate(lastDayOfLastYear);

    return { firstDay, lastDay };
}

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}