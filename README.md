# Jarvis Backend Service

A smart text processing backend powered by Google's Gemini AI, providing various text transformation capabilities.

## Features

- Task-oriented text processing (meeting summaries, study notes, etc.)
- REST API endpoints
- AI-powered transformations

## Installation

1. Clone repository:
```bash
git clone [repository_url]
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
GEMINI_API_KEY=your_google_api_key
PORT=4004
```

4. Start development server:
```bash
npm run dev
```

## Production Deployment

### PM2 Process Manager

1. Build project:
```bash
npm run build
```

2. Start service:
```bash
pm2 start
```

Common PM2 commands:
```bash
# Monitor running instances
pm2 monit

# View PM2 status
pm2 status

# View logs of a specific service
pm2 logs [service-id]

# Restart service
pm2 restart [service-id]

# Stop service
pm2 stop [service-id]
```

## Available Scripts

- `npm run dev`: Start development server with nodemon
- `npm run build`: Compile TypeScript to JavaScript

## API Documentation

See [API.md](API.md) for detailed endpoint documentation. 