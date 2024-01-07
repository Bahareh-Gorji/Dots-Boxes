//?? main element(game's part) + header element(turns)//?
//! number of dots' rows  & columns

let numberOfDotRows = prompt(
  "Enter number of dots' rows based on screen size:",
  7
);
while (!Number(numberOfDotRows) || numberOfDotRows < 3) {
  numberOfDotRows = prompt(
    "Enter number of dots' rows based on screen size:",
    7
  );
}

//! number of all(both dot-line & line-space) rows (also columns;))

const numberOfAllRows = numberOfDotRows * 2 - 1;

//! creating rows & appending them

const mainEle = document.querySelector("main");
for (let i = 1; i <= numberOfAllRows; i++) {
  const row = document.createElement("div");
  i % 2 !== 0
    ? row.setAttribute("class", "dot-line-row")
    : row.setAttribute("class", "line-space-row");
  row.classList.add(`${i}`);
  mainEle.append(row);
}

//!creating columns of dot-line rows

const dotLineRows = document.querySelectorAll(".dot-line-row");
dotLineRows.forEach((row) => {
  for (let i = 1; i <= numberOfAllRows; i++) {
    const columnOfRow = document.createElement("div");
    if (i % 2 !== 0) {
      columnOfRow.setAttribute("class", "dot");
    } else {
      columnOfRow.setAttribute("class", "h-line");
      columnOfRow.classList.add(`${i}`);
    }
    row.append(columnOfRow);
  }
});

//! creating columns of line-space rows

const lineSpaceRows = document.querySelectorAll(".line-space-row");
lineSpaceRows.forEach((row) => {
  for (let i = 1; i <= numberOfAllRows; i++) {
    const columnOfRow = document.createElement("div");
    if (i % 2 !== 0) {
      columnOfRow.setAttribute("class", "v-line");
      columnOfRow.classList.add(`${i}`);
    } else {
      columnOfRow.setAttribute("class", "space");
    }
    row.append(columnOfRow);
  }
});

//! creating boxes checks functions for using in our event listeners later(for checking after each click)
//? top box in horizontal lines
function topBoxCheck(line) {
  return (
    !line.parentElement.classList.contains("1") &&
    line.parentElement.previousElementSibling.previousElementSibling.children[
      Number(line.classList[1]) - 1
    ].style.backgroundColor !== "" &&
    line.parentElement.previousElementSibling.children[
      Number(line.classList[1]) - 2
    ].style.backgroundColor !== "" &&
    line.parentElement.previousElementSibling.children[
      Number(line.classList[1])
    ].style.backgroundColor !== ""
  );
}
//? bottom box in horizontal lines
function bottomBoxCheck(line) {
  return (
    !line.parentElement.classList.contains(`${numberOfAllRows}`) &&
    line.parentElement.nextElementSibling.nextElementSibling.children[
      Number(line.classList[1]) - 1
    ].style.backgroundColor !== "" &&
    line.parentElement.nextElementSibling.children[
      Number(line.classList[1]) - 2
    ].style.backgroundColor !== "" &&
    line.parentElement.nextElementSibling.children[Number(line.classList[1])]
      .style.backgroundColor !== ""
  );
}
//? left box in vertical lines
function leftBoxCheck(line) {
  return (
    !line.classList.contains("1") &&
    line.parentElement.children[Number(line.classList[1]) - 3].style
      .backgroundColor !== "" &&
    line.parentElement.previousSibling.children[Number(line.classList[1]) - 2]
      .style.backgroundColor !== "" &&
    line.parentElement.nextElementSibling.children[
      Number(line.classList[1]) - 2
    ].style.backgroundColor !== ""
  );
}
//? right box in vertical lines
function rightBoxCheck(line) {
  return (
    !line.classList.contains(`${numberOfAllRows}`) &&
    line.parentElement.children[Number(line.classList[1]) + 1].style
      .backgroundColor !== "" &&
    line.parentElement.previousSibling.children[Number(line.classList[1])].style
      .backgroundColor !== "" &&
    line.parentElement.nextElementSibling.children[Number(line.classList[1])]
      .style.backgroundColor !== ""
  );
}

//! Turns for moves(both game in main element and turns in header)

const playerColors = ["pink", "lightblue"];
const reversedPlayerColors = ["lightblue", "pink"];
let turn = 0;
const header = document.querySelector("header");
function turnControlFunc() {
  if (turn > 1) turn = 0;
}

//! Adding Event listeners for lines

mainEle.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("h-line") ||
    e.target.classList.contains("v-line")
  )
    lineAndTurnEvent(e.target);
});

//? event listener callback function
function lineAndTurnEvent(line) {
  if (!playerColors.includes(line.style.backgroundColor)) {
    turnControlFunc();
    line.style.backgroundColor = playerColors[turn];
    header.style.backgroundColor = reversedPlayerColors[turn];

    if (line.classList.contains("v-line")) {
      if (leftBoxCheck(line) || rightBoxCheck(line)) {
        header.style.backgroundColor = playerColors[turn];
        if (leftBoxCheck(line)) {
          line.parentElement.children[
            Number(line.classList[1]) - 2
          ].style.backgroundColor = playerColors[turn];
        }
        if (rightBoxCheck(line)) {
          line.parentElement.children[
            Number(line.classList[1])
          ].style.backgroundColor = playerColors[turn];
        }
      } else {
        turn++;
      }
    } else if (line.classList.contains("h-line")) {
      if (topBoxCheck(line) || bottomBoxCheck(line)) {
        header.style.backgroundColor = playerColors[turn];
        if (topBoxCheck(line)) {
          line.parentElement.previousElementSibling.children[
            Number(line.classList[1]) - 1
          ].style.backgroundColor = playerColors[turn];
        }
        if (bottomBoxCheck(line)) {
          line.parentElement.nextElementSibling.children[
            Number(line.classList[1]) - 1
          ].style.backgroundColor = playerColors[turn];
        }
      } else {
        turn++;
      }
    }
  }
}

//! footer element(buttons and popups)
//? reset button
const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", () => {
  location.reload();
});

//? calculate button
const calculateBtn = document.querySelector(".calculate");
const popup = document.querySelector(".popup-wrapper");
let popupClose = undefined;

calculateBtn.addEventListener("click", () => {
  const boxes = document.querySelectorAll(".space");
  let empty = 0;
  let pink = 0;
  let blue = 0;
  let winner = "";
  boxes.forEach((box) => {
    if (box.style.backgroundColor === "pink") {
      pink++;
    } else if (box.style.backgroundColor === "lightblue") {
      blue++;
    } else {
      empty++;
    }
  });
  if (pink > blue) {
    winner = "PINK";
  } else if (blue > pink) {
    winner = "BLUE";
  } else {
    winner = "NOBODY";
  }
  if (empty > 0) {
    popup.innerHTML = `<div class="popup"><div class="popup-close">close</div><div class="popup-content"><h1>The game is NOT finished yet!</h1></div></div>`;
  } else {
    popup.innerHTML = `<div class="popup"><div class="popup-close">close</div><div class="popup-content"><h1>${winner} is the winner</h1><button class="pabtn">Play again</button></div></div>`;

    //? play again button of pop up
    const playAgainBtn = document.querySelector(".pabtn");
    playAgainBtn.addEventListener("click", () => {
      location.reload();
    });
    if (winner === "PINK") {
      playAgainBtn.style.backgroundColor = "pink";
    } else if (winner === "BLUE") {
      playAgainBtn.style.backgroundColor = "lightblue";
    }
  }
  popup.style.display = "block";
  //? close button of popups
  popupClose = document.querySelector(".popup-close");
  popupClose.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
