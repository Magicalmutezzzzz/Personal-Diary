const startBtn = document.getElementById("start-btn");
const transcriptEl = document.getElementById("transcript");
const timeline = document.getElementById("timeline");

startBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function (event) {
    const speechText = event.results[0][0].transcript;
    transcriptEl.innerText = "You said: " + speechText;
    generateTimeline(speechText);
  };

  recognition.onerror = function (event) {
    transcriptEl.innerText = "Error: " + event.error;
  };
});

async function generateTimeline(text) {
  timeline.innerHTML = ""; // clear previous entries
  const sentences = text.split(/\.|\band\b|,|\bthen\b/i);

  for (let sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed.length > 3) {
      const card = document.createElement("div");
      card.className = "event";
      card.innerHTML = "?? " + capitalize(trimmed);

      try {
        const imgURL = await generateImage(trimmed);
        const img = document.createElement("img");
        img.src = imgURL;
        img.width = 256;
        card.appendChild(img);
      } catch (err) {
        console.error("Image generation failed:", err);
      }

      timeline.appendChild(card);
    }
  }

  // Save to localStorage
  localStorage.setItem("lifemirror_" + new Date().toISOString(), text);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function generateImage(prompt) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1,
      size: "256x256"
    })
  });

  const data = await response.json();
  return data.data[0].url;
}

function downloadPDF() {
  const element = document.getElementById("timeline");
  html2pdf().from(element).save("LifeMirror_Timeline.pdf");
}

function loadHistory() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith("lifemirror_"));
  let historyHTML = "<h3>??? Past Logs:</h3>";
  keys.forEach(key => {
    historyHTML += `<div><strong>${key}</strong>: ${localStorage.getItem(key)}</div><hr>`;
  });
  timeline.innerHTML = historyHTML;
}