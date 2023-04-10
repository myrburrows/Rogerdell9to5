const myGame = Math.floor(Math.random() * 3);
console.log(myGame);

import { WORDS5 } from "./words5.js";
import { MYWORD5 } from "./myword5.js";
import { WORDS6 } from "./words6.js";
import { MYWORD6 } from "./myword6.js";
import { WORDS7 } from "./words7.js";
import { MYWORD7 } from "./myword7.js";
import { WORDS8 } from "./words8.js";
import { MYWORD8 } from "./myword8.js";
import { WORDS9 } from "./words9.js";
import { MYWORD9 } from "./myword9.js";

if (myGame === 1) {
  const NUMBER_OF_GUESSES = 6;
  let guessesRemaining = NUMBER_OF_GUESSES;
  let currentGuess = [];
  let nextLetter = 0;
  let rightGuessString = MYWORD6[Math.floor(Math.random() * MYWORD6.length)];

  console.log(rightGuessString);

  function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
      let row = document.createElement("div");
      row.className = "letter-row";

      for (let j = 0; j < 6; j++) {
        let box = document.createElement("div");
        box.className = "letter-box";
        row.appendChild(box);
      }

      board.appendChild(row);
    }
  }

  function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
      if (elem.textContent === letter) {
        let oldColor = elem.style.backgroundColor;
        if (oldColor === "green") {
          return;
        }

        if (oldColor === "yellow" && color !== "green") {
          return;
        }

        elem.style.backgroundColor = color;
        break;
      }
    }
  }

  function deleteLetter() {
    let row =
      document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
  }

  function checkGuess() {
    let row =
      document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let guessString = "";
    let rightGuess = Array.from(rightGuessString);

    for (const val of currentGuess) {
      guessString += val;
    }

    if (guessString.length != 6) {
      toastr.error("Not enough letters!");
      return;
    }

    if (!WORDS6.includes(guessString)) {
      toastr.error("Word not in list!");
      return;
    }

    var letterColor = ["gray", "gray", "gray", "gray", "gray", "gray"];

    //check green
    for (let i = 0; i < 6; i++) {
      if (rightGuess[i] == currentGuess[i]) {
        letterColor[i] = "green";
        rightGuess[i] = "#";
      }
    }

    //check yellow
    //checking guess letters
    for (let i = 0; i < 6; i++) {
      if (letterColor[i] == "green") continue;

      //checking right letters
      for (let j = 0; j < 6; j++) {
        if (rightGuess[j] == currentGuess[i]) {
          letterColor[i] = "yellow";
          rightGuess[j] = "#";
        }
      }
    }

    for (let i = 0; i < 6; i++) {
      let box = row.children[i];
      let delay = 250 * i;
      setTimeout(() => {
        //flip box
        animateCSS(box, "flipInX");
        //shade box
        box.style.backgroundColor = letterColor[i];
        shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
      }, delay);
    }

    if (guessString === rightGuessString) {
      toastr.success("You guessed right! Game over!");
      guessesRemaining = 0;
      return;
    } else {
      guessesRemaining -= 1;
      currentGuess = [];
      nextLetter = 0;

      if (guessesRemaining === 0) {
        toastr.error("You've run out of guesses! Game over!");
        toastr.info(`The right word was: "${rightGuessString}"`);
      }
    }
  }

  function insertLetter(pressedKey) {
    if (nextLetter === 6) {
      return;
    }
    pressedKey = pressedKey.toLowerCase();

    let row =
      document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter];
    animateCSS(box, "pulse");
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
  }

  const animateCSS = (element, animation, prefix = "animate__") =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      // const node = document.querySelector(element);
      const node = element;
      node.style.setProperty("--animate-duration", "0.3s");

      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve("Animation ended");
      }

      node.addEventListener("animationend", handleAnimationEnd, { once: true });
    });

  document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
      return;
    }

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
      deleteLetter();
      return;
    }

    if (pressedKey === "Enter") {
      checkGuess();
      return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
      return;
    } else {
      insertLetter(pressedKey);
    }
  });

  document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;

    if (!target.classList.contains("keyboard-button")) {
      return;
    }
    let key = target.textContent;

    if (key === "Del") {
      key = "Backspace";
    }

    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
  });

  initBoard();
}

else if (myGame === 0) {

  const NUMBER_OF_GUESSES = 6;
  let guessesRemaining = NUMBER_OF_GUESSES;
  let currentGuess = [];
  let nextLetter = 0;
  let rightGuessString = MYWORD5[Math.floor(Math.random() * MYWORD5.length)];
  
  console.log(rightGuessString);
  
  function initBoard() {
    let board = document.getElementById("game-board");
  
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
      let row = document.createElement("div");
      row.className = "letter-row";
  
      for (let j = 0; j < 5; j++) {
        let box = document.createElement("div");
        box.className = "letter-box";
        row.appendChild(box);
      }
  
      board.appendChild(row);
    }
  }
  
  function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
      if (elem.textContent === letter) {
        let oldColor = elem.style.backgroundColor;
        if (oldColor === "green") {
          return;
        }
  
        if (oldColor === "yellow" && color !== "green") {
          return;
        }
  
        elem.style.backgroundColor = color;
        break;
      }
    }
  }
  
  function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
  }
  
  function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let guessString = "";
    let rightGuess = Array.from(rightGuessString);
  
    for (const val of currentGuess) {
      guessString += val;
    }
  
    if (guessString.length != 5) {
      toastr.error("Not enough letters!");
      return;
    }
  
    if (!WORDS5.includes(guessString)) {
      toastr.error("Word not in list!");
      return;
    }
  
    var letterColor = ["gray", "gray", "gray", "gray", "gray"];
  
    //check green
    for (let i = 0; i < 5; i++) {
      if (rightGuess[i] == currentGuess[i]) {
        letterColor[i] = "green";
        rightGuess[i] = "#";
      }
    }
  
    //check yellow
    //checking guess letters
    for (let i = 0; i < 5; i++) {
      if (letterColor[i] == "green") continue;
  
      //checking right letters
      for (let j = 0; j < 5; j++) {
        if (rightGuess[j] == currentGuess[i]) {
          letterColor[i] = "yellow";
          rightGuess[j] = "#";
        }
      }
    }
  
    for (let i = 0; i < 5; i++) {
      let box = row.children[i];
      let delay = 250 * i;
      setTimeout(() => {
        //flip box
        animateCSS(box, "flipInX");
        //shade box
        box.style.backgroundColor = letterColor[i];
        shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
      }, delay);
    }
  
    if (guessString === rightGuessString) {
      toastr.success("You guessed right! Game over!");
      guessesRemaining = 0;
      return;
    } else {
      guessesRemaining -= 1;
      currentGuess = [];
      nextLetter = 0;
  
      if (guessesRemaining === 0) {
        toastr.error("You've run out of guesses! Game over!");
        toastr.info(`The right word was: "${rightGuessString}"`);
      }
    }
  }
  
  function insertLetter(pressedKey) {
    if (nextLetter === 5) {
      return;
    }
    pressedKey = pressedKey.toLowerCase();
  
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter];
    animateCSS(box, "pulse");
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
  }
  
  const animateCSS = (element, animation, prefix = "animate__") =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      // const node = document.querySelector(element);
      const node = element;
      node.style.setProperty("--animate-duration", "0.3s");
  
      node.classList.add(`${prefix}animated`, animationName);
  
      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve("Animation ended");
      }
  
      node.addEventListener("animationend", handleAnimationEnd, { once: true });
    });
  
  document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
      return;
    }
  
    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
      deleteLetter();
      return;
    }
  
    if (pressedKey === "Enter") {
      checkGuess();
      return;
    }
  
    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
      return;
    } else {
      insertLetter(pressedKey);
    }
  });
  
  document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;
  
    if (!target.classList.contains("keyboard-button")) {
      return;
    }
    let key = target.textContent;
  
    if (key === "Del") {
      key = "Backspace";
    }
  
    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
  });
  
  initBoard();
  
}

else if (myGame === 2) {

  const NUMBER_OF_GUESSES = 6;
  let guessesRemaining = NUMBER_OF_GUESSES;
  let currentGuess = [];
  let nextLetter = 0;
  let rightGuessString = MYWORD7[Math.floor(Math.random() * MYWORD7.length)];
  
  console.log(rightGuessString);
  
  function initBoard() {
    let board = document.getElementById("game-board");
  
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
      let row = document.createElement("div");
      row.className = "letter-row";
  
      for (let j = 0; j < 7; j++) {
        let box = document.createElement("div");
        box.className = "letter-box";
        row.appendChild(box);
      }
  
      board.appendChild(row);
    }
  }
  
  function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
      if (elem.textContent === letter) {
        let oldColor = elem.style.backgroundColor;
        if (oldColor === "green") {
          return;
        }
  
        if (oldColor === "yellow" && color !== "green") {
          return;
        }
  
        elem.style.backgroundColor = color;
        break;
      }
    }
  }
  
  function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
  }
  
  function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let guessString = "";
    let rightGuess = Array.from(rightGuessString);
  
    for (const val of currentGuess) {
      guessString += val;
    }
  
    if (guessString.length != 7) {
      toastr.error("Not enough letters!");
      return;
    }
  
    if (!WORDS7.includes(guessString)) {
      toastr.error("Word not in list!");
      return;
    }
  
    var letterColor = ["gray", "gray", "gray", "gray", "gray", "gray", "gray"];
  
    //check green
    for (let i = 0; i < 7; i++) {
      if (rightGuess[i] == currentGuess[i]) {
        letterColor[i] = "green";
        rightGuess[i] = "#";
      }
    }
  
    //check yellow
    //checking guess letters
    for (let i = 0; i < 7; i++) {
      if (letterColor[i] == "green") continue;
  
      //checking right letters
      for (let j = 0; j < 5; j++) {
        if (rightGuess[j] == currentGuess[i]) {
          letterColor[i] = "yellow";
          rightGuess[j] = "#";
        }
      }
    }
  
    for (let i = 0; i < 7; i++) {
      let box = row.children[i];
      let delay = 250 * i;
      setTimeout(() => {
        //flip box
        animateCSS(box, "flipInX");
        //shade box
        box.style.backgroundColor = letterColor[i];
        shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
      }, delay);
    }
  
    if (guessString === rightGuessString) {
      toastr.success("You guessed right! Game over!");
      guessesRemaining = 0;
      return;
    } else {
      guessesRemaining -= 1;
      currentGuess = [];
      nextLetter = 0;
  
      if (guessesRemaining === 0) {
        toastr.error("You've run out of guesses! Game over!");
        toastr.info(`The right word was: "${rightGuessString}"`);
      }
    }
  }
  
  function insertLetter(pressedKey) {
    if (nextLetter === 7) {
      return;
    }
    pressedKey = pressedKey.toLowerCase();
  
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let box = row.children[nextLetter];
    animateCSS(box, "pulse");
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
  }
  
  const animateCSS = (element, animation, prefix = "animate__") =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      // const node = document.querySelector(element);
      const node = element;
      node.style.setProperty("--animate-duration", "0.3s");
  
      node.classList.add(`${prefix}animated`, animationName);
  
      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve("Animation ended");
      }
  
      node.addEventListener("animationend", handleAnimationEnd, { once: true });
    });
  
  document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
      return;
    }
  
    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
      deleteLetter();
      return;
    }
  
    if (pressedKey === "Enter") {
      checkGuess();
      return;
    }
  
    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
      return;
    } else {
      insertLetter(pressedKey);
    }
  });
  
  document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;
  
    if (!target.classList.contains("keyboard-button")) {
      return;
    }
    let key = target.textContent;
  
    if (key === "Del") {
      key = "Backspace";
    }
  
    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
  });
  
  initBoard();
  
}
