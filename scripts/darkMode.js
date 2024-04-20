export const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
let image1 = document.getElementById('dieOne');
let image2 = document.getElementById('dieTwo');
let image3 = document.getElementById('dieThree');
let image4 = document.getElementById('dieFour');
let image5 = document.getElementById('dieFive');
let image6 = document.getElementById('diceCup2');
let image7 = document.getElementById('diceCup1');
const images = [image1, image2, image3, image4, image5];

// Dark or Light Images
function imageMode(color) {
  // Gets the changes to the dice made by rolling to update the images with existing numbers
  for (let i = 0; i < 5; i++) {
    let assetsIndex = images[i].src.indexOf('assets/');
    let imageName = images[i].src.substring(
      assetsIndex + 'assets/'.length,
      assetsIndex + 'assets/'.length + 1,
    );
    images[i].src = `assets/${imageName}${color}.png`;
  }
  image6.src = `assets/cup${color}2.png`;
  image7.src = `assets/cup${color}1.png`;
}

export function toggleDarkLightMode(color) {
  toggleIcon.children[0].textContent =
    color === 'dark' ? 'Dark Mode' : 'Light Mode';
  color === 'dark'
    ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
    : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
  imageMode(color);
}

// Switch Theme Dynamically
export function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    toggleDarkLightMode('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    toggleDarkLightMode('light');
  }
}
