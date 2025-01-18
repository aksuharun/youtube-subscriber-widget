import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fs from 'fs'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 8080
const apiUrl = process.env.API_URL || 'http://localhost:3000'

// Serve static files
app.use(express.static(__dirname))

// Handle all routes by serving index.html with injected config
app.get('*', (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
    const injectedHtml = html.replace(
        '</head>',
        `<script>window.ENV = { API_URL: "${apiUrl}" };</script></head>`
    )
    res.send(injectedHtml)
})

app.listen(port, () => {
    console.log(`Client server running at http://localhost:${port}`)
}) 