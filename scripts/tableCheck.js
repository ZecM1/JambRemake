export function smallStraightCheck(array) {
  const smallStraight1 = [1, 2, 3, 4];
  const smallStraight2 = [2, 3, 4, 5];
  const smallStraight3 = [3, 4, 5, 6];

  const true1 = smallStraight1.every((num) => array.includes(num));
  const true2 = smallStraight2.every((num) => array.includes(num));
  const true3 = smallStraight3.every((num) => array.includes(num));

  if (true1 || true2 || true3) {
    return 30;
  } else return 0;
}

export function largeStraightCheck(array) {
  const largeStraight1 = [1, 2, 3, 4, 5];
  const largeStraight2 = [2, 3, 4, 5, 6];

  let true1 = largeStraight1.every((num) => array.includes(num));
  let true2 = largeStraight2.every((num) => array.includes(num));
  if (true1 || true2) {
    return 40;
  } else return 0;
}

export function numberOfAKindAndFullHouseCheck(number, dieCounts, fullHouse) {
  // Conditions
  let hasThree = Object.values(dieCounts).some((value) => value === 3);
  let hasTwo = Object.values(dieCounts).some((diceValue) => diceValue === 2);
  let hasThreeOrMore = Object.values(dieCounts).some(
    (value) => value >= number,
  );
  // Full House check and return 25
  if (fullHouse && hasThree && hasTwo) {
    return 25;
  } else if (!fullHouse && hasThreeOrMore) {
    // Returns sum of all dice or 40 if dice are all of a kind
    let sum = Object.entries(dieCounts).reduce((acc, [key, productValue]) => {
      return acc + Number(key) * productValue;
    }, 0);
    return number === 5 ? 40 : sum;
  } else return 0;
}

// Gets called by both handleClick and scoreCheck function
// Returns true or false specifically for the scoreCheck function
export function bonusCheck(cells) {
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    sum += Number(cells[i].innerHTML);
  }
  cells[6].innerHTML = `${sum} / 63`;
  return sum >= 63 ? true : false;
}

export function scoreCheck(cells) {
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    if (i === 6) continue;
    sum += Number(cells[i].innerHTML);
  }
  bonusCheck(cells) ? (sum += 30) : undefined;
  cells[14].innerHTML = sum;
}
