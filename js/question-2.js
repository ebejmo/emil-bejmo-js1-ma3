const apiKey = "eb14e45c72ef45e1853f8f8199ae3b50";
const url = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${apiKey}`;

const loader = document.querySelector(".loader");
const resultsContainer = document.querySelector(".results");

function showGames() {
  loader.style.opacity = 0;
  loader.style.display = "none";

  resultsContainer.style.display = "flex";
  resultsContainer.style.opacity = 1;
}

function errorMessage(errorType = "error", message = "") {
  return `<div class="${errorType}">${message}</div>`;
}

async function getGames() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const gameFacts = data.results;

    resultsContainer.innerHTML = "";

    for (let i = 0; i < gameFacts.length; i++) {
      if (i === 8) {
        break;
      }

      resultsContainer.innerHTML += `<div class ="game">
                                        <div class="game-title">
                                            <h2>${gameFacts[i].name}</h2>
                                        </div>
                                        <div class="game-info">
                                            <h3>Rating</h3>
                                            <p class="info">${gameFacts[i].rating}</p>
                                            <h3>Number of tags<h3>
                                            <p class="info">${gameFacts[i].tags.length}</p>
                                        </div>
                                    </div>`;
    }
  } catch (error) {
    resultsContainer.innerHTML = errorMessage("error", error);
    resultsContainer.style.marginTop = "40px";
  }
}

setTimeout(showGames, 3000);
getGames();
