
import { GoogleGenAI } from "@google/genai";

export const generateContent = async (prompt: string, methodologyTitle: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `Você é um Estrategista de Conteúdo de Elite e Especialista em Marketing Digital com 20 anos de experiência, focado em crescimento viral e conversão.
        
Sua tarefa é executar com perfeição a metodologia: "${methodologyTitle}".

Diretrizes de Resposta:
1. Responda estritamente em Português do Brasil.
2. Use Markdown rico: utilize tabelas para roteiros, listas com bullets para checklists, negrito para ênfase e títulos H2/H3 para organização.
3. Seja prático e direto: evite introduções longas. Vá direto ao conteúdo que o usuário pode copiar e colar.
4. Mantenha um tom profissional, porém persuasivo e disruptivo.
5. Se a metodologia envolver roteiros, especifique visual, áudio e texto na tela.`,
        temperature: 1,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
