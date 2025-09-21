// Simple test script to verify backend setup
import fetch from 'node-fetch';

const testBackend = async () => {
  try {
    console.log('Testing backend health check...');
    const healthResponse = await fetch('http://localhost:3001/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check passed:', healthData);

    console.log('\nTesting learning path generation...');
    const pathResponse = await fetch('http://localhost:3001/api/generate-path', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skills: ['JavaScript', 'React'],
        interests: ['Web Development'],
        weaknesses: ['Database Design']
      })
    });

    const pathData = await pathResponse.json();
    console.log('✅ Learning path generation test:', pathData);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\nMake sure to:');
    console.log('1. Run: cd server && npm install');
    console.log('2. Create .env file with HF_API_KEY');
    console.log('3. Run: npm run dev:backend');
  }
};

testBackend();

