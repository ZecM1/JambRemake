import { rollButton, dice, rollCount } from '../script.js';

const newGameButton = document.getElementById('newGameButton');
const menuWindow = document.querySelector('.mainMenu');
const mainMenuText = document.getElementById('mainMenuText');
const scoreboard = document.getElementById('scoreTable');
export const changeNameButton = document.getElementById('changeNameButton');

// Menu is initially shown so only enable button once it is hidden for the first time
let isPowerButtonEnabled = false;

export function nameChangeMenu() {
  hideShowMainMenu();
}

function showDice() {
  dice.forEach((die) => {
    die.classList.add('showDice');
    die.classList.remove('hideDice');
  });
}

export function diceRollAnimation() {
  if (rollCount === 3) {
    showDice();
  } else {
    hideDice();
    setTimeout(showDice, 1000);
  }
}

export function hideDice() {
  dice.forEach((die) => {
    if (!die.classList.contains('save')) {
      die.classList.add('hideDice');
      die.classList.remove('showDice');
    }
  });
}

function hideShowRollButton() {
  if (menuWindow.classList.contains('showMainMenu')) {
    rollButton.classList.remove('showRollButton');
    rollButton.classList.add('hideRollButton');
  } else {
    rollButton.classList.remove('hideRollButton');
    rollButton.classList.add('showRollButton');
  }
}

function hideShowTable() {
  if (menuWindow.classList.contains('showMainMenu')) {
    scoreboard.classList.add('hideTable');
    scoreboard.classList.remove('showTable');
  } else {
    scoreboard.classList.add('showTable');
    scoreboard.classList.remove('hideTable');
  }
}

function enablePowerButton() {
  newGameButton.addEventListener('click', function () {
    mainMenuText.textContent = 'Press the power button to continue or';
    hideShowMainMenu();
    hideShowTable();
    hideShowRollButton();
  });
}
export function hideShowMainMenu() {
  menuWindow.classList.toggle('hideMainMenu');
  menuWindow.classList.toggle('showMainMenu');
}

// Prepares the playing board
export function setupPage() {
  hideShowMainMenu();
  hideShowTable();
  hideShowRollButton();
  hideDice();
  // Adds the power button event listener but only once
  if (!isPowerButtonEnabled) {
    enablePowerButton();
    isPowerButtonEnabled = true;
  }
}
