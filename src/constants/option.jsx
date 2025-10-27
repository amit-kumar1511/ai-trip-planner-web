export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A solo travels in exploration',
    icon: '✈',
    people: 1
  },
  {
    id: 2,
    title: 'Couple',
    desc: 'Two travels in tandem',
    icon: '🥂',
    people: 2
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adv..',
    icon: '🏡',
    people: '3 to 5 people'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seeks',
    icon: '⛵',
    people: '5 to 10 people'
  }
];

export const SelectBudgetOptions=[
    {
        id:1,
        title:'cheap',
        desc:'Stay conscious of costs',
        icon:'💰'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💵'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸'
    }
]

export const AI_PROMPT = `
You are a professional travel planner AI.

Generate a complete travel plan for the following request:

Location: {location}
Duration: {totalDays} days
Traveler type: {traveler}
Budget: {budget}

Return the response **only as valid JSON** — no text, no explanations, no markdown.

The JSON must follow this structure:

{
  "location": "string",
  "country": "string",
  "currency": "string", // Automatically detect based on country. Example: "INR (₹)", "USD ($)", "EUR (€)"
  "total_days": number,
  "traveler": "string",
  "budget": "string",
  "hotels": [
    {
      "hotel_name": "string",
      "address": "string",
      "price_per_night": "string", // include correct currency symbol
      "image_url": "string",
      "geo_coordinates": { "lat": number, "lng": number },
      "rating": number,
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "day": number,
      "best_time_to_visit": "string",
      "places": [
        {
          "place_name": "string",
          "details": "string" // only 20 words,
          "image_url": "string",
          "geo_coordinates": { "lat": number, "lng": number },
          "ticket_pricing": "string", // include correct currency symbol and only price
          "travel_time": "string", //Example: olny time "1 h 10 min or 20 min"
          "visit_time": "string" // Example: "08:00–10:00" or "2 PM–4 PM"
        }
      ]
    }
  ]
}

### Output Rules:
- Always include exactly 4 hotels.
- Use the correct local currency and symbol automatically based on the detected country of {location}.

- Each place must have a realistic "visit_time" range.
- Output must be valid JSON only — no text outside the JSON.
`;
