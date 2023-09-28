// import client from "config/database"
import { Pool } from "pg"

const pool = new Pool


export const findById = async (id: number) => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const queryStr = "SELECT * FROM users WHERE id = $1"
        const res = await client.query(queryStr, [id])
        await client.query('COMMIT')
        return res
    } catch (error) {
        await client.query('ROLLBACK')
    } finally {
        await client.release()
    }
}