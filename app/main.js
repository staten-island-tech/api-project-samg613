import "./style.css";

const API_KEY = "5dca4716f00a4642833db8f51124df79";

async function getData(query = "", language = "en") {
  const loadingSpinner = document.querySelector(".loading");
  const newsContainer = document.querySelector(".news-container");

  try {
    loadingSpinner.classList.remove("hidden");

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&language=${language}&sortBy=publishedAt&apiKey=${API_KEY}`;

    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    } else {
      const data = await response.json();

      newsContainer.textContent = "";

      if (data.articles.length === 0) {
        newsContainer.insertAdjacentHTML(
          "beforeend",
          "<p> No news found for your search. Please try again.</p>"
        );
      } else {
        for (let i = 0; i < data.articles.length; i++) {
          const article = data.articles[i];
          const articleHTML = ` 
            <div class="bg-gray-200 p-4 m-2 rounded shadow-md hover:shadow-lg transition duration-300"> <h2 class="text-xl font-semibold text-gray-800 hover:text-blue-600">${
              article.title
            }</h2> <p class="text-sm text-gray-600">Published on: ${new Date(
            article.publishedAt
          ).toLocaleDateString()}</p> 
            <p class="text-sm text-gray-700 mt-2">${
              article.description || "No description available."
            }</p> 
            <a href="${
              article.url
            }" target="_blank" class="text-blue-500 hover:text-blue-700 mt-4 block transition duration-300">Read more</a> 
            </div> 
          `;
          newsContainer.insertAdjacentHTML("beforeend", articleHTML);
        }
      }
    }
  } catch (error) {
    alert("There was an error fetching the news. Please try again.");
    console.error(error);
  } finally {
    loadingSpinner.classList.add("hidden");
  }
}

window.onload = () => getData("technology", "en");

document.querySelector(".search-btn").addEventListener("click", () => {
  const query = document.querySelector(".search-input").value.trim();
  const language = document.querySelector(".language-selector").value;
  if (query) {
    getData(query, language);
    document.querySelector(".search-input").value = "";
  } else {
    alert("Please enter a search term.");
  }
});

document.querySelector(".language-selector").addEventListener("change", () => {
  const query = document.querySelector(".search-input").value.trim();
  const language = document.querySelector(".language-selector").value;
  getData(query, language);
});
