export const formatDateAndTime = (date) => {
    const dt = new Date(date);
    const day = String(dt.getUTCDate()).padStart(2, '0')
    const month = String(dt.getUTCMonth() + 1).padStart(2, '0') 
    // const year = String(dt.getUTCFullYear()).slice(-2) // Get last two digits of the year
    const hour = String(dt.getUTCHours()).padStart(2, '0')
    const minutes = String(dt.getUTCMinutes()).padStart(2, '0')
    
    return `${day}.${month} (${hour}:${minutes})`
  }