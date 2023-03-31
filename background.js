// Get the input and output elements
const tokenInput = document.getElementById("token-input");
const textInput = document.getElementById("text-input");
const translationOutput = document.getElementById("translation-output");

let apiKey = "";

// Add an event listener to store the token
document.getElementById("token-save-button").addEventListener("click", () => {
  const text = tokenInput.value;
  apiKey = text;
});

// Add an event listener to the translate button
document.getElementById("translate-button").addEventListener("click", () => {
  const text = textInput.value;

  translateText(text).then(result => (translationOutput.textContent = result));
});

// Function to translate text
async function translateText(text) {
  const apiEndpoint = "https://api.openai.com/v1/completions";

  if (!apiKey) {
    return "";
  }

  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: `Translate "${text}" to Chinese.`,
      model: "text-davinci-003",
      max_tokens: 10,
      n: 1,
      stop: "."
    })
  });

  const data = await response.json();

  if (response.ok) {
    // Return the translation from the API response
    return data.choices[0].text.trim();
  } else {
    // Handle error response
    console.error("Error:", data);
    //throw new Error('Translation failed.');
    return "Translation failed.";
  }
}
