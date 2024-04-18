const burgerVariations = require("./variations/burger-variations")
const beilagenVariations = require("./variations/beilagen-variations")

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
        price: 18.9,
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
        id: "classic-menu",
        name: "Classic Menu",
        description: "Bodenständiger und kleine Portion Supper Dipperfrites",
        price: 20,
        variations: burgerVariations,
        parent: "burger"
    },
    {
        id: "handwerker-menu",
        name: "Handwerker Menu",
        description: "Handwerker und kleine Portion Supper Dipperfrites",
        price: 25,
        variations: burgerVariations,
        parent: "burger"
    },
    {
        id: "chili-cheese-habanero-veggie",
        name: "Chili-Cheese Habanero Veggie",
        description: "Hamburgerbrot mit Sesam, Rösti- Patties, Salat, Guacamole, Cheddar-Käse, Chili-Cheese Habanerossauce, Jalapeños",
        price: 25.9,
        variations: burgerVariations,
        parent: "veggie"
    },
    {
        id: "handwerker-veggie",
        name: "Handwerker Veggie",
        description: "Hamburgerbrot mit Sesam, Rösti-Patties, Zwiebelwürfel, 2x Cheddar-Käse, Salat und Cocktailsauce",
        price: 23.9,
        variations: burgerVariations,
        parent: "veggie"
    },
    {
        id: "krautergarten-veggie",
        name: "Kräutergarten Veggie",
        description: "Brot mit Sesam, Rösti- Patties, Rucola, Tomate, Walnüsse, karamellisierte Zwiebeln, Hirtenkäse, Honig-Senfsauce",
        price: 27.9,
        variations: burgerVariations,
        parent: "veggie"
    },
    {
        id: "bodenstandiger-veggie",
        name: "Bodenständiger (zum selber belegen) Veggie",
        description: "Brot mit Sesam, Rösti- Patties, Rucola, Tomate, Walnüsse, karamellisierte Zwiebeln, Hirtenkäse, Honig-Senfsauce",
        price: 18.9,
        variations: burgerVariations,
        parent: "veggie"
    },
    {
        id: "chili-cheese-habanero-xl",
        name: "Chili-Cheese Habanero XL",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Salat, Guacamole, Cheddar-Käse, Chili-Cheese Habanerossauce, Jalapeños",
        price: 33.4,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "crispy-chicken-xl",
        name: "Crispy Chicken XL",
        description: "Hamburgerbrot mit Sesam, Hähnchenbrust im knusprigem Cornflakesmantel, Salat, Zwiebelringe, Tomate und Curry-Mayo",
        price: 33.4,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "handwerker-xl",
        name: "Handwerker XL",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Zwiebelwürfel, 2x Cheddar-Käse, Salat und Cocktailsauce",
        price: 31.4,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "heimat-xl",
        name: "Heimat XL",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Rösti, Speck, Salat, Spiegelei, karamellisierte Zwiebeln, Knoblauchsauce",
        price: 39.4,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "hot-crispy-chicken-xl",
        name: "Hot Crispy Chicken XL",
        description: "Hot Crispy Chicken",
        price: 35.4,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "krautergarten-xl",
        name: "Kräutergarten XL",
        description: "Brot mit Sesam, Fleisch, Rucola, Tomate, Walnüsse, karamellisierte Zwiebeln, Hirtenkäse, Honig-Senfsauce",
        price: 35.4,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "neftenbacher-saisonal-xl",
        name: "Neftenbacher (saisona XLl)",
        description: "Hamburgerbrot mit Sesam, Schweizer Rindfleisch (140 g), Speck, Röstzwiebeln, Essiggurke, Salat, Barbecuesauce",
        price: 34.4,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "specktraum-xl",
        name: "Specktraum XL",
        description: "Brot mit Sesam, Fleisch, karamellisierte Zwiebeln, Rucola, Speckstreifen und Specksauce",
        price: 33.4,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "classic-menu-xl",
        name: "Classic Menu XL",
        description: "Bodenständiger und kleine Portion Supper Dipperfrites",
        price: 27.5,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "handwerker-menu-xl",
        name: "Handwerker Menu XL",
        description: "Handwerker und kleine Portion Supper Dipperfrites",
        price: 52.5,
        variations: burgerVariations,
        parent: "xl"
    },
    {
        id: "classic-menu",
        name: "Classic Menu",
        description: "Bodenständiger und kleine Supper Dipperfrites",
        price: 20,
        variations: burgerVariations,
        parent: "burger-menu"
    },
    {
        id: "handwerker-menu",
        name: "Handwerker Menu",
        description: "Handwerker und kleine Supper Dipperfrites",
        price: 25,
        variations: burgerVariations,
        parent: "burger-menu"
    },
    {
        id: "supper-dipperfrites",
        name: "Supper Dipperfrites",
        description: "",
        price: 8.9,
        variations: beilagenVariations,
        parent: "beilagen"
    },
    {
        id: "kleine-supper-dipperfrites",
        name: "Kleine Supper Dipperfrites",
        description: "",
        price: 5.5,
        variations: beilagenVariations,
        parent: "beilagen"
    },
    {
        id: "susskartoffelpommes",
        name: "Süsskartoffelpommes",
        description: "",
        price: 9.9,
        variations: beilagenVariations,
        parent: "beilagen"
    },
    {
        id: "kleine-portion-susskartoffelpommes",
        name: "Kleine Portion Süsskartoffelpommes",
        description: "",
        price: 6.5,
        variations: beilagenVariations,
        parent: "beilagen"
    },
    {
        id: "gemischter-gruner-salat",
        name: "gemischter Grüner Salat",
        description: "",
        price: 8.5,
        variations: beilagenVariations,
        parent: "beilagen"
    },
    {
        id: "rostipommes",
        name: "Röstipommes",
        description: "",
        price: 10.9,
        variations: beilagenVariations,
        parent: "beilagen"
    },
    {
        id: "kleine-portion-rostipommes",
        name: "Kleine Portion Röstipommes",
        description: "",
        price: 7.5,
        variations: beilagenVariations,
        parent: "beilagen"
    },
    {
        id: "honig-senf",
        name: "Honig-Senf",
        description: "",
        price: 3.5,
        variations: [],
        parent: "saucen"
    },
    {
        id: "knoblauch",
        name: "Knoblauch",
        description: "",
        price: 3.5,
        variations: [],
        parent: "saucen"
    },
    {
        id: "leicht-scharfe-barbecue",
        name: "leicht scharfe Barbecue",
        description: "",
        price: 3.5,
        variations: [],
        parent: "saucen"
    },
    {
        id: "Cocktail",
        name: "Cocktail",
        description: "",
        price: 3.5,
        variations: [],
        parent: "saucen"
    },
    {
        id: "guacamole",
        name: "Guacamole",
        description: "",
        price: 3.5,
        variations: [],
        parent: "saucen"
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
        variations: burgerVariations,
        parent: "hahnchen"
    },
    {
        id: "crispy-chicken-mit-scharfer",
        name: "Crispy Chicken (CH) mit scharfer Devil-Sauce",
        description: "Hamburgerbrot mit Sesam, Hähnchenbrust im knusprigem Cornflakesmantel, Salat, Zwiebelringe und Tomate",
        price: 27.9,
        variations: burgerVariations,
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
    {
        id: "nusstraum",
        name: "Nusstraum",
        description: "grüner Blattsalat, Nüsse & Kerne, Blüten und Honig-Senfdressing",
        price: 17.9,
        variations: [],
        parent: "salat"
    },
    {
        id: "sonnengruss",
        name: "Sonnengruss",
        description: "grüner Blattsalat, Mozzarella, Tomaten Rucola und Granatapfeldressing",
        price: 15.9,
        variations: [],
        parent: "salat"
    },
    {
        id: "apfelbaum-vegan",
        name: "Apfelbaum Vegan",
        description: "grüner Blattsalat, Äpfel, Sonnenblumenkerne Granatapfeldressing",
        price: 14.9,
        variations: [],
        parent: "salat"
    },
    {
        id: "rostisalat",
        name: "Röstisalat",
        description: "grüner Blattsalat, Walnuss, Blüten/Kerne und Röstisticks-Senfdressing",
        price: 16.9,
        variations: [],
        parent: "salat"
    },
    {
        id: "nusstraum-vorspeise",
        name: "Nusstraum (Vorspeise)",
        description: "grüner Blattsalat, Nüsse & Kerne, Blüten und Honig-Senfdressing",
        price: 11.5,
        variations: [],
        parent: "vorspeisen"
    },
    {
        id: "sonnengruss-vorspeise",
        name: "Sonnengruss (Vorspeise)",
        description: "grüner Blattsalat, Mozzarella, Tomaten Rucola und Granatapfeldressing",
        price: 9.5,
        variations: [],
        parent: "vorspeisen"
    },
    {
        id: "apfelbaum-vegan-vorspeise",
        name: "Apfelbaum Vegan (Vorspeise)",
        description: "grüner Blattsalat, Äpfel, Sonnenblumenkerne Granatapfeldressing",
        price: 8.5,
        variations: [],
        parent: "vorspeisen"
    },
    {
        id: "rostisalat-vorspeise",
        name: "Röstisalat (Vorspeise)",
        description: "grüner Blattsalat, Walnuss, Blüten/Kerne und Röstisticks-Senfdressing",
        price: 10.5,
        variations: [],
        parent: "vorspeisen"
    },
    {
        id: "tortilla-chips-mit-zwei-dips",
        name: "Tortilla-Chips mit zwei Dips",
        description: "Mais-Chips mit einem Avocado- und Salsadip",
        price: 12.5,
        variations: [],
        parent: "vorspeisen"
    },
    {
        id: "gruner-blattsalat",
        name: "grüner Blattsalat",
        description: "gemischter grüner Salat hausgemachtes Honig-Senf Dressing",
        price: 8.5,
        variations: [],
        parent: "vorspeisen"
    },
    {
        id: "nachos-mit-zwei-dips",
        name: "Nachos mit zwei Dips",
        description: "Mais-Chips überbacken mit Cheddar-Käse, Avocadodip und Salsa",
        price: 17.5,
        variations: [],
        parent: "vorspeisen"
    },
    {
        id: "fischburger",
        name: "Fischburger",
        description: "Hamburgerbrot, Seelachs paniert, Zwiebel, Tomate und Salat hausgemachte Tartarsauce",
        price: 24.9,
        variations: burgerVariations,
        parent: "fisch"
    },
    {
        id: "fischersfritz",
        name: "Fischersfritz",
        description: "Kibberlinge paniert, glasierte Kartoffeln und Karotten, Salat hausgemachte Tartar-Sauce",
        price: 26.9,
        variations: burgerVariations,
        parent: "fisch"
    },
    {
        id: "ketchupmonster",
        name: "Ketchupmonster",
        description: "Hamburgerbrot, hausgemachtes Rind-Pattie 90g, Ketchup",
        price: 12.9,
        variations: [],
        parent: "kinder"
    },
    {
        id: "kaseburger",
        name: "Käseburger",
        description: "Hamburgerbrot, hausgemachtes Rind-Pattie 90g, Cheddar Ketchup",
        price: 14.9,
        variations: [],
        parent: "kinder"
    },
    {
        id: "schnippoburger",
        name: "Schnippoburger",
        description: "Hamburgerbrot, Pouletschnitzel paniert Cocktailsaucep",
        price: 13.9,
        variations: [],
        parent: "kinder"
    },
    {
        id: "chicken-nuggets-mit-dipperfries",
        name: "Chicken-Nuggets mit Dipperfries",
        description: "Chicken-Nuggets aus Pouletfleisch mit Dipper-Frites",
        price: 16.9,
        variations: [],
        parent: "kinder"
    },
    {
        id: "mineralwasser-3dl",
        name: "MINERALWASSER 3DL",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "mineralwasser-5dl",
        name: "MINERALWASSER 5DL",
        description: "",
        price: 4.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "kohlensaure-3dl",
        name: "Kohlensäure 3DL",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "kohlensaure-5dl",
        name: "Kohlensäure 5DL",
        description: "",
        price: 4.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "coca-cola-3dl",
        name: "COCA-COLA 3DL",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "coca-cola-5dl",
        name: "COCA-COLA 5DL",
        description: "",
        price: 4.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "eistee-lemon-3dl",
        name: "EISTEE LEMON 3DL",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "eistee-lemon-5dl",
        name: "EISTEE LEMON 5DL",
        description: "",
        price: 4.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "eistee-peache-3dl",
        name: "EISTEE PEACHE 3DL",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "eistee-peache-5dl",
        name: "EISTEE PEACHE 5DL",
        description: "",
        price: 4.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "fanta-3dl",
        name: "FANTA 3DL",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "fanta-5dl",
        name: "FANTA 5DL",
        description: "",
        price: 4.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "fanta-mango-3dl",
        name: "FANTA MANGO 3DL",
        description: "",
        price: 4.5,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "fanta-mango-5dl",
        name: "FANTA MANGO 5DL",
        description: "",
        price: 5.5,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "sprite-3dl",
        name: "SPRITE 3DL",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "sprite-5dl",
        name: "SPRITE 5DL",
        description: "",
        price: 4.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "rivella-rot-3dl",
        name: "RIVELLA ROT 3DL",
        description: "",
        price: 4.5,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "rivella-rot-5dl",
        name: "RIVELLA ROT 5DL",
        description: "",
        price: 5.5,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "uludag-limonade",
        name: "ULUDAG LIMONADE",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "uludag-orange-fanta",
        name: "ULUDAG ORANGE (FANTA)",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "capri-sun-3dl",
        name: "CAPRI-SUN 3DL",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "matee-3dl",
        name: "MATEE 3DL",
        description: "",
        price: 5.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "fanta-exotic-3dl",
        name: "FANTA EXOTIC 3DL",
        description: "",
        price: 3.9,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "apfelschorle-3dl",
        name: "APFELSCHORLE 3DL",
        description: "",
        price: 4.5,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "apfelschorle-5dl",
        name: "APFELSCHORLE 5DL",
        description: "",
        price: 5.5,
        variations: [],
        parent: "durstloscher"
    },
    {
        id: "hugo-2.5dl",
        name: "HUGO 2.5DL",
        description: "",
        price: 12,
        variations: [],
        parent: "spritziges-alkoholisch"
    },
    {
        id: "aperol-spritz-2.5dl",
        name: "APEROL SPRITZ 2.5DL",
        description: "",
        price: 12,
        variations: [],
        parent: "spritziges-alkoholisch"
    },
    {
        id: "campari-spritz-2.5dl",
        name: "CAMPARI SPRITZ 2.5DL",
        description: "",
        price: 12,
        variations: [],
        parent: "spritziges-alkoholisch"
    },
    {
        id: "weisswein-spritz-suss-2.5dl",
        name: "Weisswein spritz Süss 2.5DL",
        description: "",
        price: 8.5,
        variations: [],
        parent: "spritziges-alkoholisch"
    },
    {
        id: "weisswein-spritz-sauer-2.5dl",
        name: "Weisswein spritz Sauer 2.5DL",
        description: "",
        price: 8.5,
        variations: [],
        parent: "spritziges-alkoholisch"
    },
    {
        id: "amaretto-sauer-2.5dl",
        name: "Amaretto Sauer 2.5DL",
        description: "",
        price: 13.9,
        variations: [],
        parent: "spritziges-alkoholisch"
    },
    {
        id: "gin-tonic-2.5dl",
        name: "Gin Tonic 2.5DL",
        description: "",
        price: 13.9,
        variations: [],
        parent: "spritziges-alkoholisch"
    },
    {
        id: "espresso-martini-2.5dl",
        name: "Espresso Martini 2.5DL",
        description: "",
        price: 13.9,
        variations: [],
        parent: "spritziges-alkoholisch"
    },
    {
        id: "whysky-sauer-2.5dl",
        name: "whysky Sauer 2.5DL",
        description: "",
        price: 13.9,
        variations: [],
        parent: "spritziges-alkoholisch"
    },
    {
        id: "aufmunterung-2.5dl",
        name: "AUFMUNTERUNG 2.5DL",
        description: "Vermouth, Cava, Mineral und Berry Schweppes mit Beeren",
        price: 13.9,
        variations: [],
        parent: "spritziges-alkoholisch"
    },
    {
        id: "apfelboom-5dl",
        name: "Apfelboom 5DL",
        description: "Apfelsaft, Mineral, Citronensaft",
        price: 7.9,
        variations: [],
        parent: "spritziges-alkoholfrei"
    },
    {
        id: "tropicalflash-5dl",
        name: "Tropicalflash 5DL",
        description: "frischer Orangensaft, Mangofanta, Mineral",
        price: 7.9,
        variations: [],
        parent: "spritziges-alkoholfrei"
    },
    {
        id: "sauerbauer-5dl",
        name: "SAUERBAUER 5DL",
        description: "Mineral, Sirup, Limettensaft",
        price: 7.9,
        variations: [],
        parent: "spritziges-alkoholfrei"
    },
    {
        id: "saxer-neftenbach-7.5sl",
        name: "Saxer Neftenbach 7.5DL",
        description: "(Nobler Blauer, der Besondere) - Schweiz",
        price: 52,
        variations: [],
        parent: "weine-rot"
    },
    {
        id: "resalte-vendimia-ribera-duero-7.5dl",
        name: "Resalte Vendimia Seleccionada Ribera del Duero 7.5DL",
        description: "Spanien",
        price: 48,
        variations: [],
        parent: "weine-rot"
    },
    {
        id: "coto-de-imaz-reserva-rioja",
        name: "Coto de Imaz Reserva Rioja 7.5DL",
        description: "Spanien",
        price: 45,
        variations: [],
        parent: "weine-rot"
    },
    {
        id: "kaiken-reserva-cabernet-sauv-mendoza-7.5dl",
        name: "Kaiken Reserva Cabernet Sauvignon Mendoza..7.5DL",
        description: "Argentinien",
        price: 42,
        variations: [],
        parent: "weine-rot"
    },
    {
        id: "ojo-de-agua",
        name: "Ojo de Agua 7.5DL",
        description: "Argentinien",
        price: 45,
        variations: [],
        parent: "weine-rot"
    },
    {
        id: "puglia-primitivo-massaro-7.5dl",
        name: "Puglia IGT Primitivo Massaro 7.5DL",
        description: "",
        price: 45,
        variations: [],
        parent: "weine-rot"
    },
    {
        id: "puglia-primitivo-massaro-1.0dl",
        name: "Puglia IGT Primitivo Massaro 1.0DL",
        description: "",
        price: 7.9,
        variations: [],
        parent: "weine-rot"
    },
    {
        id: "stadtwein-rieslig-silvaner",
        name: "Stadtwein Rieslig Silvaner",
        description: "Schweiz",
        price: 45,
        variations: [],
        parent: "weine-weiss"
    },
    {
        id: "ojo-de-agua-torrontes-7.5dl",
        name: "Ojo de Agua Torrontes 7.5DL",
        description: "Argentinien",
        price: 42,
        variations: [],
        parent: "weine-weiss"
    },
    {
        id: "ojo-de-agua-torrontes-1.0dl",
        name: "Ojo de Agua Torrontes 1.0DL",
        description: "Argentinien",
        price: 6.9,
        variations: [],
        parent: "weine-weiss"
    },
    {
        id: "appenzeller-3dl",
        name: "APPENZELLER 3DL",
        description: "",
        price: 4.9,
        variations: [],
        parent: "bier"
    },
    {
        id: "appenzeller-5dl",
        name: "APPENZELLER 5DL",
        description: "",
        price: 6.9,
        variations: [],
        parent: "bier"
    },
    {
        id: "appenzeller-weizenbier-5dl",
        name: "APPENZELLER WEIZENBIER 5DL",
        description: "",
        price: 6.9,
        variations: [],
        parent: "bier"
    },
    {
        id: "appenzeller-alkoholfrei-33cl",
        name: "APPENZELLER ALKOHOLFREI 33CL",
        description: "",
        price: 4.5,
        variations: [],
        parent: "bier"
    },
    {
        id: "erdinger-dunkel-5dl",
        name: "ERDINGER (DUNKEL) 5DL",
        description: "Dunkel",
        price: 6.9,
        variations: [],
        parent: "bier"
    },
    {
        id: "corona-33cl",
        name: "CORONA 33CL",
        description: "",
        price: 6.9,
        variations: [],
        parent: "bier"
    },
    {
        id: "superbock-33cl",
        name: "SUPERBOCK 33cl",
        description: "",
        price: 4.5,
        variations: [],
        parent: "bier"
    },
    {
        id: "mohl-5dl",
        name: "MÖHL 5DL",
        description: "Apfelwein trüb mit oder ohne bier",
        price: 6.9,
        variations: [],
        parent: "bier"
    },
    {
        id: "mohl-alkoholfrei-5dl",
        name: "MÖHL Alkoholfrei 5DL",
        description: "Apfelwein trüb mit oder ohne bier",
        price: 6.9,
        variations: [],
        parent: "bier"
    },
    {
        id: "panache-sweet-3dl",
        name: "Panache Sweet 3DL",
        description: "",
        price: 4.5,
        variations: [],
        parent: "bier"
    },
    {
        id: "panache-sour-3dl",
        name: "Panache Sour 3DL",
        description: "",
        price: 4.5,
        variations: [],
        parent: "bier"
    },
    {
        id: "panache-sweet-5dl",
        name: "Panache Sweet 5DL",
        description: "",
        price: 6.9,
        variations: [],
        parent: "bier"
    },
    {
        id: "panache-sour-5dl",
        name: "Panache Sour 5DL",
        description: "",
        price: 6.9,
        variations: [],
        parent: "bier"
    },
    {
        id: "brownie-vanilleeis",
        name: "Brownie + Vanilleis",
        description: "",
        price: 12.5,
        parent: "dessert"
    },
    {
        id: "lava-vanilleeis",
        name: "Lava + Vanilleis",
        description: "",
        price: 12.5,
        parent: "dessert"
    },
    {
        id: "kleine-kuchen",
        name: "kleine Kuchen",
        description: "",
        price: 6.5,
        parent: "dessert"
    },
    {
        id: "grosse-kuchen",
        name: "grosse Kuchen",
        description: "",
        price: 9.5,
        parent: "dessert"
    },
    {
        id: "eiscream",
        name: "Eiscream",
        description: "",
        price: 3.50,
        variations: [
            {
                id: "taste",
                name: "Taste",
                options: [
                    {
                        id: "erdbeere",
                        name: "Erdbeere",
                        price: 0,
                        parent: "taste"
                    },
                    {
                        id: "vanille",
                        name: "Vanille",
                        price: 0,
                        parent: "taste"
                    },
                    {
                        id: "schokolade",
                        name: "Schokolade",
                        price: 0,
                        parent: "taste"
                    },
                    {
                        id: "sonstiges",
                        name: "Sonstiges",
                        price: 0,
                        parent: "taste"
                    },
                ]
            }
        ],
        parent: "dessert"
    },
    {
        id: "espresso",
        name: "Espresso",
        description: "",
        price: 4,
        parent: "kaffe"
    },
    {
        id: "dopio",
        name: "Dopio",
        description: "",
        price: 5.5,
        parent: "kaffe"
    },
    {
        id: "kaffeecreme",
        name: "Kaffeecreme",
        description: "",
        price: 4.5,
        parent: "kaffe"
    },
    {
        id: "capuccino",
        name: "Capuccino",
        description: "",
        price: 5.5,
        parent: "kaffe"
    },
    {
        id: "special",
        name: "Special",
        description: "",
        price: 6.5,
        parent: "kaffe"
    },
    {
        id: "tee",
        name: "Tee",
        description: "",
        price: 4.5,
        parent: "kaffe"
    },
    {
        id: "schoko",
        name: "Schoko",
        description: "",
        price: 5.5,
        parent: "kaffe"
    },
]