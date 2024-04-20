// Random number generator 0-6
function randomDieGenerator() {
  return Math.ceil(Math.random() * 6);
}

export function rollDice(dieValues) {
  let allDice = document.querySelectorAll('.die');
  const toggleSwitch = document.querySelector('input[type="checkbox"]');
  let theme = toggleSwitch.checked === true ? 'dark' : 'light';

  for (let i = 0; i <= 4; i++) {
    if (!allDice[i].classList.contains('save')) {
      // Changes dice image
      dieValues[i] = randomDieGenerator();
      allDice[i].setAttribute('src', `assets/${dieValues[i]}${theme}.png`);
    } else {
    }
  }
  return dieValues;
}
