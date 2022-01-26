class Ship {
  constructor(id) {
    this.id = id;
    this.points = 0;
    this.damage = 0;
    this.element = document.querySelector(`#${id}`);
    this.elementPoints = document.querySelector(`#${id}>p`);
  }

  updatePoints() {
    this.elementPoints.innerHTML = `${this.points}`;
  }

  hit() {
    this.points -= this.damage;
    this.updatePoints();
  }

  destroy() {
    this.element.style.visibility = "hidden";
  }

  display() {
    this.element.style.visibility = "visible";
  }
}

class MotherShip extends Ship {
  constructor(id) {
    super(id);
    this.points = 100;
    this.damage = 9;
  }
}

class DefenceShip extends Ship {
  constructor(id) {
    super(id);
    this.points = 80;
    this.damage = 10;
  }
}

class AttackShip extends Ship {
  constructor(id) {
    super(id);
    this.points = 45;
    this.damage = 12;
  }
}

const fireButton = document.querySelector(".player");
const restartButton = document.querySelector(".gameOverModal__button");
const gameOverModal = document.querySelector(".gameOverModal");
let ships = [];

function setUpGame() {
  for (let i = 0; i < 14; i++) {
    if (i === 0) {
      ships.push(new MotherShip(`ship_${i}`));
    } else if (i > 0 && i <= 5) {
      ships.push(new DefenceShip(`ship_${i}`));
    } else {
      ships.push(new AttackShip(`ship_${i}`));
    }
  }

  for (const ship of ships) {
    ship.updatePoints();
    ship.display();
  }
}

function gameOver() {
  for (const ship of ships) {
    ship.destroy();
    ships = [];
  }

  gameOverModal.style.display = "flex";
}

function fire() {
  const index = Math.floor(Math.random() * ships.length);
  const ship = ships[index];

  ship.hit();

  if (ship.points <= 0) {
    ships.splice(index, 1);
    ship.destroy();

    if (index === 0) {
      gameOver();
    }
  }
}

fireButton.addEventListener("click", () => fire());
restartButton.addEventListener("click", () => {
  setUpGame();
  gameOverModal.style.display = "none";
});

setUpGame();
