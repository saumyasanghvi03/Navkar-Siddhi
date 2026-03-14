# Navkar Siddhi Tap

A meditative tapping app to help improve focus by writing a mantra word-by-word.

## How to Use

- Tap anywhere on the screen to reveal the next word of the mantra.
- The app provides haptic feedback on each tap.
- Once a mantra is complete, your total count increases.
- Progress is tracked on the circular Mala ring.
- Your total count is saved automatically in your browser.
- Use the **Bhakti Music** button to play devotional YouTube tracks.
- Use **Mala Reset** (orange button) to restart your current mala without losing completed malas.
- Use **Lock Mode** to hide all controls for distraction-free practice.

## Features

- **Sequential Mantra Display**: Reveals one word at a time.
- **Mala Tracker**: Visual representation of mala progress with 9, 27, 36, or 108 beads.
- **Dynamic Themes**: Changes color themes upon mala completion.
- **Haptic Feedback**: Vibration feedback for taps and completions.
- **Data Persistence**: Saves progress in localStorage.
- **Bhakti Music**: Integrated devotional music player with YouTube tracks.
- **Mala Reset**: Reset current mala progress while preserving completed mala count.
- **Lock Mode**: Hide controls for focused, distraction-free meditation.
- **Jain Vibes ✨**: AI-powered spiritual affirmations and a "Guru" chat for Jain philosophy guidance.
- **PWA Support**: Install as a mobile app on iOS/Android devices.
- **Mobile Optimized**: Responsive design with safe area support for mobile webviews.

## Configuration

To enable AI features (**Jain Vibes** and **Ask the Guru**), you must configure the following environment variable in Vercel or your local `.env` file:

- \`GOOGLE_GENAI_API_KEY\`: Your Google Gemini API key. You can get one from the [Google AI Studio](https://aistudio.google.com/).

## Troubleshooting

### AI Features Not Working
- **Vibe Generation Fails**: Ensure `GOOGLE_GENAI_API_KEY` is correctly set in your environment variables. If you recently updated it on Vercel, you may need to redeploy the application for the changes to take effect.
- **Guru No Response**: Check if the API key has sufficient quota and that the `googleai/gemini-2.0-flash` model is available in your region.
