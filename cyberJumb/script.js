let score = 0;
let cross = true;

audio = new Audio("Sounds/music.mp3");
audioGo = new Audio("Sounds/gameover.mp3");

setTimeout(()=>{
    audio.play()
},1000)

document.onkeydown = function (e) {
  console.log("key code is : ", e.keyCode);

  if (e.keyCode == 38) {
    dino = document.querySelector(".dino");
    dino.classList.add("animateDino");

    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  } else if (e.keyCode == 39) {
    dino = document.querySelector(".dino");
    dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );

    dino.style.left = dinoX + 112 + "px";
  } else if (e.keyCode == 37) {
    dino = document.querySelector(".dino");
    dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );

    dino.style.left = dinoX - 112 + "px";
  }
};

setInterval(() => {
  dino = document.querySelector(".dino");
  gameOver = document.querySelector(".gameOver");
  obstacle = document.querySelector(".obstacle");

  dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);

  if (offsetX < 73 && offsetY < 52) {
    gameOver.style.visibility = "visible";
    obstacle.classList.remove("obstacleAni");
    audioGo.play();

    setTimeout(()=>{
        audioGo.pause();
        audio.pause()
    },1000)

  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );

      newDur = aniDur - 0.3;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);

  }
}, 10);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}
