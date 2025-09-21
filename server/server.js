import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Learning Path Generation endpoint
app.post('/api/generate-path', async (req, res) => {
  console.log('🚀 [API] Learning path generation request received');

  const { skills, interests, weaknesses } = req.body;

  // Validate input
  if (!skills || !interests || !weaknesses) {
    return res.status(400).json({ error: 'Missing required fields: skills, interests, weaknesses' });
  }
  if (!Array.isArray(skills) || !Array.isArray(interests) || !Array.isArray(weaknesses)) {
    return res.status(400).json({ error: 'skills, interests, and weaknesses must be arrays' });
  }

  const apiKey = process.env.HF_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Hugging Face API key not configured' });
  }

  // Create the prompt for the AI
  const prompt = `Generate a personalized learning path with 4-6 steps based on the following information:

Skills: ${skills.join(', ')}
Interests: ${interests.join(', ')}
Weaknesses: ${weaknesses.join(', ')}

Each step should include: step number, title, description, and estimated duration in weeks. Return it strictly as JSON in the format:
[
  { "step": 1, "title": "...", "description": "...", "duration": "..." },
  { "step": 2, "title": "...", "description": "...", "duration": "..." },
  ...
]

Make the learning path practical, progressive, and tailored to help the user develop their skills while addressing their weaknesses and aligning with their interests.`;

  const models = [
    'microsoft/DialoGPT-large',
    'microsoft/DialoGPT-medium',
    'gpt2-large',
    'gpt2-medium',
    'gpt2'
  ];

  let response;
  let successfulModel;

  for (const model of models) {
    let retries = 3; // retry 503 up to 3 times
    while (retries > 0) {
      try {
        console.log(`🤖 [API] Trying model: ${model}, retries left: ${retries}`);
        response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 800,
              temperature: 0.7,
              return_full_text: false,
              do_sample: true,
              top_p: 0.9
            }
          })
        });

        console.log(`🤖 [API] Model ${model} response status:`, response.status);
        const text = await response.text();
        console.log(`🤖 [API] Response text (first 200 chars):`, text.substring(0, 200));

        if (response.ok) {
          successfulModel = model;
          response = JSON.parse(text); // parse JSON response
          break;
        } else if (response.status === 503) {
          console.log('⏳ Model loading, retrying...');
          retries--;
          await new Promise(r => setTimeout(r, 2000)); // wait 2s before retry
        } else if (response.status === 401) {
          throw new Error('Unauthorized: Invalid Hugging Face API key.');
        } else {
          console.log(`❌ Model ${model} failed with status ${response.status}`);
          break;
        }
      } catch (err) {
        console.log(`❌ Error with model ${model}:`, err.message);
        break;
      }
    }
    if (successfulModel) break;
  }

  if (!successfulModel) {
    const fallbackPath = generateFallbackLearningPath(skills, interests, weaknesses);
    return res.json({
      learningPath: fallbackPath,
      message: 'All models failed or unavailable. Using fallback learning path.'
    });
  }

  // Extract generated text
  let generatedText = '';
  if (Array.isArray(response) && response.length > 0) {
    generatedText = response[0].generated_text || '';
  } else if (response.generated_text) {
    generatedText = response.generated_text;
  } else {
    const fallbackPath = generateFallbackLearningPath(skills, interests, weaknesses);
    return res.json({
      learningPath: fallbackPath,
      message: 'Unexpected API response format, using fallback learning path.'
    });
  }

  // Try parsing JSON from AI response
  try {
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const learningPath = JSON.parse(jsonMatch[0]);
      if (Array.isArray(learningPath) && learningPath.length > 0) {
        return res.json({ learningPath });
      }
    }
    const fallbackPath = generateFallbackLearningPath(skills, interests, weaknesses);
    return res.json({
      learningPath: fallbackPath,
      message: 'Could not parse AI response as JSON, using fallback learning path.'
    });
  } catch (parseError) {
    const fallbackPath = generateFallbackLearningPath(skills, interests, weaknesses);
    return res.json({
      learningPath: fallbackPath,
      message: 'AI response parsing failed, using fallback learning path.'
    });
  }
});

// Fallback learning path generator
function generateFallbackLearningPath(skills, interests, weaknesses) {
  const steps = [];
  let stepNumber = 1;

  if (weaknesses.length > 0) {
    steps.push({
      step: stepNumber++,
      title: `Master ${weaknesses[0]}`,
      description: `Focus on building fundamental knowledge in ${weaknesses[0]}.`,
      duration: '2-3 weeks'
    });
  }

  if (skills.length > 0) {
    steps.push({
      step: stepNumber++,
      title: `Advanced ${skills[0]}`,
      description: `Take your ${skills[0]} skills to the next level.`,
      duration: '3-4 weeks'
    });
  }

  if (interests.length > 0) {
    steps.push({
      step: stepNumber++,
      title: `Deep Dive into ${interests[0]}`,
      description: `Explore advanced topics in ${interests[0]} and work on projects.`,
      duration: '4-5 weeks'
    });
  }

  steps.push({
    step: stepNumber++,
    title: 'Integration Project',
    description: 'Combine all skills and interests to work on a comprehensive project.',
    duration: '2-3 weeks'
  });

  steps.push({
    step: stepNumber++,
    title: 'Portfolio Development',
    description: 'Create a professional portfolio showcasing your projects and skills.',
    duration: '1-2 weeks'
  });

  return steps;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
