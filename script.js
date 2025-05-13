const colorCodeContainer = document.getElementById("color-code");
const optionContainer = document.getElementById("option-container");
const scoreDisplay = document.getElementById("score-display"); // Don't overwrite this later

let score = parseInt(localStorage.getItem("score")) || 0;
let randomColor = null;

function generateRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomColorRGB() {
  const r = generateRandomNumberBetween(0, 255);
  const g = generateRandomNumberBetween(0, 255);
  const b = generateRandomNumberBetween(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function updateScoreDisplay() {
  scoreDisplay.innerText = `Score: ${score}`;
}

function incrementScore() {
  score += 1;
  localStorage.setItem("score", score);
  updateScoreDisplay();
}

function resetScore() {
  score = 0;
  localStorage.setItem("score", score);
  updateScoreDisplay();
}

function validateResult(event) {
  const selectedColor = event.target.style.backgroundColor;
  if (selectedColor === randomColor) {
    incrementScore();
  } else {
    resetScore();
  }
  startGame();
}

function startGame() {
  optionContainer.innerHTML = "";
  randomColor = generateRandomColorRGB();
  colorCodeContainer.innerText = randomColor;
  updateScoreDisplay();

  const answerIndex = generateRandomNumberBetween(0, 5);

  for (let i = 0; i < 6; i++) {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color-box");
    colorDiv.style.backgroundColor =
      i === answerIndex ? randomColor : generateRandomColorRGB();
    colorDiv.addEventListener("click", validateResult);
    optionContainer.appendChild(colorDiv);
  }
}

window.addEventListener("load", startGame);
