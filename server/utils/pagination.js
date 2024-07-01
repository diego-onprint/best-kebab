export const pagination = (data, page, limit) => {
    const res = {}
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    if (endIndex < data.length) {
        res.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        res.prev = {
            page: page - 1,
            limit: limit
        }
    }

    res.results = data.slice(startIndex, endIndex)

    return res
}