export const generateSlug = (inputString) => {
    // Normalize the string to decompose accented characters into their base characters
    const normalizedString = inputString.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
    // Replace special characters with a dash, convert to lowercase, and replace spaces with dashes
    const slug = normalizedString
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters except alphanumeric, spaces, and dashes
      .toLowerCase()                   // Convert to lowercase
      .trim()                          // Trim leading and trailing spaces
      .replace(/\s+/g, '-')            // Replace spaces with dashes
      .replace(/-+/g, '-')           // Replace multiple dashes with a single dash
  
    return slug
  }