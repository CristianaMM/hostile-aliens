export class Ship {
  constructor(id) {
    this.id = id;
    this.points = 0;
    this.damage = 0;
    this.element = document.querySelector(`#${id}`);
    this.elementPoints = document.querySelector(`#${id}>p`);
  }

  // Uptade ship points displayed on HTML.
  updatePoints() {
    this.elementPoints.innerHTML = `${this.points}`;
  }

  // Remove points from the ship and updates HTML.
  hit() {
    this.points -= this.damage;
    this.updatePoints();
  }

  // Hides ship.
  destroy() {
    this.element.style.visibility = "hidden";
  }

  // Shows ship.
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

    // Hit a ship when click the button.
    this.fireButton.addEventListener("click", () => this.fire());

    // Restart the game when click restart button.
    this.restartButton.addEventListener("click", () => {
      this.setUpGame();
      this.gameOverModal.style.display = "none";
    });
  }

  // Create new game.
  setUpGame() {
    // Create initial array of ships.
    for (let i = 0; i < 14; i++) {
      if (i === 0) {
        this.ships.push(new MotherShip(`ship_${i}`));
      } else if (i > 0 && i <= 5) {
        this.ships.push(new DefenceShip(`ship_${i}`));
      } else {
        this.ships.push(new AttackShip(`ship_${i}`));
      }
    }

    // Shows all the ships and their initial points.
    for (const ship of this.ships) {
      ship.updatePoints();
      ship.display();
    }
  }

  gameOver() {
    // Hides all ships.
    for (const ship of this.ships) {
      ship.destroy();
    }

    // Empty game array.
    this.ships = [];

    // Shows Game Over Modal.
    this.gameOverModal.style.display = "flex";
  }

  fire() {
    // Get random ship from the game array of ships.
    const index = Math.floor(Math.random() * this.ships.length);
    const ship = this.ships[index];

    // Remove points from the selected ship.
    ship.hit();

    if (ship.points <= 0) {
      // Remove ship from game array of ships.
      this.ships.splice(index, 1);
      // Hides ship.
      ship.destroy();

      if (index === 0) {
        // Game over when motherShip is destroyed.
        this.gameOver();
      }
    }
  }
}
