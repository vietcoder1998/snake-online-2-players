/** @format */
"use strict";
// define function

const s = 5;
const b = 2;
const w = 160;
const h = 80;
const fps = 60;
const v_rate = 1;

const c = document.getElementById("alien");

const heart = document.createElement("img");
heart.src =
  "https://upload.wikimedia.org/wikipedia/commons/f/f1/Heart_coraz%C3%B3n.svg";

const shipImg = document.createElement("img");
shipImg.src = "./galaxy.png";

let l = 3;

const ctx = c.getContext("2d");
const itx = c.getContext("2d");

let score = 0;
let pause = false;
let lk = "";
const ship = new Ship();
const aliens = [];

function pauseGame() {
  pause = !pause;
}

try {
  for (let i = 0; i < 3; i++) {
    aliens.push(new Alien());
  }

  setInterval(() => {
    if (!pause) {
      aliens.push(new Alien());
    }
  }, 1000);

  const vector = { x: 0, y: 0 };

  // define function
  document.addEventListener("keypress", (e) => {
    e.preventDefault();
    if (lk !== e.code) {
      vector.x = 0;
      vector.y = 0;
    }

    switch (e.code) {
      case "KeyW":
        vector.x = 0;
        vector.y -= v_rate;
        moveShip();

        break;
      case "KeyS":
        vector.x = 0;
        vector.y += 1;
        moveShip();

        break;
      case "KeyA":
        vector.x += -v_rate;
        vector.y = 0;
        moveShip();

        break;

      case "KeyD":
        vector.x += v_rate;
        vector.y = 0;
        moveShip();

        break;
      case "Space":
        ship.shooting();
        break;

      default:
        break;
    }

    lk = e.code;
  });

  function mapRender() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w * s, h * s);

    ctx.fillStyle = "white";
    ctx.font = "20px Comic Sans MS";
    ctx.fillText(`score : ${score}`, 20, 20);

    for (let i = 0; i < l; i++) {
      ctx.drawImage(heart, 200 + 10 * i, 10, s, s);
    }
  }

  function moveShip() {
    const { x, y } = ship.position;

    if (
      x + vector.x >= 0 &&
      x + vector.x < w * s - ship.size &&
      y + vector.y > 1 &&
      y + vector.y < h * s - ship.size
    ) {
      ship.moving(vector);
    }
  }

  function shipRender() {
    moveShip();

    ctx.fillStyle = "red";
    ctx.drawImage(
      shipImg,
      ship.position.x,
      ship.position.y,
      ship.size,
      ship.size
    );
  }

  function alienRender() {
    aliens.forEach((alien, index) => {
      const { x, y } = alien.position;

      ctx.fillStyle = alien.failure ? "green" : "purple";
      ctx.fillRect(x, y, alien.size, alien.size);

      // check ship outside map
      if (
        x + vector.x < 0 ||
        x + vector.x > w * s - alien.size ||
        y + vector.y < 1 ||
        y + vector.y > h * s - alien.size
      ) {
        aliens.splice(index, 1);
      }
    });
  }

  function checkCollision() {
    // check collision of alien and ship
    if (ship.bullets.length > 0 && aliens.length > 0) {
      aliens.forEach((alien, i) => {
        if (alien.isCollision(ship)) {
          aliens.splice(i, 1);
          l -= 1;
        }

        ship.bullets.forEach((bullet, ib) => {
          if (alien.isCollision(bullet)) {
            aliens.splice(i, 1);
            ship.bullets.splice(ib, 1);
            score += 1;
          }
        });
      });
    }
  }

  function bulletRender() {
    ship.bullets.forEach((bullet, i) => {
      const { x, y } = bullet.position;

      ctx.fillStyle = "yellow";
      ctx.fillRect(bullet.position.x, bullet.position.y, 2, 2);

      if (
        x + vector.x < 0 ||
        x + vector.x > w * s ||
        y + vector.y < 1 ||
        y + vector.y > h * s
      ) {
        ship.bullets.splice(i, 1);
      }
    });
  }

  function gameRender() {
    checkCollision();
    mapRender();
    shipRender();
    alienRender();
    bulletRender();
  }

  function startGame() {
    var runtime;
    try {
      runtime = setInterval(() => {
        if (l === 0) {
          clearInterval(runtime);
          alert("End game");
        } else if (ship && !pause) {
          ship.bullets.forEach((item) => {
            item.moving({ x: 1, y: 0 });
          });
          aliens.forEach((item) => {
            item.moving({ x: -0.5, y: 0 });
          });
          gameRender();
        }
      }, 1000 / 120);
    } catch (err) {
      pause = true;
      console.log(err);
      clearInterval(runtime);
      throw err;
    }
  }

  startGame();
} catch (error) {
  console.log(error);
}
