const words = [
  "apple",
  "pear",
  "cherry",
  "banana",
  "walnut",
  "grape",
  "lychee",
  "pineapple",
  "mango",
];
const character = document.getElementById("char");
const btn = document.getElementById("btn");
const check = document.getElementById("check");
const newGame = document.getElementById("newGame");
const word = document.getElementById("word");
const error = document.getElementById("error");
const bad = document.getElementById("bad");
const badChars = document.getElementById("badChars");
const badCharsMobile = document.getElementById("badCharsMobile");
const checkWrapper = document.getElementById("checkWrapper");
checkWrapper.classList.add("dNone");
let randWord = "";
let badArr = [];

btn.addEventListener("click", () => {
  badArr = [];
  badChars.innerHTML = null;
  randWord = words[Math.floor(Math.random() * words.length)];
  localStorage.setItem("word", randWord);
  character.value = null;
  bad.innerHTML = null;
  word.innerHTML = null;
  checkWrapper.classList.remove("dNone");
  checkWrapper.classList.add("d-flex", "flex-column");
  error.innerHTML = null;

  if (word.innerHTML !== "") {
    return;
  } else {
    bad.innerHTML = `<div class="badChar"><span class="ms-3">${badArr.length} / 10</span></div>`;
    randWord = localStorage.getItem("word");
    const randWordArr = [...randWord];

    for (let i = 0; i < randWordArr.length; i++) {
      const element = randWordArr[i];
      let input = document.createElement("input");
      input.id = i;
      input.setAttribute("name", element);
      input.disabled = true;

      if (char === element) {
        input.setAttribute("value", element);
      }

      input.innerHTML += element;
      word.appendChild(input);
    }
  }
});

check.addEventListener("click", () => {
  randWord = localStorage.getItem("word");
  const randWordArr = [...randWord];
  const char = character.value;
  let findChar = [];

  if (char === "" || char === " ") {
    character.value = null;
  } else {
    for (let i = 0; i < randWordArr.length; i++) {
      const input = document.getElementById(i);
      const element = randWordArr[i];

      findChar = randWordArr.filter((item, i) => {
        return item.charAt(element) === char;
      });

      if (char === element) {
        input.setAttribute("value", element);
      }
    }

    if (findChar.length === 0) {
      badArr.push("I");
      badChars.innerHTML += `<span class="mx-2">${char}</span>`;
      badCharsMobile.innerHTML += `<span class="me-3">${char}</span>`;
    }

    if (10 > badArr.length) {
      bad.innerHTML = `<div class="badChar"><span class="ms-3">${badArr.length} / 10</span></div>`;
      const children = word.children;
      let childrenArr = [];

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (child.value) {
          childrenArr.push(true);
        } else {
          childrenArr.push(false);
        }
      }

      const isFalse = childrenArr.filter((item) => {
        return item === false;
      });

      if (isFalse.length === 0) {
        word.innerHTML = `<div class='endText'>The word is: <span class="ms-3">${randWord}</span></div>`;
        bad.innerHTML = "<div class='win'>You Win!</div>";
        checkWrapper.classList.add("dNone");
        checkWrapper.classList.remove("d-flex", "flex-column");
        localStorage.removeItem("badArr");
        badChars.innerHTML = null;
      }
    } else {
      word.innerHTML = `<div class='endText'>The word is: <span class="ms-3">${randWord}</span></div>`;
      bad.innerHTML = "<div class='lost'>You Lost!</div>";
      checkWrapper.classList.add("dNone");
      checkWrapper.classList.remove("d-flex", "flex-column");
      localStorage.removeItem("badArr");
      badArr.length = 0;
      badChars.innerHTML = null;
    }

    character.value = null;
  }
});
