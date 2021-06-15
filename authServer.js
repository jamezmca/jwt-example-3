//only for authentication

require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

app.post('/login', (req, res) => {
    //authenticate user

    //jwt for autherisation
    const username = req.body.username
    const user = { name: username }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })

    //terminal 'node'
    //require('crypto').randomBytes(64).toString('hex')
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}


app.listen(4000)