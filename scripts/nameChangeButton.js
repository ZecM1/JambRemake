const changeNameButton = document.getElementById('changeNameButton');
const nameChangeWindow = document.getElementById('nameChange');
let wasNameMenuOpen = false;
let wasEventListenerAdded = false;

function showHideMenu() {
  if (
    nameChangeWindow.classList.contains('showNameChange') ||
    nameChangeWindow.classList.contains('hideNameChange')
  ) {
    nameChangeWindow.classList.toggle('hideNameChange');
    nameChangeWindow.classList.toggle('showNameChange');
  } else {
    nameChangeWindow.classList.add('showNameChange');
  }
}

// Clears the input field
function clearNameChange(playerNumber) {
  let element = document.getElementById(`writeName${playerNumber}`);
  element.value = '';
}

// Inserts the input name into the table
function confirmNameChange(playerNumber) {
  let element = document.getElementById(`writeName${playerNumber}`);
  let targetElement = document.querySelector(`[data-player="${playerNumber}"]`);
  targetElement.textContent = element.value;
}

// Creates the name change menu / Recreates it on every New Game
export function nameChangeMenu(numberOfPlayers) {
  if (!wasEventListenerAdded) {
    changeNameButton.addEventListener('click', function () {
      showHideMenu();
    });
    wasEventListenerAdded = true;
  }
  nameChangeWindow.classList.contains('showNameChange')
    ? showHideMenu()
    : undefined;
  nameChangeWindow.innerHTML = '';
  let playerHTML = '';
  wasNameMenuOpen = true;
  for (let i = 1; i <= numberOfPlayers; i++) {
    playerHTML = `
    <div class='inputContainer'> 
    <h3>Player ${i} Name:</h3>
    <input type="text" class="playerName" id="writeName${i}" />
    <button class="cleanButton"><i class="fa-solid fa-check" id="confirmName${i}" ></i></button>
    <button class="cleanButton"><i class="fa-solid fa-xmark" id="cancelName${i}" ></i></button>
    </div>
 `;
    nameChangeWindow.insertAdjacentHTML('beforeend', playerHTML);
    document
      .getElementById(`confirmName${i}`)
      .addEventListener('click', () => confirmNameChange(i));
    document
      .getElementById(`cancelName${i}`)
      .addEventListener('click', () => clearNameChange(i));
  }
}
