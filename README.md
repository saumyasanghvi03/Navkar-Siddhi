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
- **Jain Vibes ✨**: AI-powered spiritual affirmations with a resilient fallback system for offline use.
- **Ask the Guru 🙏**: Instant answers for common spiritual questions and AI-powered guidance for deeper inquiries.

## Local Development

To run the application locally on your machine:

1.  **Clone the repository**: `git clone https://github.com/saumyasanghvi03/navkarsiddhi`
2.  **Install dependencies**: `npm install`
3.  **Run the dev server**: `npm run dev`
4.  **Access the app**: The application starts on **[http://localhost:9003](http://localhost:9003)**.

## Configuration

To enable AI features (**Jain Vibes** and **Ask the Guru**), configure the following environment variable in Vercel or your local `.env` file:

- `GOOGLE_GENAI_API_KEY`: Your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/).

> [!NOTE]
> If the API key is not configured, the app will automatically use high-quality **fallback affirmations** to ensure a seamless experience.

## Troubleshooting

### AI Features
- **Vibe Generation**: If you recently updated environment variables on Vercel, you must **manual redeploy** the application for changes to take effect.
- **Vercel Analytics**: If you encounter build errors related to `@vercel/analytics`, ensure the package is installed and imported as `@vercel/analytics/react`.
