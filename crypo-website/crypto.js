// Select all the coin elements
const bitcoinPrice = document.querySelector(".coin:nth-child(1) h3");
const dogecoinPrice = document.querySelector(".coin:nth-child(2) h3");
const ethereumPrice = document.querySelector(".coin:nth-child(3) h3");

// Show a "loading" placeholder before fetching the prices
bitcoinPrice.textContent = "Loading...";
dogecoinPrice.textContent = "Loading...";
ethereumPrice.textContent = "Loading...";

// Function to fetch and update cryptocurrency prices
async function fetchCryptoPrices() {
  const apiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,dogecoin,ethereum&vs_currencies=usd";

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch cryptocurrency prices");
    }

    const data = await response.json();

    // Update the prices dynamically
    bitcoinPrice.textContent = `$${data.bitcoin.usd}`;
    dogecoinPrice.textContent = `$${data.dogecoin.usd}`;
    ethereumPrice.textContent = `$${data.ethereum.usd}`;
  } catch (error) {
    console.error("Error fetching cryptocurrency prices:", error);
    bitcoinPrice.textContent = "Error";
    dogecoinPrice.textContent = "Error";
    ethereumPrice.textContent = "Error";
  }
}

// Fetch the prices on page load
fetchCryptoPrices();

// Optional: Refresh the prices every minute
setInterval(fetchCryptoPrices, 60000);
