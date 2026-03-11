'use server';
/**
 * @fileOverview Genkit flow that takes a German word and generates a full vocabulary entry.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DefineWordInputSchema = z.object({
  word: z.string().describe('The German word to define.'),
});

const DefineWordOutputSchema = z.object({
  word: z.string(),
  translation: z.string().describe('The Macedonian translation.'),
  category: z.enum(['noun', 'verb', 'adjective', 'adverb', 'preposition', 'pronoun', 'conjunction', 'article', 'phrase', 'other']),
  sentence_de: z.string().describe('An example sentence in German.'),
  sentence_mk: z.string().describe('The translation of the example sentence in Macedonian.'),
  image: z.string().describe('A single representative emoji for the word.'),
});

export type DefineWordOutput = z.infer<typeof DefineWordOutputSchema>;

export async function defineWord(input: { word: string }): Promise<DefineWordOutput> {
  return defineWordFlow(input);
}

const defineWordPrompt = ai.definePrompt({
  name: 'defineWordPrompt',
  input: { schema: DefineWordInputSchema },
  output: { schema: DefineWordOutputSchema },
  prompt: `You are a professional German-Macedonian language tutor. 
  For the given German word "{{word}}", provide a complete dictionary entry.
  
  Requirements:
  1. Translation must be accurate in Macedonian.
  2. Category must be correctly identified.
  3. Create a simple, useful example sentence in German (A1-A2 level).
  4. Translate that sentence accurately into Macedonian.
  5. Provide one single emoji that best represents the word.
  
  Word: {{word}}`,
});

const defineWordFlow = ai.defineFlow(
  {
    name: 'defineWordFlow',
    inputSchema: DefineWordInputSchema,
    outputSchema: DefineWordOutputSchema,
  },
  async (input) => {
    const { output } = await defineWordPrompt(input);
    if (!output) throw new Error('Failed to define word.');
    return output;
  }
);
