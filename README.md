# YouTube Subscribers Counter Widget

A customizable widget that displays real-time YouTube channel subscriber counts, channel name, and profile picture. Perfect for embedding in streaming overlays, websites, or any other platform where you want to showcase your YouTube subscriber count.

## Features

- Real-time subscriber count updates (every 30 seconds)
- Channel profile picture display
- Channel name display
- Clickable widget that redirects to the YouTube channel
- Multiple theme options (dark, light, transparent)
- Customizable subscriber count format
- Cross-origin resource sharing (CORS) enabled

## Project Structure

```
├── .gitignore             # Git ignore patterns
├── client/                # Frontend application
│   ├── app.js             # Main client-side logic
│   ├── index.html         # Widget HTML template
│   ├── server.js          # Development server
│   └── assets/            # Static assets
│
└── server/                # Backend API
    ├── server.js          # Express server setup
    ├── routes/            # API route handlers
    ├── .env.example        # Example environment variables
    └── .env              # Environment variables
```

## Prerequisites

- Node.js (v14 or higher)
- YouTube Data API v3 key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd youtube-subs-counter-widget
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Configure environment variables:
   - For the server:
     ```bash
     cd server
     cp .env.example .env
     ```
   - For the client:
     ```bash
     cd ../client
     cp .env.example .env
     ```
   - Edit both `.env` files:
     - Server: Add your YouTube API key and optionally modify the port (default: 3000)
     - Client: Modify the port (default: 8080) and API URL if needed

4. Start the servers:
```bash
# Start the API server (from server directory)
npm start

# Start the client server (from client directory)
npm start
```

## Usage

1. Access the widget at:
```
http://localhost:8080/CHANNEL_ID
```
Replace `CHANNEL_ID` with your YouTube channel ID.

2. Customization Options:
   - Theme: Add `?theme=<option>` parameter
     - Options: `dark` (default), `light`, `transparent`
   - Number Format: Add `?format=raw` for unformatted numbers
   
   Example:
   ```
   http://localhost:8080/CHANNEL_ID?theme=light&format=raw
   ```

## API Endpoints

- `GET /api/channel/subscribers/:channelId` - Get subscriber count
- `GET /api/channel/name/:channelId` - Get channel name
- `GET /api/channel/picture/:channelId` - Get profile picture URL

## Development

The client uses a simple development server for local testing. The widget is designed to be embedded in other websites using an iframe.

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 