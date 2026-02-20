// player stats
let xp = 0;
let health = 100;
let gold = 50;

//monster stats
let monsterName = "Goblin";
let monsterHealth = 30;
let monsterDamage = 10;

// buttons documents
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

// display text document
const text = document.getElementById("text");

// player stats documents
xpText = document.getElementById("xpText");
healthText = document.getElementById("healthText");
goldText = document.getElementById("goldText");

// monster stats documents
monsterStats = document.getElementById("monsterStats");
monsterNameText = document.getElementById("monsterName");
monsterHealthText = document.getElementById("monsterHealth");

// monsters
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 12,
  },
  {
    name: "fang beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 200,
  },
];

// monster index
let monsterIndex = 0;

const weapons = [
  { name: "Stick", power: 5 },
  { name: "Dagger", power: 10 },
  { name: "Claw Hammer", power: 15 },
  { name: "Sword", power: 20 },
];

// player's weapons
const playerWeapon = [weapons[0]]; // start with stick}
// game locations
const locations = [
  // store
  {
    name: "store",
    displayText: "You are now in the store",
    buttons: [
      { name: "Buy Health (10 gold)", callback: buyHealth },
      { name: "Buy Weapon (30 gold)", callback: buyWeapon },
      { name: "Goto To Town", callback: goToTown },
    ],
  },

  // town
  {
    name: "town",
    displayText:
      "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.",
    buttons: [
      { name: "Go to store", callback: goToStore },
      { name: "Go to Cave", callback: gotoCave },
      { name: "Fight Dragon", callback: fightDragon },
    ],
  },

  // sell weapons
  {
    name: "sellWeapons (10 gold)",
    displayText:
      "You don't have enough gold to buy new weapons. You can sell your weapons here for 15 gold each.You can only sell your weapons if you have more than one weapon in your inventory.",
    buttons: [
      { name: "Sell Weapons (15 gold)", callback: sellWeapon },
      { name: "Buy Weapons (30 gold)", callback: buyWeapon },
      { name: "Go to Town", callback: goToTown },
    ],
  },

  // cave
  {
    name: "cave",
    displayText: "You are now in the cave. There are monsters here",
    buttons: [
      { name: "Fight Slime", callback: fightSlime },
      { name: "Fight Beast", callback: fightFangBeast },
      { name: "Goto To Town", callback: goToTown },
    ],
  },

  // fight stage
  {
    name: "fight stage",
    displayText: `Monsters Everywhere!!!!`,
    buttons: [
      { name: "Attack", callback: attack },
      { name: "Dodge", callback: dodge },
      { name: "Run", callback: goToTown },
    ],
  },

  // win
  {
    name: "win",
    displayText:
      "Congratulations! You have defeated the dragon and saved the town! You win!",
    buttons: [{ name: "Play Again", callback: goToTown }],
  },

  // lose
  {
    name: "lose",
    displayText: `You have been defeated by the ${monsters[monsterIndex].name}! Game Over!`,
    buttons: [{ name: "Play Again", callback: goToTown }],
  },
];

//
function navigateTo(location) {
  // update console log
  text.innerHTML = location.displayText;

  // and update button name and callback function
  button1.innerHTML = location.buttons[0].name;
  button1.onclick = location.buttons[0].callback;

  button2.innerHTML = location.buttons[1].name;
  button2.onclick = location.buttons[1].callback;

  button3.innerHTML = location.buttons[2].name;
  button3.onclick = location.buttons[2].callback;
}

// go to store
function goToStore() {
  navigateTo(locations[0]);
}

// go to town
function goToTown() {
  navigateTo(locations[1]);
  monsterStats.style.display = "none";
}

// go to town
function gotoSellWeapons() {
  navigateTo(locations[2]);
}

// go to cave
function gotoCave() {
  navigateTo(locations[3]);
}

// go to fight stage
function gotoFightStage(monster) {
  navigateTo(locations[4]);
  monsterStats.style.display = "flex";
  monsterNameText.innerHTML = monsters[monsterIndex].name;
  monsterHealthText.innerHTML = monsters[monsterIndex].health;
  text.innerHTML = `You are fighting a ${monsters[monsterIndex].name}!`;
}

// go to win
function gotoWin() {
  navigateTo(locations[5]); 
}

// go to lose
function gotoLose() {
  navigateTo(locations[6]);
}

// update stats
function updateStats() {
  xpText.innerHTML = xp;
  healthText.innerHTML = health;
  goldText.innerHTML = gold;
}

// buy health
function buyHealth() {
  if (health >= 100) {
    text.innerHTML = "Your health is already full!";
    // flashTextGreen();
    return;
  }
  if (gold >= 10) {
    health += 10;
    gold -= 10;
    updateStats();
  } else {
    text.innerHTML = "Not enough gold to buy health!";
    // flashTextGreen();
  }
}

// buy weapon
function buyWeapon() {
  if (playerWeapon.length >= weapons.length) {
    text.innerHTML = "You already have all the weapons!";
    text.innerHTML += `<br> These are the weapons in your inventory: 
    ${playerWeapon.map((weapon) => weapon.name).join(", ")}.`;
    return;
  }

  if (gold >= 30 && playerWeapon.length < weapons.length) {
    //
    gold -= 30;
    updateStats();
    playerWeapon.push(weapons[playerWeapon.length]);
    text.innerHTML = `You bought a ${weapons[playerWeapon.length - 1].name}!`;
    text.innerHTML += `<br> Your current weapon is a ${playerWeapon[playerWeapon.length - 1].name}.`;
    text.innerHTML += `<br> These are the weapons in your inventory: 
    ${playerWeapon.map((weapon) => weapon.name).join(", ")}.`;
  } else {
    text.innerHTML = "Not enough gold to buy weapons!";
    text.innerHTML += `<br> These are the weapons in your inventory: 
    ${playerWeapon.map((weapon) => weapon.name).join(", ")}.`;
    gotoSellWeapons();
    // flashTextGreen();
  }
}

//sell weapon
function sellWeapon() {
  if (playerWeapon.length <= 1) {
    text.innerHTML = "You can't sell your last weapon!";
    text.innerHTML += `<br> These are the weapons in your inventory: 
    ${playerWeapon.map((weapon) => weapon.name).join(", ")}.`;
    return;
  }
  const weaponToSell = playerWeapon.shift();
  gold += 15; // sell for 15 gold
  updateStats();
  text.innerHTML = `You sold your ${weaponToSell.name} for 15 gold.`;
}

// function flashTextGreen() {
//   text.classList.add("text-highlight");

//   setTimeout(() => {
//     text.classList.remove("text-highlight");
//   }, 800); // how long it stays green
// }

function lose() {
  text.innerHTML =
    "You have been defeated by the " + monsters[monsterIndex].name + ".";
  text.innerHTML += " Game Over!";
}

function defeatMonster() {
  text.innerHTML = "You have defeated the " + monsters[monsterIndex].name + "!";
  xp += monsters[monsterIndex].level * 10;
  gold += monsters[monsterIndex].level * 5;
  updateStats();
}

function attack() {
  
  text.innerText = "The " + monsters[monsterIndex].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[weapons.length - 1].name + ".";

  health -= monsters[monsterIndex].level;
  monsterHealth -=
    weapons[weapons.length - 1].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    monsterIndex === 2 ? win() : defeatMonster();
  }
}

function dodge() {}

function fightSlime() {
  monsterIndex = 0;
  gotoFightStage();
}

function fightFangBeast() {
  monsterIndex = 1;
  gotoFightStage();
}

function fightDragon() {
  monsterIndex = 2;
  gotoFightStage();
}

function win() {
  text.innerHTML =
    "Congratulations! You have defeated the dragon and saved the town!";
  text.innerHTML += " You win!";
  gotoWin();
}

function lose() {
  text.innerHTML =
    "You have been defeated by the " + monsters[monsterIndex].name + ".";
  text.innerHTML += " Game Over!";
  gotoLose();
}

// start game
goToTown();
