import data from "./data.json";

const inputEl = document.querySelector("#floatingInputGroup1");
console.log(inputEl);

inputEl.focus();

document.addEventListener("keyup", (input) => {
  if (input.key === "/") {
    inputEl.focus();
  }
});

// for (let object of data) {
//   console.log(object.name);
// }
