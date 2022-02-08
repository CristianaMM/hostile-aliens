import { AttackShip, DefenceShip, MotherShip, Ship, Game } from "./game";

describe("Test Ships class", () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <section class="player"></section>
      <div class="gameOverModal">
          <button class="gameOverModal__button"></button>
      </div>
      <div id="id_1">
          <p></p>
      </div>
    `;
  });

  describe("Hit ship", () => {
    test("Mothership", () => {
      const ship = new MotherShip("id_1");

      ship.hit();

      expect(ship.points).toBe(91);
      expect(ship.elementPoints.innerHTML).toBe("91");
    });

    test("Defense ship", () => {
      const ship = new DefenceShip("id_1");

      ship.hit();

      expect(ship.points).toBe(70);
      expect(ship.elementPoints.innerHTML).toBe("70");
    });

    test("Attack ship", () => {
      const ship = new AttackShip("id_1");

      ship.hit();

      expect(ship.points).toBe(33);
      expect(ship.elementPoints.innerHTML).toBe("33");
    });
  });

  describe("Test ship visibility", () => {
    test("Destroy", () => {
      const ship = new MotherShip("id_1");

      ship.destroy();

      expect(ship.element.style.visibility).toBe("hidden");
    });

    test("Display", () => {
      const ship = new MotherShip("id_1");

      ship.display();

      expect(ship.element.style.visibility).toBe("visible");
    });
  });
});

describe("Test Game class", () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <section class="gameOverModal">
      <button class="gameOverModal__button">RESTART</button>
    </section>
    <section class="player"></section>
    `;
  });

  describe("Set Up game", () => {
    const mockUpdatePoints = jest.fn();
    const mockDisplay = jest.fn();

    beforeEach(() => {
      Ship.prototype.updatePoints = mockUpdatePoints;
      Ship.prototype.display = mockDisplay;
    });

    test("Test if the number of ships is correct", () => {
      const game = new Game();
      game.setUpGame();

      expect(game.ships.length).toBe(14);
      expect(mockUpdatePoints).toHaveBeenCalledTimes(14);
      expect(mockDisplay).toHaveBeenCalledTimes(14);
    });

    test("Test if the game has the right ships", () => {
      const game = new Game();

      const ships = {
        MotherShip: 0,
        DefenceShip: 0,
        AttackShip: 0,
      };

      game.setUpGame();

      for (const ship of game.ships) {
        ships[ship.constructor.name] += 1;
      }

      expect(ships.MotherShip).toBe(1);
      expect(ships.DefenceShip).toBe(5);
      expect(ships.AttackShip).toBe(8);
    });
  });

  describe("Game Over", () => {
    const mockDestroy = jest.fn();

    beforeEach(() => {
      Ship.prototype.destroy = mockDestroy;
    });

    test("Test if all ships are destroyed", () => {
      const game = new Game();
      game.setUpGame();

      game.gameOver();

      expect(mockDestroy).toHaveBeenCalledTimes(14);
    });

    test("Test if ships array is cleared", () => {
      const game = new Game();
      game.setUpGame();

      game.gameOver();

      expect(game.ships.length).toBe(0);
    });

    test("Test if Game Over modal is displayed", () => {
      const game = new Game();
      game.setUpGame();

      game.gameOver();

      expect(game.gameOverModal.style.display).toBe("flex");
    });
  });

  describe("Fire", () => {
    const mockDestroy = jest.fn();

    beforeEach(() => {
      Ship.prototype.destroy = mockDestroy;
    });

    test("Test if points decrease", () => {
      const game = new Game();

      game.ships.push(new AttackShip("ship_1"));

      const initialPoints = game.ships[0].points;

      game.fire();

      expect(game.ships[0].points).toBeLessThan(initialPoints);
    });

    test("Test if removes ship from array and destroy", () => {
      const game = new Game();

      game.ships.push(new AttackShip("ship_1"));

      for (let i = 0; i < 4; i++) {
        game.fire();
      }

      expect(game.ships.length).toBe(0);
      expect(mockDestroy).toHaveBeenCalledTimes(1);
    });

    test("Test if game over when mothership is destroyed", () => {
      const game = new Game();

      game.ships.push(new MotherShip("ship_1"));

      for (let i = 0; i < 12; i++) {
        game.fire();
      }

      expect(game.gameOverModal.style.display).toBe("flex");
    });
  });
});
