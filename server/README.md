# PathWise Backend Server

This is the backend server for the PathWise learning path generator application.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

3. Add your Hugging Face API key to the `.env` file:
```
HF_API_KEY=your_actual_api_key_here
```

4. Start the server:
```bash
npm run dev
```

The server will run on http://localhost:3001

## API Endpoints

- `POST /api/generate-path` - Generate a personalized learning path
- `GET /api/health` - Health check endpoint

## Environment Variables

- `HF_API_KEY` - Your Hugging Face API key (required)
- `PORT` - Server port (optional, defaults to 3001)

