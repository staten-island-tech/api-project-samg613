import "./style.css";

const API_KEY = "5dca4716f00a4642833db8f51124df79";

async function getData(query = "") {
  const loadingSpinner = document.querySelector(".loading");
  const newsContainer = document.querySelector(".news-container");

  try {
    loadingSpinner.classList.remove("hidden");

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&from=2024-10-25&sortBy=publishedAt&apiKey=${API_KEY}`;

    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    } else {
      const data = await response.json();

      if (data.articles.length === 0) {
        newsContainer.innerHTML =
          "<p>No news found for your search. Please try again.</p>";
      } else {
        newsContainer.innerHTML = "";

        data.articles.forEach((article) => {
          const articleHTML = `
            <div class="bg-gray-200 p-4 m-2 rounded shadow-md">
              <h2 class="text-xl font-semibold">${article.title}</h2>
              <p class="text-sm text-gray-600">Published on: ${new Date(
                article.publishedAt
              ).toLocaleDateString()}</p>
              <p class="text-sm text-gray-700 mt-2">${
                article.description || "No description available."
              }</p>
              <a href="${
                article.url
              }" target="_blank" class="text-blue-500 mt-4 block">Read more</a>
            </div>
          `;
          newsContainer.insertAdjacentHTML("beforeend", articleHTML);
        });
      }
    }
  } catch (error) {
    alert("There was an error fetching the news. Please try again.");
    console.error(error);
  } finally {
    loadingSpinner.classList.add("hidden");
  }
}

window.onload = () => getData("tesla");

document.querySelector(".search-btn").addEventListener("click", () => {
  const query = document.querySelector(".search-input").value.trim();
  if (query) {
    getData(query);
  } else {
    alert("Please enter a search term.");
  }
});
