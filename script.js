const form = document.querySelector("form");
const result = document.querySelector(".result");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkWordInfo(form.elements[0].value);
  result.style.cssText = "display: block";
});

const checkWordInfo = async (word) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();

      let definitions = data[0].meanings[0].definitions[0];

      result.innerHTML = `
  <h2>word: ${data[0].word}</h2>
  <h3>part of speech: ${data[0].meanings[0].partOfSpeech}</h3>
  <h3>definition: ${
    definitions.definition === undefined ? "Not Found" : definitions.definition
  }</h3>
  <h3>example: ${
    definitions.example === undefined ? "Not Found" : definitions.example
  }</h3>
  <h3>Antonyms</h3>
  `;

      //   fetchung antonyms

      if (definitions.antonyms.length === 0) {
        result.innerHTML += "Not Found";
      } else {
        for (let i = 0; i < definitions.antonyms.length; i++) {
          result.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
        }
        console.log(data);
      }

    //   adding read more button

    result.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;

    } catch (error) {
        result.innerHTML = `<h3>sorry could not found !</h3>`;
    }
}

