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

// Function to show a random quote
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

  // Store the last viewed quote in session storage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Function to create a new quote
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
  const json = JSON.stringify(quotes, null, 2); // Convert quotes array to JSON format
  const blob = new Blob([json], { type: "application/json" }); // Create a Blob from the JSON
  const url = URL.createObjectURL(blob); // Create a URL for the Blob

  // Create a temporary anchor element for downloading
  const a = document.createElement("a");
  a.href = url; // Set the href to the Blob URL
  a.download = "quotes.json"; // Set the filename for the download
  a.click(); // Programmatically click the anchor to trigger the download
  URL.revokeObjectURL(url); // Clean up the URL object
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes(); // Update local storage
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Call the function to load the last viewed quote when the page loads
window.onload = function () {
  const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
  if (lastQuote) {
    document.getElementById(
      "quoteDisplay"
    ).innerHTML = `"${lastQuote.text}" - <strong>${lastQuote.category}</strong>`;
  }
};

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addQuote);
document.getElementById("exportButton").addEventListener("click", exportToJson);
