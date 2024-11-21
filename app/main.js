import "./style.css";

async function getData(query = "") {
  const loadingSpinner = document.querySelector(".loading");
  try {
    loadingSpinner.classList.remove("hidden");

    const url = query
      ? `https://zoo-animal-api.herokuapp.com/animals/search/${query}`
      : `https://zoo-animal-api.herokuapp.com/animals/rand/5`;

    const response = await fetch(url);
    if (response.status != 200) {
      throw new Error("Failed to fetch data");
    } else {
      const data = await response.json();
      console.log(data);

      const animals = data;
      const animalsContainer = document.querySelector(".animals-container");

      animalsContainer.innerHTML = "";

      if (animals.length === 0) {
        animalsContainer.innerHTML =
          "<p>No animals found. Please try another search.</p>";
      } else {
        animals.forEach((animal) => {
          const animalHTML = `
            <div class="bg-gray-200 p-4 m-2 rounded shadow-md">
              <h2 class="text-xl font-semibold">${animal.name}</h2>
              <p class="text-sm text-gray-600">Species: ${animal.species}</p>
              <img src="${animal.image_link}" alt="${animal.name}" class="w-32 h-32 object-cover rounded-full mx-auto mt-2" />
            </div>
          `;
          animalsContainer.insertAdjacentHTML("beforeend", animalHTML);
        });
      }
    }
  } catch (error) {
    alert("There was an error fetching the data. Please try again.");
    console.error(error);
  } finally {
    loadingSpinner.classList.add("hidden");
  }
}

window.onload = () => getData();

document.querySelector(".search-btn").addEventListener("click", () => {
  const query = document.querySelector(".search-input").value.trim();
  if (query) {
    getData(query);
  } else {
    alert("Please enter a search term.");
  }
});
