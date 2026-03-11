'use server';
/**
 * @fileOverview A Genkit flow that generates an illustrative image or emoji for a given German vocabulary word.
 *
 * - generateVocabularyCardImage - A function that handles the image/emoji generation process.
 * - GenerateVocabularyCardImageInput - The input type for the generateVocabularyCardImage function.
 * - GenerateVocabularyCardImageOutput - The return type for the generateVocabularyCardImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateVocabularyCardImageInputSchema = z.object({
  germanWord: z.string().describe('The German vocabulary word.'),
  macTranslation: z.string().describe('The Macedonian translation of the word (for context).').optional(),
  germanSentence: z.string().describe('An example sentence in German (for context).').optional(),
  category: z.string().describe('The category of the word (e.g., noun, verb, adjective).').optional(),
});
export type GenerateVocabularyCardImageInput = z.infer<typeof GenerateVocabularyCardImageInputSchema>;

const GenerateVocabularyCardImageOutputSchema = z.object({
  imageUrl: z.string().describe("A data URI of an illustrative image or an emoji character. Expected format: 'data:<mimetype>;base64,<encoded_data>' or a single emoji character."),
});
export type GenerateVocabularyCardImageOutput = z.infer<typeof GenerateVocabularyCardImageOutputSchema>;

export async function generateVocabularyCardImage(
  input: GenerateVocabularyCardImageInput
): Promise<GenerateVocabularyCardImageOutput> {
  return generateVocabularyCardImageFlow(input);
}

const generateVocabularyCardImagePrompt = ai.definePrompt({
  name: 'generateVocabularyCardImagePrompt',
  input: { schema: GenerateVocabularyCardImageInputSchema },
  output: { schema: z.string().describe('A descriptive prompt for an image generation model, or a fallback emoji.') },
  prompt: `Generate a concise and highly descriptive prompt for an image generation model to create a simple, illustrative image representing the German word "{{germanWord}}".

  Context:
  - Category: {{category}}
  - Macedonian Translation: {{macTranslation}}
  - German Sentence: {{germanSentence}}
  
  The image should be visually clear, easy to understand, and suitable for a vocabulary learning card. Focus on a single concept related to the word. If the word is abstract or difficult to represent visually with an image, generate a single, highly relevant emoji instead.
  
  Examples:
  - Input: "Haus" (noun) -> Output: "A cozy, traditional German house with a red roof and a small garden."
  - Input: "essen" (verb) -> Output: "🍎" (or an image of someone eating)
  - Input: "schnell" (adverb) -> Output: "⚡"
  
  Generate either an image prompt (text) or a single emoji. Do not include any other text.
  
  Output:`,
});

const generateVocabularyCardImageFlow = ai.defineFlow(
  {
    name: 'generateVocabularyCardImageFlow',
    inputSchema: GenerateVocabularyCardImageInputSchema,
    outputSchema: GenerateVocabularyCardImageOutputSchema,
  },
  async (input) => {
    // Step 1: Generate an image description prompt or an emoji using a text model
    const { output: imageOrEmojiPrompt } = await generateVocabularyCardImagePrompt(input);

    if (!imageOrEmojiPrompt) {
      throw new Error('Failed to generate image prompt or emoji.');
    }

    const isEmoji = imageOrEmojiPrompt.length < 5 && /\p{Emoji}/u.test(imageOrEmojiPrompt);

    if (isEmoji) {
      return { imageUrl: imageOrEmojiPrompt };
    }

    try {
      const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: imageOrEmojiPrompt,
        config: {
          safetySettings: [
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          ],
        },
      });

      if (!media || !media.url) {
        throw new Error('Image generation failed: No media returned.');
      }

      return { imageUrl: media.url };
    } catch (imageError) {
      console.warn(`Image generation failed for "${input.germanWord}":`, imageError);
      const { output: fallbackEmoji } = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: `Generate a single, highly relevant emoji that best represents the German word "{{germanWord}}" (Category: {{category}}). Only return the emoji character, nothing else.`,
      });

      if (!fallbackEmoji) {
        throw new Error('Failed to generate fallback emoji.');
      }
      const emojiMatch = fallbackEmoji.trim().match(/\p{Emoji}/u);
      const finalEmoji = emojiMatch ? emojiMatch[0] : '💡';
      
      return { imageUrl: finalEmoji };
    }
  }
);
