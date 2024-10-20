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

// Load last selected category from local storage
const lastSelectedCategory =
  localStorage.getItem("lastSelectedCategory") || "all";
document.getElementById("categoryFilter").value = lastSelectedCategory;

// Function to show quotes based on the selected category
function displayQuotes(category = "all") {
  const filteredQuotes =
    category === "all" ? quotes : quotes.filter((q) => q.category === category);

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML =
      "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  document.getElementById(
    "quoteDisplay"
  ).innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
}

// Function to show a random quote
function showRandomQuote() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  displayQuotes(selectedCategory);

  // Store the last viewed quote in session storage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Function to populate categories in the dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map((q) => q.category))]; // Unique categories

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastSelectedCategory", selectedCategory); // Save last selected category
  displayQuotes(selectedCategory);
}

// Function to create a new quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes(); // Save quotes to local storage
    updateCategories(quoteCategory); // Update categories dropdown
    document.getElementById("newQuoteText").value = ""; // Clear input field
    document.getElementById("newQuoteCategory").value = ""; // Clear input field
    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}

// Update categories in the dropdown if a new category is introduced
function updateCategories(newCategory) {
  const categoryFilter = document.getElementById("categoryFilter");
  const existingCategories = [...categoryFilter.options].map(
    (option) => option.value
  );

  if (!existingCategories.includes(newCategory)) {
    const option = document.createElement("option");
    option.value = newCategory;
    option.textContent = newCategory;
    categoryFilter.appendChild(option);
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Export quotes to JSON file
function exportToJson() {
  const json = JSON.stringify(quotes, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes(); // Update local storage
    alert("Quotes imported successfully!");
    populateCategories(); // Update categories in the dropdown
    displayQuotes(); // Display quotes after import
  };
  fileReader.readAsText(event.target.files[0]);
}

// Call the functions when the page loads
window.onload = function () {
  populateCategories(); // Populate categories
  showRandomQuote(); // Show a random quote based on the last selected category
};

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteButton").addEventListener("click", addQuote);
document.getElementById("exportButton").addEventListener("click", exportToJson);
