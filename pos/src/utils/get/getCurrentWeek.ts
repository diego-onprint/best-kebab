export const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const firstDayOfWeek = new Date(today); // Start with today's date
    const lastDayOfWeek = new Date(today); // Start with today's date

    // Calculate the date of the Monday of the current week
    firstDayOfWeek.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    // Calculate the date of the Sunday of the current week
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    // Format dates as "yyyy-mm-dd"
    const startDate = formatDate(firstDayOfWeek);
    const endDate = formatDate(lastDayOfWeek);

    return { startDate, endDate };
}

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}