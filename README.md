# PathWise - AI-Powered Learning Path Generator

PathWise is a comprehensive career development application that uses AI to generate personalized learning paths based on user skills, interests, and areas for improvement.

## Features

- **User Assessment**: Comprehensive skills, interests, and goals assessment
- **Career Matching**: AI-powered career recommendations based on user profile
- **Learning Path Generation**: Personalized learning paths using Hugging Face AI
- **Progress Tracking**: Track learning progress and milestones
- **Modern UI**: Beautiful, responsive interface with dark mode support

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js with Express
- Hugging Face Inference API integration
- CORS enabled for frontend communication

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run setup:backend
```

### 2. Set Up Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
cp env.example .env
```

Edit the `.env` file and add your Hugging Face API key:

```
HF_API_KEY=your_hugging_face_api_key_here
```

Get your API key from: https://huggingface.co/settings/tokens

### 3. Run the Application

#### Option 1: Run Both Frontend and Backend
```bash
npm run dev:full
```

#### Option 2: Run Separately
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/api/health

## API Endpoints

### POST /api/generate-path

Generates a personalized learning path using AI.

**Request Body:**
```json
{
  "skills": ["JavaScript", "React", "Node.js"],
  "interests": ["Web Development", "Machine Learning"],
  "weaknesses": ["Database Design", "System Architecture"]
}
```

**Response:**
```json
{
  "learningPath": [
    {
      "step": 1,
      "title": "Master Database Fundamentals",
      "description": "Learn SQL, database design principles, and data modeling",
      "duration": "3-4 weeks"
    },
    {
      "step": 2,
      "title": "System Architecture Patterns",
      "description": "Study microservices, distributed systems, and scalability",
      "duration": "4-5 weeks"
    }
  ]
}
```

## Project Structure

```
project/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── server/                # Backend server
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── env.example        # Environment variables template
└── package.json           # Frontend dependencies and scripts
```

## Learning Path Generation

The AI-powered learning path generator:

1. **Analyzes User Profile**: Extracts skills, interests, and weaknesses from the user's assessment
2. **Crafts Personalized Prompt**: Creates a detailed prompt for the AI model
3. **Calls Hugging Face API**: Uses Mistral-7B-Instruct model for generation
4. **Parses Response**: Extracts structured learning path data
5. **Displays Results**: Shows the generated path in a beautiful UI

## Customization

### Adding New Learning Path Templates

Edit `src/components/LearningPaths.tsx` to add new predefined learning paths:

```typescript
const learningPaths: LearningPath[] = [
  {
    id: 'new-career',
    title: 'New Career Learning Path',
    description: 'Description of the learning path',
    targetCareer: 'Target Career',
    estimatedTime: 'X months',
    difficulty: 'Beginner',
    resources: [...],
    milestones: [...]
  }
];
```

### Modifying AI Prompts

Edit the prompt in `server/server.js` to customize how the AI generates learning paths:

```javascript
const prompt = `Your custom prompt here...`;
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the backend is running on port 3001
2. **API Key Issues**: Verify your Hugging Face API key is correct
3. **Generation Failures**: Check the browser console for detailed error messages

### Debug Mode

Enable debug logging by adding to your `.env` file:
```
DEBUG=true
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

