# ?? LifeMirror – Reflect Your Day With AI
 
 LifeMirror is a creative web application that lets you **speak about your day** and get an **AI-generated visual timeline** with the power of speech recognition, OpenAI's DALL·E image generation, and smart visualizations — all in your browser!
 
 ---
 
 ## ?? Features
 
 - ??? **Voice-to-Text Input** – Speak naturally and let the app transcribe your day.
 - ?? **Automatic Timeline Generation** – Your speech is broken into meaningful moments.
 - ??? **AI Image Generation** – Each timeline event comes with a DALL·E-generated image.
 - ?? **Download as PDF** – Save your day as a beautiful PDF timeline/poster.
 - ?? **Local History Storage** – View your past logs stored safely in your browser.
 
 ---
 
 ## ??? Technologies Used
 
 - HTML5 + CSS3 + JavaScript (Vanilla)
 - [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for voice input
 - [OpenAI DALL·E API](https://platform.openai.com/docs/guides/images) for image generation
 - [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) for exporting timeline
 - `localStorage` for saving user history
 
 ---
 
 ## ?? How to Run Locally
 
 1. Clone the repository or download the ZIP
 2. Replace your **OpenAI API Key** in `script.js`:
    ```javascript
    Authorization: "Bearer YOUR_OPENAI_API_KEY"
