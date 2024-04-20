import { saveInitialTable, expandTable } from './scripts/tableCreation.js';
import { rollDice } from './scripts/rollDice.js';
import { writePlaceholders, removeSavedDice } from './scripts/tableInput.js';
import { setupPage, diceRollAnimation } from './scripts/animationTriggers.js';
import { nameChangeMenu } from './scripts/nameChangeButton.js';
import {
  toggleSwitch,
  toggleDarkLightMode,
  switchTheme,
} from './scripts/darkMode.js';

// Selecting DOM elements
// INSERT MORE PLAYERS HERE AND IN INDEX.HTML:
const playerIds = [
  'onePlayer',
  'twoPlayers',
  'threePlayers',
  'fourPlayers',
  // 'fivePlayers',
  // 'sixPlayers',
  // 'sevenPlayers',
  // 'eightPlayers',
];
const players = playerIds.map((id) => document.getElementById(id));
export const dice = document.querySelectorAll('.die');
export const rollButton = document.getElementById('rollButton');

// Global Variables
window.playerTurn = 1;
export let rollCount = 3;
let numberOfPlayers = 0;
const initialTable = saveInitialTable();
let dieValues = [];
rollButton.innerHTML = `Roll: ${rollCount}/3`;

// Used in './scripts/tableInput.js' when changing players
export function updateRollAndButton(isNewRound) {
  isNewRound === true ? (rollCount = 3) : --rollCount;
  rollButton.innerHTML = `Roll: ${rollCount}/3`;
  rollCount === 0
    ? (rollButton.disabled = true)
    : (rollButton.disabled = false);
}

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    toggleDarkLightMode('dark');
  } else {
    toggleSwitch.checked = false;
    toggleDarkLightMode('light');
  }
}

// Event Listeners

// Dark Mode Switch
toggleSwitch.addEventListener('change', switchTheme);
// Number of Players Buttons
players.forEach((player, index) => {
  player.addEventListener('click', () => {
    rollCount = 3;
    window.playerTurn = 1;
    numberOfPlayers = index + 1;
    removeSavedDice(dice);
    expandTable(numberOfPlayers, initialTable);
    nameChangeMenu(numberOfPlayers);
    updateRollAndButton(true, rollCount);
    setupPage();
  });
});

// Wrapper function
function wrapperPlaceholderAndRollButton(time) {
  setTimeout(() => {
    writePlaceholders(numberOfPlayers, dieValues, dice, rollCount);
    updateRollAndButton(false, rollCount);
  }, time);
}

// Roll button - button that rolls dice, writes placeholders, updates the button text
// Timeouts are so numbers in table don't show before the animation of rolling finishes
rollButton.addEventListener('click', () => {
  if (rollCount !== 0) {
    let time = 1000;
    diceRollAnimation();
    rollCount === 3
      ? (dieValues = rollDice(dieValues))
      : setTimeout(() => {
          dieValues = rollDice(dieValues);
        }, 1000);
    rollCount === 3
      ? wrapperPlaceholderAndRollButton(time)
      : wrapperPlaceholderAndRollButton(time * 2);
  }
});

// Save/Lock a die so it doesn't roll
dice.forEach((die) => {
  die.addEventListener('click', function () {
    this.classList.toggle('save');
  });
});
