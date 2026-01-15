
import { GoogleGenAI } from "@google/genai";
import { Incident } from "../types";

export const getSafetyRecommendation = async (userLoc: {lat: number, lng: number}, nearbyIncidents: Incident[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Act as a Karachi Security Expert. 
  Current Location: ${userLoc.lat}, ${userLoc.lng}
  Recent Nearby Incidents: ${JSON.stringify(nearbyIncidents.slice(0, 5))}
  
  Provide a short, 1-sentence safety advice for someone traveling in this specific area right now. Focus on avoiding specific streets or behaviors.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (err) {
    return "Stay vigilant. Stick to well-lit main roads during late hours.";
  }
};
