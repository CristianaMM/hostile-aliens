export class Ship {
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

export class MotherShip extends Ship {
  constructor(id) {
    super(id);
    this.points = 100;
    this.damage = 9;
  }
}

export class DefenceShip extends Ship {
  constructor(id) {
    super(id);
    this.points = 80;
    this.damage = 10;
  }
}

export class AttackShip extends Ship {
  constructor(id) {
    super(id);
    this.points = 45;
    this.damage = 12;
  }
}

export class Game {
  constructor() {
    this.ships = [];
    this.fireButton = document.querySelector(".player");
    this.restartButton = document.querySelector(".gameOverModal__button");
    this.gameOverModal = document.querySelector(".gameOverModal");
  }

  setUpGame() {
    this.fireButton.addEventListener("click", () => this.fire());

    this.restartButton.addEventListener("click", () => {
      this.setUpGame();
      this.gameOverModal.style.display = "none";
    });

    for (let i = 0; i < 14; i++) {
      if (i === 0) {
        this.ships.push(new MotherShip(`ship_${i}`));
      } else if (i > 0 && i <= 5) {
        this.ships.push(new DefenceShip(`ship_${i}`));
      } else {
        this.ships.push(new AttackShip(`ship_${i}`));
      }
    }

    for (const ship of this.ships) {
      ship.updatePoints();
      ship.display();
    }
  }

  gameOver() {
    for (const ship of this.ships) {
      ship.destroy();
    }

    this.ships = [];

    this.gameOverModal.style.display = "flex";
  }

  fire() {
    const index = Math.floor(Math.random() * this.ships.length);
    const ship = this.ships[index];

    ship.hit();

    if (ship.points <= 0) {
      this.ships.splice(index, 1);
      ship.destroy();

      if (index === 0) {
        this.gameOver();
      }
    }
  }
}
