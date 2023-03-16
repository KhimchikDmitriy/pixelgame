/*Переменные и константы*/
const screens = document.querySelectorAll(".screen");
const board = document.querySelector(".board");
const gg = document.querySelector(".gg");
const userScore = document.querySelector(".score");
const startBTN = document.querySelector("#start");
let ggPos = 500;
let score = 0;
userScore.innerHTML = score;

/*Начало игры*/
startBTN.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});
let doom = setInterval(() => gameLogic(), 250);

/*Игрок*/
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
    case "d":
    case "в":
      gg.style.left = `${(ggPos += 5)}px`;
      if (ggPos === 850) ggPos -= 20;
      gg.style.background = "url(./img/game-gg-right.gif)";
      break;
    case "ArrowLeft":
    case "a":
    case "ф":
      gg.style.left = `${(ggPos -= 5)}px`;
      if (ggPos === 0) ggPos += 20;
      gg.style.background = "url(./img/game-gg-right.gif)";
      break;
  }
});

/*Создание и логика поведения фигур*/
function gameLogic() {
  const fireball = document.createElement("div");
  const { width } = board.getBoundingClientRect();
  const x = randome(0, width - 70);
  const y = randome(0, 20);
  let fireballPosY = y;
  fireball.classList.add("fireball");
  fireball.style.width = `70px`;
  fireball.style.height = `120px`;
  fireball.style.top = `${y}px`;
  fireball.style.left = `${x}px`;
  fireball.style.background = "url(./img/vremenno2.gif)";
  board.append(fireball);
  let end = setInterval(() => {
    if (
      fireballPosY === 730 &&
      !(ggPos - 32 >= x || ggPos == x || ggPos + 32 <= x)
    ) {
      clearInterval(end);
      clearInterval(doom);
      clearInterval(level);
      fireball.remove();
      userScore.innerHTML = score;
      userScore.parentNode.classList.add("hide");
      board.innerHTML = `<h1>YOU DIE <br/> Ваш счёт: <span class = "primary">${score}<span> <br/>
      <a class="start" onclick = 'window.location.reload();'>заново</a>`;
    } else {
      fireballPosY++;
      fireball.style.top = `${fireballPosY}px`;
    }
    if (fireballPosY === 900) fireball.remove();
  }, 5);
}
let level = setInterval(function () {
  score++;
  userScore.innerHTML = score;
}, 5000);
function randome(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
