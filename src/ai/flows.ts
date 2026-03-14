import { z } from 'genkit';
import { ai } from './genkit';

const JAIN_SYSTEM_PROMPT = `You are a knowledgeable and compassionate Jain spiritual guide with deep knowledge of the Navkar Mantra, Jain philosophy, ahimsa, anekantavada, and meditation practices. Keep responses warm, accurate, and concise (3–5 sentences). Ground all answers in authentic Jain teachings.

The Navkar Mantra has five pads:
• Namo Arihantanam — I bow to the Arihantas (enlightened souls who have conquered inner enemies)
• Namo Siddhanam — I bow to the Siddhas (liberated souls free from the cycle of birth and death)
• Namo Ayariyam — I bow to the Acharyas (head monks and spiritual leaders)
• Namo Uvajjhayanam — I bow to the Upadhyayas (teachers of the scriptures)
• Namo Loe Savva Sahūnam — I bow to all the Sadhus in the world (all ascetics on the path of liberation)`;

export const askGuruFlow = ai.defineFlow(
  {
    name: 'askGuru',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (question) => {
    const { text } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      system: JAIN_SYSTEM_PROMPT,
      prompt: question,
    });
    return text;
  }
);

export const dailyVibeFlow = ai.defineFlow(
  {
    name: 'dailyVibe',
    outputSchema: z.string(),
  },
  async () => {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    const { text } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: `Generate a short, uplifting Jain-inspired spiritual affirmation for ${today}. It should be 2–3 sentences, grounded in Jain principles of ahimsa (non-violence), satya (truth), anekantavada (many-sidedness), and the Navkar Mantra. Make it feel personal and motivating for someone doing their daily meditation practice. Start with a relevant emoji.`,
    });
    return text;
  }
);

export const JAIN_FALLBACK_VIBES = [
  "✨ Peace begins with a single thought of forgiveness. Today, let go of any burdens and embrace the purity of your soul. Jai Jinendra!",
  "🌅 Every breath is an opportunity to practice Ahimsa. May your day be filled with kindness towards all living beings, including yourself.",
  "🙏 True strength lies in self-restraint and equanimity. Stay centered in your meditation and find the quiet power within the Navkar Mantra.",
  "✨ Focus on the present moment with Anekantavada—recognizing that every situation has many perspectives. Stay open, stay peaceful.",
  "🧘 Your soul is infinite and pure. Like the Siddhas, you have the potential for ultimate liberation. Carry this light with you today.",
  "🌅 Practice Satya (truthfulness) in your thoughts and words today. A clear mind leads to a peaceful heart. Happy Meditating!",
  "✨ The Navkar Mantra is your spiritual compass. Let its vibrations steady your mind and bring focus to your daily practice."
];

export const QUICK_ANSWERS: Record<string, string> = {
  "What does Namo Arihantanam mean?": "Namo Arihantanam means \"I bow to the Arihantas.\" Arihantas are enlightened souls who have conquered their inner enemies like anger, greed, ego, and deceit. They have shown us the path to liberation while still possessing a physical body. 🙏",
  "What does Namo Siddhanam mean?": "Namo Siddhanam means \"I bow to the Siddhas.\" Siddhas are liberated souls who are completely free from the cycle of birth and death. They reside in Siddhashila, the peak of the universe, in a state of eternal bliss and pure consciousness. ✨",
  "How many malas should I do daily?": "While there is no fixed rule, doing at least one mala (108 repetitions) of the Navkar Mantra daily is a common practice to maintain spiritual discipline. Many devotees perform 5, 11, or more malas depending on their personal commitment and time. 🧘",
  "What is the significance of 108 beads?": "108 beads represent the 108 qualities of the five supreme beings (Panch Parmeshti): 12 of Arihantas, 8 of Siddhas, 36 of Acharyas, 25 of Upadhyayas, and 27 of Sadhus. It is a symbol of completeness and spiritual devotion. ✨",
  "How do I focus during meditation?": "To focus during meditation, sit in a stable posture, close your eyes, and concentrate on the vibrations of each word of the Navkar Mantra. Practice rhythmic breathing and witness your thoughts without judgment, gently bringing your focus back to the mantra whenever the mind wanders. 🙏",
  "What are the five Jain principles?": "The five fundamental Jain principles (Mahavratas/Anuvratas) are: Ahimsa (Non-violence), Satya (Truthfulness), Asteya (Non-stealing), Brahmacharya (Chastity/Purity), and Aparigraha (Non-attachment). These guide a soul towards purity and liberation. 🕊️"
};

export const GURU_FALLBACK_RESPONSE = "I am currently in deep meditation and unable to respond. Please reflect on the Navkar Mantra and try asking again in a few moments. 🙏";
