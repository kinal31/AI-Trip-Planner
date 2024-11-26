import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot directly access real-time information, including hotel prices, availability, images, and real-time ratings.  Furthermore, I cannot provide URLs for images.  My response will provide a framework for your Las Vegas trip, and you will need to use online travel agencies (like Expedia, Booking.com, Kayak) and Google Maps to fill in the missing data points.\n\n\n```json\n{\n  \"tripName\": \"Las Vegas Budget Trip for Couples (3 Days)\",\n  \"budget\": \"Cheap\",\n  \"travelers\": \"Couple\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Your Search Result Hotel 1\", \n      \"hotelAddress\": \"Your Search Result Address 1\",\n      \"price\": \"Your Search Result Price 1 (per night)\",\n      \"hotelImageUrl\": \"Replace with URL from search results\",\n      \"geoCoordinates\": \"[Latitude, Longitude]\", \n      \"rating\": \"Replace with rating from search results\",\n      \"description\": \"Replace with description from search results\"\n    },\n    {\n      \"hotelName\": \"Your Search Result Hotel 2\",\n      \"hotelAddress\": \"Your Search Result Address 2\",\n      \"price\": \"Your Search Result Price 2 (per night)\",\n      \"hotelImageUrl\": \"Replace with URL from search results\",\n      \"geoCoordinates\": \"[Latitude, Longitude]\",\n      \"rating\": \"Replace with rating from search results\",\n      \"description\": \"Replace with description from search results\"\n    },\n    {\n      \"hotelName\": \"Your Search Result Hotel 3\",\n      \"hotelAddress\": \"Your Search Result Address 3\",\n      \"price\": \"Your Search Result Price 3 (per night)\",\n      \"hotelImageUrl\": \"Replace with URL from search results\",\n      \"geoCoordinates\": \"[Latitude, Longitude]\",\n      \"rating\": \"Replace with rating from search results\",\n      \"description\": \"Replace with description from search results\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"theme\": \"Strip Exploration & Free Activities\",\n      \"plan\": [\n        {\n          \"placeName\": \"Las Vegas Strip Walk\",\n          \"placeDetails\": \"Walk the length of the Strip, admiring the hotels and fountains.\",\n          \"placeImageUrl\": \"Replace with URL (e.g., Bellagio fountains)\",\n          \"geoCoordinates\": \"[Latitude, Longitude of starting point on the Strip]\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"5\",\n          \"timeTravel\": \"3-4 hours\"\n        },\n        {\n          \"placeName\": \"Bellagio Fountains Show\",\n          \"placeDetails\": \"Free outdoor water show with music and lights.\",\n          \"placeImageUrl\": \"Replace with URL\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.8\",\n          \"timeTravel\": \"30 minutes\"\n        },\n         {\n          \"placeName\": \"Fremont Street Experience (Downtown)\",\n          \"placeDetails\": \"Free light show and street performers\",\n          \"placeImageUrl\": \"Replace with URL\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"ticketPricing\": \"Free (Some shows may charge)\",\n          \"rating\": \"4.5\",\n          \"timeTravel\": \"2-3 hours\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"theme\": \"Affordable Entertainment & Views\",\n      \"plan\": [\n        {\n          \"placeName\": \"High Roller Observation Wheel\",\n          \"placeDetails\": \"Consider this if you have a slightly higher budget, offers amazing views\",\n          \"placeImageUrl\": \"Replace with URL\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"ticketPricing\": \"Check online for discounted tickets\",\n          \"rating\": \"4.6\",\n          \"timeTravel\": \"1 hour\"\n        },\n        {\n          \"placeName\": \"Seven Magic Mountains\",\n          \"placeDetails\": \"Free outdoor art installation about 30 mins from Strip (rent a cheap car or use ride-sharing)\",\n          \"placeImageUrl\": \"Replace with URL\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.7\",\n          \"timeTravel\": \"2-3 hours (including travel time)\"\n        },\n         {\n          \"placeName\": \"Free Pool Time at your Hotel\",\n          \"placeDetails\": \"Relax and enjoy free amenities at your hotel\",\n          \"placeImageUrl\": \"Replace with URL\",\n          \"geoCoordinates\": \"Your Hotel's Coordinates\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.0\",\n          \"timeTravel\": \"2-3 hours\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"theme\": \"Exploring Beyond the Strip\",\n      \"plan\": [\n        {\n          \"placeName\": \"Neon Museum\",\n          \"placeDetails\": \"Museum of old Vegas signs; consider this if your budget allows\",\n          \"placeImageUrl\": \"Replace with URL\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"ticketPricing\": \"Check for discounted tickets\",\n          \"rating\": \"4.5\",\n          \"timeTravel\": \"2 hours\"\n        },\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"Stunning scenery, hiking trails (check for park fees)\",\n          \"placeImageUrl\": \"Replace with URL\",\n          \"geoCoordinates\": \"[Latitude, Longitude]\",\n          \"ticketPricing\": \"Check for park entrance fees\",\n          \"rating\": \"4.8\",\n          \"timeTravel\": \"3-4 hours (including travel time)\"\n        }\n      ]\n    }\n  }\n}\n```\n\nRemember to replace the placeholder values with actual data from your online searches.  Prices and availability change constantly.  Consider using public transport (buses) to save on transportation costs.  Look for deals and discounts on attractions and shows in advance.  Happy travels!\n"},
          ],
        },
      ],
    });
  