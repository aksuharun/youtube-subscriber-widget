import express from 'express'
import { google } from 'googleapis'
const router = express.Router()

// Initialize YouTube API client
const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
})

console.log('YouTube API Key:', process.env.YOUTUBE_API_KEY ? 'Present' : 'Missing')

// Get subscriber count for a channel
router.get('/subscribers/:channelId', async (req, res) => {
    try {
        const { channelId } = req.params
        console.log('Fetching subscribers for channel:', channelId)
        
        const response = await youtube.channels.list({
            part: 'statistics',
            id: channelId
        })

        console.log('YouTube API Response:', response.data)

        if (!response.data.items || response.data.items.length === 0) {
            console.log('No channel found for ID:', channelId)
            return res.status(404).json({ error: 'Channel not found' })
        }

        const subscriberCount = response.data.items[0].statistics.subscriberCount
        res.json({
            channelId,
            subscriberCount: parseInt(subscriberCount),
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Error fetching subscriber count:', error.message)
        console.error('Full error:', error)
        res.status(500).json({ error: 'Failed to fetch subscriber count' })
    }
})

// Get channel name
router.get('/name/:channelId', async (req, res) => {
    try {
        const { channelId } = req.params
        
        const response = await youtube.channels.list({
            part: 'snippet',
            id: channelId
        })

        if (!response.data.items || response.data.items.length === 0) {
            return res.status(404).json({ error: 'Channel not found' })
        }

        const channelName = response.data.items[0].snippet.title
        res.json({
            channelId,
            channelName,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Error fetching channel name:', error)
        res.status(500).json({ error: 'Failed to fetch channel name' })
    }
})

// Get channel profile picture
router.get('/picture/:channelId', async (req, res) => {
    try {
        const { channelId } = req.params
        
        const response = await youtube.channels.list({
            part: 'snippet',
            id: channelId
        })

        if (!response.data.items || response.data.items.length === 0) {
            return res.status(404).json({ error: 'Channel not found' })
        }

        const profilePicture = response.data.items[0].snippet.thumbnails.default.url
        res.json({
            channelId,
            profilePicture,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Error fetching profile picture:', error)
        res.status(500).json({ error: 'Failed to fetch profile picture' })
    }
})

export default router 