
import { GoogleGenAI } from "@google/genai";

export const generateContent = async (prompt: string, methodologyTitle: string) => {
  // O valor de process.env.API_KEY será injetado pelo Vite via comando 'define' no config
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("A chave de API (API_KEY) não foi encontrada. Certifique-se de configurá-la nas Environment Variables da Vercel.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      // Trocado para flash-preview: mais rápido e com limites de cota muito maiores
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
        temperature: 0.8,
        topP: 0.95,
      },
    });

    if (!response.text) {
      throw new Error("A IA retornou uma resposta vazia.");
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    
    // Tratamento específico para erro de cota (429)
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      throw new Error("Limite de uso atingido (Cota do Google). Por favor, aguarde cerca de 60 segundos antes de tentar novamente ou use uma chave de API com plano pago.");
    }
    
    throw new Error(error.message || "Erro na geração de conteúdo.");
  }
};
