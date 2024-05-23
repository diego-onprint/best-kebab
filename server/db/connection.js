import "dotenv/config"
import pkg from "pg"
const { Pool } = pkg

// PROD
export const pool = new Pool({
    host: "some-postgres",
    user: "postgres",
    database: "demoOnPrint",
    password: "postgres",
    port: 5432,
    allowExitOnIdle: true,
})

// DEV
// export const pool = new Pool({
//     host: "localhost",
//     user: "postgres",
//     database: "onprint_demo",
//     password: "root",
//     port: 5432,
//     allowExitOnIdle: true,
// })

try {
    await pool.query("SELECT NOW()")
} catch (err) {
    console.log("ERR", err)
}