import { updateRollAndButton } from '../script.js';
import {
  smallStraightCheck,
  largeStraightCheck,
  numberOfAKindAndFullHouseCheck,
  bonusCheck,
  scoreCheck,
} from './tableCheck.js';
import { hideDice } from './animationTriggers.js';

// window.playerTurn is active Column, numberOfPlayers is total Columns
function changePlayerTurn(numberOfPlayers) {
  window.playerTurn === numberOfPlayers
    ? (window.playerTurn = 1)
    : window.playerTurn++;
  updateRollAndButton(true);
}

// On new turn all dice need to roll again
export function removeSavedDice(dice) {
  dice.forEach(function (element) {
    element.classList.remove('save');
  });
}

// Controller is used to remove the redundant event listeners
function removePlaceholderEventListeners(controller) {
  controller.abort();
}

function removePlaceholderClassAndHTML(cells) {
  cells.forEach((element) => {
    if (element.classList.contains('placeholder')) {
      element.innerHTML = '';
      element.classList.remove('placeholder');
    }
  });
}

// Removes Placeholder from cells by removing their inner HTML, class and event listeners
function removePlaceholders(cells, controller) {
  removePlaceholderClassAndHTML(cells);
  removePlaceholderEventListeners(controller);
}

function changePlaceholderToScore(i, cells) {
  cells[i].classList.remove('placeholder');
}

function handleClick(i, cells, dice, numberOfPlayers, controller) {
  changePlaceholderToScore(i, cells);
  removePlaceholders(cells, controller);
  bonusCheck(cells);
  scoreCheck(cells);
  removeSavedDice(dice);
  hideDice();
  changePlayerTurn(numberOfPlayers);
}

function addEventListeners(cells, i, numberOfPlayers, dice, controller) {
  if (cells[i].classList.contains('placeholder')) {
    cells[i].addEventListener(
      'click',
      () => handleClick(i, cells, dice, numberOfPlayers, controller),
      {
        signal: controller.signal,
      },
    );
  }
}

function addPlaceholderHTML(cells, i, dieValues, dieCounts) {
  if (cells[i].classList.contains('placeholder')) {
    if (i < 6) {
      let sum = dieValues.filter((num) => num === i + 1).length * (i + 1);
      cells[i].innerHTML = sum;
    }
    switch (i) {
      case 7:
        cells[i].innerHTML = numberOfAKindAndFullHouseCheck(
          3,
          dieCounts,
          false,
        );
        break;
      case 8:
        cells[i].innerHTML = numberOfAKindAndFullHouseCheck(
          4,
          dieCounts,
          false,
        );
        break;
      case 9:
        cells[i].innerHTML = numberOfAKindAndFullHouseCheck(3, dieCounts, true);
        break;
      case 10:
        cells[i].innerHTML = smallStraightCheck(dieValues);
        break;
      case 11:
        cells[i].innerHTML = largeStraightCheck(dieValues);
        break;
      case 12:
        cells[i].innerHTML = numberOfAKindAndFullHouseCheck(
          5,
          dieCounts,
          false,
        );
        break;
      case 13:
        cells[i].innerHTML = dieValues.reduce((a, b) => a + b, 0);
        break;
    }
  }
}

function addPlaceholderClass(cell, i) {
  if (cell.innerHTML === '' && i !== 6 && i !== 14) {
    cell.classList.add('placeholder');
  }
}

// Counts how many of each dice there are and returns object with those numbers
function countNumbersInDiceRoll(arr) {
  let counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 1 && arr[i] <= 6) {
      counts[arr[i]]++;
    }
  }
  return counts;
}

export function writePlaceholders(numberOfPlayers, dieValues, dice, rollCount) {
  // Controller for removal of event listeners
  let controller = new AbortController();
  // Cells is a node list of the column we need
  const cells = document.querySelectorAll(
    `td[data-column="${window.playerTurn}"]`,
  );
  let dieCounts = countNumbersInDiceRoll(dieValues);

  cells.forEach((cell, i) => {
    addPlaceholderClass(cell, i);
    addPlaceholderHTML(cells, i, dieValues, dieCounts);
    rollCount === 3
      ? addEventListeners(cells, i, numberOfPlayers, dice, controller)
      : undefined;
  });
}
