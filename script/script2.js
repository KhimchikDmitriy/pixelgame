//Переменные

const screens = document.querySelectorAll(".screen"),
  board = document.querySelector(".board"),
  gg = document.querySelector(".gg"),
  userScore = document.querySelector(".score"),
  startBTN = document.querySelector("#start");

let ggPos = 500,
  score = 0,
  level = setInterval(() => {
    score++;
    userScore.innerHTML = score;
  }, 5000),
  audioVampire = document.getElementById("music-vampire"),
  audioDead = document.getElementById("music-dead");

function randome(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

userScore.innerHTML = score;

//Движение

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
    case "d":
    case "в":
      gg.style.left = `${(ggPos += 5)}px`;
      if (ggPos === 850) ggPos -= 20;
      // gg.style.background = "url(./img/game-gg-right.gif)";
      break;
    case "ArrowLeft":
    case "a":
    case "ф":
      gg.style.left = `${(ggPos -= 5)}px`;
      if (ggPos === 0) ggPos += 20;
      // gg.style.background = "url(./img/game-gg-right.gif)";
      break;
  }
});

//Игра

let doom = setInterval(() => gameLogic(), 250);

function gameLogic() {
  const fireball = document.createElement("div"),
    { width } = board.getBoundingClientRect(),
    x = randome(0, width - 70),
    y = randome(0, 20);

  let fireball_Y = y;
  fireball.classList.add("fireball");
  fireball.style.width = `120px`;
  fireball.style.height = `50px`;
  fireball.style.top = `${y}px`;
  fireball.style.left = `${x}px`;
  fireball.style.background = "url(../img/bat.gif)";
  board.append(fireball);

  let end = setInterval(() => {
    if (
      fireball_Y === 820 &&
      !(ggPos - 80 >= x || ggPos == x || ggPos + 32 <= x)
    ) {
      clearInterval(end);
      clearInterval(doom);
      clearInterval(level);
      fireball.remove();
      userScore.innerHTML = score;
      userScore.parentNode.classList.add("opacity");
      board.innerHTML = `<h1>YOU DEAD <br/> Ваш счёт: <span class = "primary">${score}<span> <br/>
      <a onclick='window.location.reload()'>Заново</a><br/><a href ='../index.html'>В главное меню</a>`;
      audioVampire.pause();
      audioDead.play();
    } else {
      fireball_Y++;
      fireball.style.top = `${fireball_Y}px`;
    }
    if (fireball_Y === 900) fireball.remove();
  }, 5);
}
