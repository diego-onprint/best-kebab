module.exports = [
    {
        id: "bier",
        name: "Bier",
        parent: "pos",
    },
    {
        id: "durstloscher",
        name: "Durstlöscher",
        parent: "pos",
    },
    {
        id: "spritziges",
        name: "Spritziges",
        parent: "pos",
        subcategories: true,
    },
    {
        id: "spritziges-alkoholisch",
        name: "Alkoholisch",
        parent: "spritziges",
    },
    {
        id: "spritziges-alkoholfrei",
        name: "Alkoholfrei",
        parent: "spritziges",
    },
    {
        id: "weine",
        name: "Weine",
        parent: "pos",
        subcategories: true,
    },
    {
        id: "weine-rot",
        name: "Rot",
        parent: "weine",
    },
    {
        id: "weine-weiss",
        name: "Weiss",
        parent: "weine",
    },
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
        id: "fisch",
        name: "Fisch",
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
    },
    {
        id: "kinder",
        name: "Kinder",
        parent: "pos",
    },
]