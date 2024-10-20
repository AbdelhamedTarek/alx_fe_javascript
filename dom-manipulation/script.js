// function createAddQuoteForm() {
//   const formDiv = document.createElement("div");

//   const textInput = document.createElement("input");
//   textInput.id = "newQuoteText";
//   textInput.type = "text";
//   textInput.placeholder = "Enter a new quote";

//   const categoryInput = document.createElement("input");
//   categoryInput.id = "newQuoteCategory";
//   categoryInput.type = "text";
//   categoryInput.placeholder = "Enter quote category";

//   const addButton = document.createElement("button");
//   addButton.innerText = "Add Quote";
//   addButton.onclick = addQuote; // Attach the addQuote function

//   formDiv.appendChild(textInput);
//   formDiv.appendChild(categoryInput);
//   formDiv.appendChild(addButton);

//   document.body.appendChild(formDiv);
// }

// let quotes = [
//   {
//     text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
//     category: "Inspirational",
//   },
//   {
//     text: "The way to get started is to quit talking and begin doing.",
//     category: "Motivational",
//   },
//   {
//     text: "Life is what happens when you're busy making other plans.",
//     category: "Life",
//   },
// ];

// // Function to show a random quote using innerHTML
// function showRandomQuote() {
//   if (quotes.length === 0) {
//     document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
//     return;
//   }
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const quote = quotes[randomIndex];
//   document.getElementById(
//     "quoteDisplay"
//   ).innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
// }
// // Function to create the add quote form

// // Call the createAddQuoteForm function to generate the form when the page loads
// createAddQuoteForm();

// // Function to add a new quote
// function addQuote() {
//   const quoteText = document.getElementById("newQuoteText").value;
//   const quoteCategory = document.getElementById("newQuoteCategory").value;

//   if (quoteText && quoteCategory) {
//     quotes.push({ text: quoteText, category: quoteCategory });
//     document.getElementById("newQuoteText").value = ""; // Clear input field
//     document.getElementById("newQuoteCategory").value = ""; // Clear input field
//     alert("Quote added successfully!");
//   } else {
//     alert("Please fill in both fields.");
//   }
// }

// // Event listeners
// document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initialize an array to store quotes, loading from local storage if available
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
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

// Function to create the add quote form
function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.innerText = "Add Quote";
  addButton.onclick = addQuote;

  const exportButton = document.createElement("button");
  exportButton.innerText = "Export Quotes";
  exportButton.onclick = exportToJson;

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.id = "importFile";
  importInput.accept = ".json";
  importInput.onchange = importFromJsonFile;

  formDiv.appendChild(textInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);
  formDiv.appendChild(exportButton);
  formDiv.appendChild(importInput);

  document.body.appendChild(formDiv);
}

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes(); // Save quotes to local storage
    document.getElementById("newQuoteText").value = ""; // Clear input field
    document.getElementById("newQuoteCategory").value = ""; // Clear input field
    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Export quotes to JSON file
function exportToJson() {
  const json = JSON.stringify(quotes, null, 2); // Format JSON
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url); // Clean up
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes(); // Update local storage
    alert("Quotes imported successfully!");
    showRandomQuote(); // Optional: Show a quote after import
  };
  fileReader.readAsText(event.target.files[0]);
}

// Call the createAddQuoteForm function to generate the form when the page loads
createAddQuoteForm();

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
