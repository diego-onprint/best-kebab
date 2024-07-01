import { pool } from "../db/connection.js"

const findAllProducts = async () => {

    const query = `
        SELECT
            p.uid AS uid,
            p.id AS id,
            p.name AS name,
            p.description AS description,
            p.price AS price,
            p.parent AS parent,
            p.color AS color,
            p.image AS image,
            COALESCE(
                json_agg(
                    CASE
                        WHEN v.id IS NOT NULL THEN
                            jsonb_build_object(
                                'variation_id', v.id,
                                'variation_name', v.name,
                                'options', (
                                    SELECT json_agg(
                                        jsonb_build_object(
                                            'option_id', option_data ->> 'id',
                                            'option_name', option_data ->> 'name',
                                            'option_price', (option_data ->> 'price')::DECIMAL
                                        )
                                    )
                                    FROM jsonb_array_elements(v.options) AS option_data
                                )::json
                            )
                        ELSE NULL
                    END
                ) FILTER (WHERE v.id IS NOT NULL), '[]'::json
            ) AS variations
        FROM
            products p
        LEFT JOIN
            product_variations pv ON p.id = pv.product_id
        LEFT JOIN
            variations v ON pv.variation_id = v.id
        GROUP BY
            p.id, p.name, p.description, p.price, p.parent, p.color, p.image
        ORDER BY
            p.uid ASC;
    `

    const { rows } = await pool.query(query)
    console.log()
    return rows
}

const findProductsByCategory = async (categoryId) => {

    const query = `
        SELECT
            p.id AS id,
            p.name AS name,
            p.description AS description,
            p.price AS price,
            p.parent AS parent,
            p.color AS color,
            p.image AS image,
            COALESCE(
                json_agg(
                    CASE
                        WHEN v.id IS NOT NULL THEN
                            jsonb_build_object(
                                'variation_id', v.id,
                                'variation_name', v.name,
                                'options', (
                                    SELECT json_agg(
                                        jsonb_build_object(
                                            'option_id', option_data ->> 'id',
                                            'option_name', option_data ->> 'name',
                                            'option_price', (option_data ->> 'price')::DECIMAL
                                        )
                                    )
                                    FROM jsonb_array_elements(v.options) AS option_data
                                )::json
                            )
                        ELSE NULL
                    END
                ) FILTER (WHERE v.id IS NOT NULL), '[]'::json
            ) AS variations
        FROM
            products p
        LEFT JOIN
            product_variations pv ON p.id = pv.product_id
        LEFT JOIN
            variations v ON pv.variation_id = v.id
        WHERE
            p.parent = $1
        GROUP BY
            p.id, p.name, p.description, p.price, p.parent;
    `


    const { rows } = await pool.query(query, [categoryId])

    return rows
}

export const productsModel = {
    findAllProducts,
    findProductsByCategory,
}