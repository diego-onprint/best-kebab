module.exports = [
    {
        id: "vorspeisen",
        name: "Vorspeisen",
        parent: "pos",
    },
    {
        id: "salat",
        name: "Salat",
        parent: "pos",
    },
    {
        id: "hahnchen",
        name: "Hähnchen",
        parent: "pos",
    },
    {
        id: "burgers",
        name: "Burgers",
        parent: "pos",
        subcategories: true,
    },
    {
        id: "rosti",
        name: "Rösti",
        parent: "burgers"
    },
    {
        id: "burger",
        name: "Burger",
        parent: "burgers"
    },
    {
        id: "veggie",
        name: "Veggie",
        parent: "burgers"
    },
    {
        id: "xl",
        name: "XL",
        parent: "burgers"
    }
]