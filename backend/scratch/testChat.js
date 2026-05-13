const axios = require('axios');

async function testChat() {
  try {
    const response = await axios.post('http://localhost:5000/api/ai/chat', {
      message: 'Hello'
    });
    console.log('Success:', response.data);
  } catch (error) {
    console.log('Error:', error.response ? error.response.data : error.message);
  }
}

testChat();
