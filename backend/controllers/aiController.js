const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Blog = require('../models/Blog');

const logFile = path.join(__dirname, '../logs/ai_debug.log');

const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.getAssistantResponse = async (req, res) => {
  const { message, history = [] } = req.body;
  const logMsg = `[${new Date().toISOString()}] Incoming: ${message} (History: ${history.length})\n`;
  fs.appendFileSync(logFile, logMsg);
  
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const products = await Product.find({}, 'name category description').limit(10);
    const productContext = products.map(p => `- ${p.name}: ${p.category}`).join('\n');

    const systemPrompt = `You are the AABHA Trade Assistant for AABHA IMPEX, a premier agricultural merchant export house based in Rajkot, Gujarat, India.
      
      Company Profile:
      - Name: AABHA IMPEX
      - Location: Rajkot, Gujarat
      - Core Business: Exporting premium agricultural produce (Cumin seeds, high-grade rice, wheat, and exotic spices).
      - Ports: Mundra and Kandla ports in Gujarat.
      - Certifications: APEDA, FSSAI, and ISO certified.
      - Key People: Prince Patel (Managing Director), Khushal Patel (Executive Director).
      - Mission: Connecting India's rich agricultural heritage with global markets through purity and integrity.

      Current Product Catalog:
      ${productContext}
      
      Guidelines:
      1. Always speak as an official representative of AABHA IMPEX.
      2. Be concise, professional, and trade-focused.
      3. Structure every message with frequent line breaks (vertical layout).
      4. Example Formatting:
         Thank you for your interest.
         
         Our primary contact email is: info@aabhaimpex.com
         
         We look forward to connecting with you.
      5. NEVER use double asterisks (**) or single asterisks (*).
      6. If asked about the company, use the details above.`;

    // Gemini roles: 'user' and 'model'
    let formattedHistory = history.map(msg => ({
      role: msg.type === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Align history
    const firstUserIndex = formattedHistory.findIndex(c => c.role === 'user');
    if (firstUserIndex !== -1) {
      formattedHistory = formattedHistory.slice(firstUserIndex);
    } else {
      formattedHistory = [];
    }

    // Add latest message
    formattedHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const api_key = process.env.GEMINI_API_KEY;
    const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${api_key}`;
    
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] Requesting Gemini v1beta API with 120s timeout...\n`);

    const response = await axios.post(api_url, {
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: formattedHistory
    }, { timeout: 120000 });

    const aiResponse = response.data.candidates[0].content.parts[0].text;

    fs.appendFileSync(logFile, `[${new Date().toISOString()}] Success: ${aiResponse.substring(0, 50)}...\n`);
    res.json({ response: aiResponse });

  } catch (error) {
    const errorDetail = error.response ? JSON.stringify(error.response.data) : error.message;
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] ERROR: ${errorDetail}\n`);
    console.error('Gemini AI Error:', errorDetail);
    res.status(500).json({ 
      response: "I'm having trouble connecting to my AI brain. Please try again later." 
    });
  }
};
