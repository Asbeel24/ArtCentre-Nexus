import { GoogleGenAI, Type } from "@google/genai";
import { SynthesisResult, Concept } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

export const synthesizeIdea = async (
  selectedConcepts: Concept[],
  customContext: string
): Promise<SynthesisResult> => {
  const ai = getClient();
  
  const conceptsStr = selectedConcepts.map(c => `${c.name} (${c.category})`).join(', ');
  const prompt = `
    Act as a world-class curator and technologist in Digital Art and Creative Computing.
    
    I want to create a new digital art or electronic music project.
    
    My Constraints/Inspirations:
    - Concepts/Tools to include: ${conceptsStr}
    - Additional Context: ${customContext || "Surprise me with a cutting-edge aesthetic."}
    
    Task:
    Extend these concepts into a cohesive project proposal. Recombine them in a novel way.
    The output must be structured JSON.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A creative title for the project" },
          concept: { type: Type.STRING, description: "The core conceptual definition (2-3 sentences)" },
          visuals: { type: Type.STRING, description: "Description of the visual aesthetic and behavior" },
          audio: { type: Type.STRING, description: "Description of the sonic landscape and generative audio rules" },
          techStack: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Specific libraries, languages, or hardware recommended"
          },
          rationale: { type: Type.STRING, description: "Why this combination works historically or aesthetically" }
        }
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as SynthesisResult;
  }
  
  throw new Error("Failed to generate synthesis.");
};

export const expandConcept = async (conceptName: string): Promise<Concept> => {
    const ai = getClient();
    const prompt = `
      Provide a detailed definition for the term "${conceptName}" in the context of Creative Coding and Digital Art.
      Return a JSON object matching the Concept interface.
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    category: { type: Type.STRING, enum: ['Technology', 'Aesthetic', 'Movement', 'Concept', 'Tool'] },
                    description: { type: Type.STRING },
                    relatedIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                    tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
    });

    if(response.text) {
        return JSON.parse(response.text) as Concept;
    }
    throw new Error("Failed to expand concept");
}