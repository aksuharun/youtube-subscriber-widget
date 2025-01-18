import express from 'express'
import cors from 'cors'
import channelRoutes from './routes/channel.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/channel', channelRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something broke!' })
})

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`)
})