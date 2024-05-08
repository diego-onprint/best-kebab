export const urlSearchParamsToObject = (searchParams) => {
    const paramsObject = Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    return paramsObject
}