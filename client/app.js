// DOM Elements
const channelPicture = document.querySelector('.channel-picture')
const channelName = document.querySelector('.channel-name')
const subscriberCount = document.querySelector('.subscriber-count')
const errorMessage = document.querySelector('.error-message')
const widgetContainer = document.querySelector('.widget-container')

// API base URL
const API_URL = window.ENV?.API_URL || 'http://localhost:3000'

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search)
var formatType = urlParams.get('format') || null
const theme = urlParams.get('theme') || 'dark' // 'dark', 'light', or 'transparent'

// Apply theme
function applyTheme(theme) {
    switch (theme) {
        case 'light':
            widgetContainer.style.background = 'rgba(255, 255, 255, 0.9)'
            document.body.style.color = '#000'
            subscriberCount.style.color = '#666'
            break
        case 'transparent':
            widgetContainer.style.background = 'transparent'
            widgetContainer.style.backdropFilter = 'none'
            break
        case 'dark':
        default:
            widgetContainer.style.background = 'rgba(0, 0, 0, 0.7)'
            document.body.style.color = '#fff'
            subscriberCount.style.color = '#aaa'
            break
    }
}

// Format subscriber count based on preference
function formatSubscriberCount(count) {
  let suffix = ''
  if (formatType === 'raw') {
        return count.toLocaleString()
    }

    if (count >= 1_000_000) {
        [count, suffix] = [(count / 1_000_000).toFixed(2), 'M']
    } else if (count >= 1_000) {
        [count, suffix] = [(count / 1_000).toFixed(2), 'K']
    }
    return count.replace(/\.?0+$/, '').toString() + suffix
}

// Update subscriber count only
async function updateSubscriberCount(channelId) {
    try {
        errorMessage.style.display = 'none'
        
        const subsResponse = await fetch(`${API_URL}/api/channel/subscribers/${channelId}`)
        const subsData = await subsResponse.json()
        
        if (!subsResponse.ok) throw new Error(subsData.error)
        subscriberCount.textContent = formatSubscriberCount(subsData.subscriberCount) + ' subscribers'
    } catch (error) {
        errorMessage.textContent = error.message || 'Failed to fetch subscriber count'
        errorMessage.style.display = 'block'
    }
}

// Initialize channel information
async function initializeChannelInfo(channelId) {
    try {
        errorMessage.style.display = 'none'

        // Fetch channel data in parallel
        const [nameResponse, pictureResponse] = await Promise.all([
            fetch(`${API_URL}/api/channel/name/${channelId}`),
            fetch(`${API_URL}/api/channel/picture/${channelId}`)
        ])

        // Handle channel name
        const nameData = await nameResponse.json()
        if (!nameResponse.ok) throw new Error(nameData.error)
        channelName.textContent = nameData.channelName

        // Handle profile picture
        const pictureData = await pictureResponse.json()
        if (!pictureResponse.ok) throw new Error(pictureData.error)
        channelPicture.src = pictureData.profilePicture
        channelPicture.alt = `${nameData.channelName}'s profile picture`

        // Get initial subscriber count
        await updateSubscriberCount(channelId)
    } catch (error) {
        errorMessage.textContent = error.message || 'Failed to fetch channel information'
        errorMessage.style.display = 'block'
    }
}

// Get channel ID from the URL path
const channelId = window.location.pathname.split('/').pop()

if (channelId) {
    // Apply theme
    applyTheme(theme)
    
    // Initialize channel info (name, picture, and initial sub count)
    initializeChannelInfo(channelId)
    
    // Update only subscriber count every 30 seconds
    setInterval(() => {
        updateSubscriberCount(channelId)
    }, 30000)
} else {
    errorMessage.textContent = 'Please provide a channel ID in the URL path'
    errorMessage.style.display = 'block'
} 

// Redirect to the channel's YouTube page
widgetContainer.addEventListener('click', () => {
    window.location.href = `https://www.youtube.com/channel/${channelId}`
})