const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search states.json and filter it

const searchStates = async searchText => {
  const res = await fetch("../data/states.json");
  const states = await res.json();

  // Get matches to current textinput
  let matches = states.filter(state => {
    // matches start of sentence based on the input, also contains the global and the case insensitive flags
    const regex = new RegExp(`^${searchText}`, "gi");
    // return array that matches those
    return state.name.match(regex) || state.abbr.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    // also remove the html after you removed the search terms
    matchList.innerHTML = "";
  }
  outputHTML(matches);
};

// Show the results in the HTML
const outputHTML = matches => {
  if (matches.length > 0) {
    // map returns array from an array
    const html = matches
      .map(
        match => `
        <div class="card card-body mb-4">
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
        `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchStates(search.value));

console.log("testing..");
