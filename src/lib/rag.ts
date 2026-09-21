import Groq from 'groq-sdk';
import { knowledgeRepo, KnowledgeChunk } from './repository';

export interface RAGResponse {
  answer: string;
  sources: Array<{ title: string; source_name: string; category: string }>;
  grounded: boolean;
}

// Simple keyword / TF-IDF score for retrieving relevant knowledge chunks
function calculateRelevance(query: string, chunk: KnowledgeChunk): number {
  const queryWords = query.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  if (queryWords.length === 0) return 0;

  const contentText = `${chunk.title} ${chunk.category} ${chunk.content}`.toLowerCase();
  let score = 0;

  queryWords.forEach((word) => {
    if (contentText.includes(word)) {
      score += 1;
      // Bonus if match is in title
      if (chunk.title.toLowerCase().includes(word)) {
        score += 2;
      }
    }
  });

  return score;
}

export async function askVDCETAI(question: string): Promise<RAGResponse> {
  const chunks = knowledgeRepo.getAll();
  const FALLBACK_MESSAGE = "I couldn't find this information in the official VDCET knowledge base. Please contact the college office.";

  if (!question || question.trim().length === 0) {
    return {
      answer: "Please enter a valid question about VDCET.",
      sources: [],
      grounded: false,
    };
  }

  // Score all chunks against the query
  const scoredChunks = chunks
    .map((chunk) => ({ chunk, score: calculateRelevance(question, chunk) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  // If no relevant chunk matches key terms, return official fallback message
  if (scoredChunks.length === 0) {
    return {
      answer: FALLBACK_MESSAGE,
      sources: [],
      grounded: false,
    };
  }

  // Take top 3 most relevant chunks
  const topChunks = scoredChunks.slice(0, 3).map((item) => item.chunk);
  const sources = topChunks.map((c) => ({
    title: c.title,
    source_name: c.source_name,
    category: c.category,
  }));

  const contextText = topChunks
    .map((c, i) => `[Source ${i + 1}: ${c.title} (${c.source_name})]\n${c.content}`)
    .join('\n\n');

  // Try using Groq API if key is available
  const apiKey = process.env.GROQ_API_KEY;
  if (apiKey && apiKey.trim().length > 0 && !apiKey.includes('your_groq_api_key')) {
    try {
      const groq = new Groq({ apiKey });
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are the official VDCET AI Assistant for Vilasrao Deshmukh College of Engineering & Technology, Mouda.
Your answers are grounded in the available official VDCET knowledge base.
Rules:
1. Answer strictly using ONLY the provided official context.
2. Do not invent, assume, or hallucinate any facts (fees, dates, faculty names, rankings, etc.).
3. If the user's question cannot be answered using the provided official context, reply with exact text:
"${FALLBACK_MESSAGE}"`,
          },
          {
            role: 'user',
            content: `OFFICIAL CONTEXT:\n${contextText}\n\nUSER QUESTION:\n${question}`,
          },
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.1,
      });

      const responseText = completion.choices[0]?.message?.content?.trim();
      if (responseText) {
        return {
          answer: responseText,
          sources: responseText.includes(FALLBACK_MESSAGE) ? [] : sources,
          grounded: !responseText.includes(FALLBACK_MESSAGE),
        };
      }
    } catch (err) {
      console.error('Groq API Error, using grounded knowledge fallback:', err);
    }
  }

  // Grounded Deterministic Fallback when Groq API key is not configured or fails
  const matchedContent = topChunks.map((c) => `${c.title}:\n${c.content}`).join('\n\n');
  return {
    answer: matchedContent,
    sources: sources,
    grounded: true,
  };
}
