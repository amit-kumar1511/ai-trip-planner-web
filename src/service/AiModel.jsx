import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      // First message must be from the user
      role: 'user',
      parts: [
        {
          text: 'Please provide hotel information in JSON format for Las Vegas.',
        },
      ],
    },
    {
      // Model response – valid role
      role: 'model',
      parts: [
        {
          text: `{
  "hotels": [
    {
  "time":"9:00 Am -12:00 PM"
      "hotelName": "The D Las Vegas",
      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",
      "price": "$50-$100 per night",
      "hotelImageUrl": "https://www.thedcasino.com/images/hero/main-hero-02.jpg",
      "geoCoordinates": "36.1695, -115.1438",
      "rating": "3.5 stars",
      "description": "A budget-friendly hotel located in downtown Las Vegas with a retro vibe. It features a casino, a pool, and several dining options."
    }
  ]
}`
        }
      ]
    }
  ],
});
