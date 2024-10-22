// change Ordering
import { shuffle } from "fast-shuffle";
// Fuzzy searching
import Fuse from "fuse.js";
// Data
import data from "./data.json";
import PokemonCard from "./components/PokemonCard";

// DOM Selection
const inputEl = document.querySelector("input");
const pokemonRow = document.querySelector("[data-pokemon-row]");

// Render
function renderPokemons(list) {
  // Empty the previous content
  pokemonRow.innerHTML = "";
  // fragment flexible
  const fragment = document.createDocumentFragment();
  // Iterate
  list.forEach((pokemonObj) => {
    const { name, image, description, link } = pokemonObj;
    const pokemon = PokemonCard(name, image, description, link);
    fragment.appendChild(pokemon);
  });
  pokemonRow.appendChild(fragment);
}

// Filtering
function renderFilterPokemons(input) {
  console.log("hello");
  // const filteredPokemons = data.filter((obj) =>
  //   obj.name.toLowerCase().includes(input)
  // ); another option

  // (input === 0) another option
  if (!input) {
    return renderPokemons(data);
  }
  // fuzzing on data
  const fuse = new Fuse(data, {
    keys: ["name", "abilities"],
    // fuse Intensity
    threshold: 0.5,
  });

  const filteredPokemons = fuse.search(input).map((obj) => obj.item);

  // Fallback Pokemon Card
  if (!filteredPokemons.length) {
    renderPokemons([
      {
        name: "Not Found",
        image:
          "https://img.freepik.com/free-vector/horns-emoji-illustration_23-2151300267.jpg?w=740&t=st=1729151137~exp=1729151737~hmac=b612a9e3b3a87f1efc08ed4eee6e245a50e74f20717176c1362084a86ada7408",
        description: "Try a different search term",
        // link: "https://pokemon.com",
      },
    ]);

    return;
  }

  renderPokemons(filteredPokemons);
}
// Debouncing fctn
let Debouncing;
// Listen for input
// e = event > target > value
inputEl.addEventListener("input", (e) => {
  clearTimeout(Debouncing);
  Debouncing = setTimeout(() => {
    const currentInput = e.target.value.toLowerCase().trim();
    renderFilterPokemons(currentInput);
  }, 300);
});

// Add keyboard functionality
document.addEventListener("keyup", (event) => {
  if (event.key === "/") {
    inputEl.focus();
  }
});

// Inital Rendering
renderPokemons(shuffle(data));
