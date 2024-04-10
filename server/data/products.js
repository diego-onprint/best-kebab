const burgerVariations = require("./variations/burger-variations")

module.exports = [
    {
        id: "chili-cheese-habanero-rosti",
        name: "Chili-Cheese Habanero Rösti",
        description: "Hamburgerbrot mit Sesam, Rösti- Patties, Salat, Guacamole, Cheddar-Käse, Chili-Cheese Habanerossauce, Jalapeños",
        price: 25.9,
        variations: burgerVariations,
        parent: "rosti"
    },
    {
        id: "handwerker-rosti",
        name: "Handwerker Rösti",
        description: "Hamburgerbrot mit Sesam, Rösti- Patties, Zwiebelwürfel, 2x Cheddar-Käse, Salat und Cocktailsauce",
        price: 23.9,
        variations: burgerVariations,
        parent: "rosti"
    },
    {
        id: "krautergarten-rosti",
        name: "Kräutergarten Rösti",
        description: "Brot mit Sesam, Rösti- Patties, Rucola, Tomate, Walnüsse, karamellisierte Zwiebeln, Hirtenkäse, Honig-Senfsauce",
        price: 27.9,
        variations: burgerVariations,
        parent: "rosti"
    },
    {
        id: "bodenstandiger-rosti",
        name: "Bodenständiger (zum selber belegen) Rösti",
        description: "Brot mit Sesam, Rösti- Patties, Rucola, Tomate, Walnüsse, karamellisierte Zwiebeln, Hirtenkäse, Honig-Senfsauce",
        price: 27.9,
        variations: burgerVariations,
        parent: "rosti"
    },
    {
        id: "chili-cheese-habanero",
        name: "Chili-Cheese Habanero",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Salat, Guacamole, Cheddar-Käse, Chili-Cheese Habanerossauce, Jalapeños",
        price: 25.9,
        variations: burgerVariations,
        parent: "burger"
    },
    {
        id: "crispy-chicken",
        name: "Crispy Chicken",
        description: "Hamburgerbrot mit Sesam, Hähnchenbrust im knusprigem Cornflakesmantel, Salat, Zwiebelringe, Tomate und Curry-Mayo",
        price: 26.9,
        variations: burgerVariations,
        parent: "burger"
    },
    {
        id: "handwerker",
        name: "Handwerker",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Zwiebelwürfel, 2x Cheddar-Käse, Salat und Cocktailsauce",
        price: 23.9,
        variations: burgerVariations,
        parent: "burger"
    },
    {
        id: "heimat",
        name: "Heimat",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Rösti, Speck, Salat, Spiegelei, karamellisierte Zwiebeln, Knoblauchsauce",
        price: 31.9,
        variations: burgerVariations,
        parent: "burger"
    },
    {
        id: "hot-crispy-chicken",
        name: "Hot Crispy Chicken",
        description: "Hot Crispy Chicken",
        price: 27.9,
        variations: burgerVariations,
        parent: "burger"
    },
    {
        id: "krautergarten",
        name: "Kräutergarten",
        description: "Brot mit Sesam, Fleisch, Rucola, Tomate, Walnüsse, karamellisierte Zwiebeln, Hirtenkäse, Honig-Senfsauce",
        price: 27.9,
        variations: burgerVariations,
        parent: "burger"
    },
    {
        id: "neftenbacher-saisonal",
        name: "Neftenbacher (saisonal)",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Speck, Röstzwiebeln, Essiggurke, Salat, Barbecuesauce",
        price: 26.9,
        variations: burgerVariations,
        parent: "burger"
    },
    {
        id: "specktraum",
        name: "Specktraum",
        description: "Brot mit Sesam, Fleisch, karamellisierte Zwiebeln, Rucola, Speckstreifen und Specksauce",
        price: 25.9,
        variations: burgerVariations,
        parent: "burger"
    },
    {
        id: "chili-cheese-habanero-veggie",
        name: "Chili-Cheese Habanero Veggie",
        description: "Hamburgerbrot mit Sesam, Veggie-Pattie aus Couscous und Gemüse, Salat, Guacamole, Cheddar-Käse, Chili-Cheese Habanerossauce, Jalapeños",
        price: 29.4,
        variations: burgerVariations,
        parent: "veggie"
    },
    {
        id: "krautergarten-veggie",
        name: "Kräutergarten Veggie",
        description: "Brot mit Sesam, Veggie-Pattie aus Couscous und Gemüse,  Rucola, Tomate, Walnüsse, karamellisierte Zwiebeln, Honig-Senfsauce",
        price: 31.4,
        variations: burgerVariations,
        parent: "veggie"
    },
    {
        id: "handwerker-veggie",
        name: "Handwerker Veggie",
        description: "Hamburgerbrot mit Sesam, Veggie-Pattie aus Couscous und Gemüse, Zwiebelwürfel, 2x Cheddar-Käse, Salat und Cocktailsauce",
        price: 27.4,
        variations: burgerVariations,
        parent: "veggie"
    },
    {
        id: "chili-cheese-habanero-xl",
        name: "Chili-Cheese Habanero XL",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Salat, Guacamole, Cheddar-Käse, Chili-Cheese Habanerossauce, Jalapeños",
        price: 25.9,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "handwerker-xl",
        name: "Handwerker XL",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Zwiebelwürfel, 2x Cheddar-Käse, Salat und Cocktailsauce",
        price: 23.9,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "heimat-xl",
        name: "Heimat XL",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Rösti, Speck, Salat, Spiegelei, karamellisierte Zwiebeln, Knoblauchsauce",
        price: 31.9,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "krautergarten-xl",
        name: "Kräutergarten XL",
        description: "Brot mit Sesam, Fleisch, Rucola, Tomate, Walnüsse, karamellisierte Zwiebeln, Hirtenkäse, Honig-Senfsauce",
        price: 27.9,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "neftenbacher-saisonal-xl",
        name: "Neftenbacher (saisonal) XL",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Speck, Röstzwiebeln, Essiggurke, Salat, Barbecuesauce",
        price: 26.9,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "specktraum-xl",
        name: "Specktraum XL",
        description: "Brot mit Sesam, Fleisch, karamellisierte Zwiebeln, Rucola, Speckstreifen und Specksauce",
        price: 25.9,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "quesadillas-veggie",
        name: "Quesadillas Veggie",
        description: "Knusprige Tortilla, Bohnen oder Hähnchen, Cheddar, Tomatensalsa, Guacamole, Salat und Sauerrahmdip",
        price: 18.9,
        variations: [
            {
                id: "addon",
                name: "Addon",
                options: [
                    {
                        id: "mit-jalapenos",
                        name: "Jalapenos (scharf)",
                        price: 2,
                        parent: "addon"
                    },
                    {
                        id: "hahnchen",
                        name: "Hähnchen",
                        price: 3.5,
                        parent: "addon"
                    },
                ]
            }
        ],
        parent: "hahnchen"
    },
    {
        id: "quesadillas-veggie-grosse",
        name: "Quesadillas Veggie (grosse Portion)",
        description: "Knusprige Tortilla, Bohnen oder Hähnchen, Cheddar, Tomatensalsa, Guacamole, Salat und Sauerrahmdip",
        price: 23.9,
        variations: [
            {
                id: "addon",
                name: "Addon",
                options: [
                    {
                        id: "mit-jalapenos",
                        name: "Jalapenos (scharf)",
                        price: 2,
                        parent: "addon"
                    },
                    {
                        id: "hahnchen",
                        name: "Hähnchen",
                        price: 3.5,
                        parent: "addon"
                    },
                ]
            }
        ],
        parent: "hahnchen"
    },
    {
        id: "crispy-chicken-mit-currysauce",
        name: "Crispy Chicken (CH) mit Currysauce",
        description: "Hamburgerbrot mit Sesam, Hähnchenbrust im knusprigem Cornflakesmantel, Salat, Zwiebelringe und Tomate",
        price: 26.9,
        variations: [],
        parent: "hahnchen"
    },
    {
        id: "crispy-chicken-mit-scharfer",
        name: "Crispy Chicken (CH) mit scharfer Devil-Sauce",
        description: "Hamburgerbrot mit Sesam, Hähnchenbrust im knusprigem Cornflakesmantel, Salat, Zwiebelringe und Tomate",
        price: 27.9,
        variations: [],
        parent: "hahnchen"
    },
    {
        id: "ch-pouletflugeli-x6-scharfer",
        name: "CH-Pouletflügeli x6 in scharfer Barbecue-Marinade",
        description: "",
        price: 16.9,
        variations: [
            {
                id: "addon",
                name: "Addon",
                options: [
                    {
                        id: "mit-pommes",
                        name: "mit Pommes",
                        price: 4.5,
                        parent: "addon"
                    }
                ]
            }
        ],
        parent: "hahnchen"
    },
    {
        id: "ch-pouletflugeli-x9-scharfer",
        name: "CH-Pouletflügeli x9 in scharfer Barbecue-Marinade",
        description: "",
        price: 20.9,
        variations: [
            {
                id: "addon",
                name: "Addon",
                options: [
                    {
                        id: "mit-pommes",
                        name: "mit Pommes",
                        price: 4.5,
                        parent: "addon"
                    }
                ]
            }
        ],
        parent: "hahnchen"
    },
    {
        id: "ch-pouletflugeli-x6-krauter",
        name: "CH-Pouletflügeli x6 in Kräuter-Gewürzmischung",
        description: "",
        price: 15.9,
        variations: [
            {
                id: "addon",
                name: "Addon",
                options: [
                    {
                        id: "mit-pommes",
                        name: "mit Pommes",
                        price: 4.5,
                        parent: "addon"
                    }
                ]
            }
        ],
        parent: "hahnchen"
    },
    {
        id: "ch-pouletflugeli-x9-krauter",
        name: "CH-Pouletflügeli x9 in Kräuter-Gewürzmischung",
        description: "",
        price: 19.9,
        variations: [
            {
                id: "addon",
                name: "Addon",
                options: [
                    {
                        id: "mit-pommes",
                        name: "mit Pommes",
                        price: 4.5,
                        parent: "addon"
                    }
                ]
            }
        ],
        parent: "hahnchen"
    },
]