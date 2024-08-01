import { pool } from "../db/connection.js"

const getOrdersCurrentDay = async () => {
    try {
        const query = `
            SELECT *
            FROM orders
            WHERE (details->>'created_at')::timestamp >= date_trunc('day', CURRENT_DATE)
            AND (details->>'created_at')::timestamp < date_trunc('day', CURRENT_DATE + INTERVAL '1 day');
        `

        const response = await pool.query(query)
        // console.log("RESPONSE...........", response)
        return { success: true, data: response.rows }

    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

const getOrdersCurrentWeek = async () => {
    try {

        const query = `
            SELECT *
            FROM orders
            WHERE (details->>'created_at')::timestamp >= date_trunc('week', CURRENT_DATE + INTERVAL '1 day') - INTERVAL '1 day'
            AND (details->>'created_at')::timestamp < date_trunc('week', CURRENT_DATE + INTERVAL '1 day') + INTERVAL '6 day 23 hour 59 minute 59 second';
        `

        const response = await pool.query(query)
        return { success: true, data: response.rows }

    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}


const getOrdersLastMonth = async () => {
    try {

        const query = `
            SELECT *
            FROM orders
            WHERE (details->>'created_at')::timestamp >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
            AND (details->>'created_at')::timestamp < date_trunc('month', CURRENT_DATE);
        `

        const response = await pool.query(query)
        console.log(response)
        return { success: true, data: response.rows }

    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

const getOrdersLastYear = async () => {
    try {

        const query = `
            SELECT *
            FROM orders
            WHERE (details->>'created_at')::timestamp >= date_trunc('year', CURRENT_DATE - INTERVAL '1 year')
            AND (details->>'created_at')::timestamp < date_trunc('year', CURRENT_DATE);
        `

        const response = await pool.query(query)
        console.log(response)
        return { success: true, data: response.rows }

    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

const getOrdersBetweenDates = async (data) => {

    try {

        const startDate = new Date(data.start)
        const endDate = new Date(data.end)

        startDate.setUTCHours(0, 0, 0, 0)
        endDate.setUTCHours(23, 59, 59, 999)

        const query = `
            SELECT *
            FROM orders
            WHERE (details->>'created_at')::timestamp >= $1 AND (details->>'created_at')::timestamp <= $2;
        `

        const { rows } = await pool.query(query, [startDate, endDate])

        return { success: true, orders: rows }

    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

export const reportsModel = {
    getOrdersCurrentWeek,
    getOrdersLastMonth,
    getOrdersLastYear,
    getOrdersBetweenDates,
    getOrdersCurrentDay,
}