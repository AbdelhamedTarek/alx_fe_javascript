// Initialize an array to store quotes
let quotes = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    category: "Inspirational",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    category: "Motivational",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];

// Function to show a random quote using innerHTML
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById(
    "quoteDisplay"
  ).innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
}

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    document.getElementById("newQuoteText").value = ""; // Clear input field
    document.getElementById("newQuoteCategory").value = ""; // Clear input field
    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
