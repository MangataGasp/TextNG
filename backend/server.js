const express = require('express')
const {Pool} = require('pg')
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const app = express()
app.use(express.json())
app.use(cors())

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
})

app.get('/messages', async(req, res) => {
    const result = await pool.query("SELECT * FROM textng ORDER By created_at DESC")
    res.json (result.rows)
})


app.post('/messages',async (req, res) => {
    const {text, user} = req.body
    const result = await pool.query("INSERT INTO textng (text, sender) VALUES($1, $2) RETURNING *", [text, user])
    res.json(result.rows[0])
})


app.post('/register', async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({error: "Email and password required"})
    }
    const hashedPassword = bcrypt.hash(password, 10)

    try {
        const result = await pool.query("INSERT INTO users (email, password) VALUES($1, $2) RETURNING id, email",
            [email, hashedPassword]);

            res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})


const PORT = 6500
app.listen(PORT, () => {
    console.log(`Server is active on ${PORT}`)
})