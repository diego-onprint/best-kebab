export const formatVariations = (variations) => {

    const formatedVariations = []

    // Group variations by its parent name
    variations.map(variation => {

        //Get the parent name, if it doesnt exist yet, push it as new
        const index = formatedVariations.findIndex(formatedVariation => formatedVariation.name === variation.attributes[0].name)

        if (index === -1) {

            //Set the parent and the first child
            formatedVariations.push({ 
                name: variation.attributes[0].name,
                options: [{
                    id: variation.id,
                    parent: variation.attributes[0].name,
                    name: variation.name,
                    price: variation.price,
                    description: variation.description,
                }]
            })
        } else {

            //Set new child for old parent
            formatedVariations[index].options = [ 
                ...formatedVariations[index].options, {
                    id: variation.id,
                    parent: variation.attributes[0].name,
                    name: variation.name,
                    price: variation.price,
                    description: variation.description,
                }
            ]
        }
    })

    return formatedVariations
}