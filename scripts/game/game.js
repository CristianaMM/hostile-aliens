class Ship {
  constructor(id) {
    this.id = id;
    this.points = 0;
    this.damage = 0;
  }

  getId() {
    return this.id;
  }

  getPoints() {
    return this.points;
  }

  hit() {
    this.points -= this.damage;

    return this.points;
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

let ships = [];

for (let i = 1; i <= 14; i++) {
  if (i === 1) {
    ships.push(new MotherShip(`ship${i}`));
  } else if (i > 1 && i <= 6) {
    ships.push(new DefenceShip(`ship${i}`));
  } else {
    ships.push(new AttackShip(`ship${i}`));
  }
}
