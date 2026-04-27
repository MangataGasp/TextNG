const express = require('express')
const {Pool} = require('pg')
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware  = require('./middleware');

const app = express()
app.use(express.json())
app.use(cors())
app.authMiddleware = authMiddleware

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
})

app.get('/messages',authMiddleware, async(req, res) => {
    const result = await pool.query("SELECT * FROM textng ORDER By created_at ASCE")
    
    res.json (result.rows)
})


app.post('/messages', authMiddleware, async(req, res) => {
    const {text, user} = req.body
    /* todo: add email as senders name from the register */
    const result = await pool.query("INSERT INTO textng (text, sender) VALUES($1, $2) RETURNING *", [text, user])
    res.json(result.rows[0])
})


app.post('/register', async (req, res) => {
    const {email, password} = req.body
    console.log(req.body)

    if(!email || !password) {
        return res.status(400).json({error: "Email and password required"})
    }
       const hashedPassword = await bcrypt.hash(password, 10)   

    try {
        const result = await pool.query("INSERT INTO users (email, password) VALUES($1, $2) RETURNING id, email",
            [email, hashedPassword]);

            res.json({user:result.rows[0]})
    } catch (error) {
        console.error(error)
        res.status(400).json({error: "Internal server error"})
    }
})

app.post('/login', async (req, res) => { 
    const {email, password} = req.body
    console.log(req.body)
   if(!email || !password) {
    return res.status(400).json({error: "Email and password required"})
   }

   try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    const user = result.rows[0]

    if(!user) {
        return res.status(400).json({error: "Invalid email"})
        
    }
    const isMatch = await bcrypt.compare(password, user.password)

     if(!isMatch) {
        /* console.log(`is Match rendering ${isMatch}`); */
        return res.status(400).json({error: "Invalid password"})
    } 

    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_TOKEN, {expiresIn: "5d"})
    res.json({
        message: "Logged in sucessfully",
        id: user.id,
        email: user.email,
        token: token
    })
   } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal Server error"})
   }
})  
const PORT = 9876
app.listen(PORT, () => {
    console.log(`Server is active on ${PORT}`)
})