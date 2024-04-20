let table = document.getElementById('scoreTable');
let rows = table.getElementsByTagName('tr');

// Save initial table for resets
export function saveInitialTable() {
  const initialTable = document.getElementById('scoreTable');
  return initialTable.innerHTML;
}
export function expandTable(playerCount, initialTable) {
  // Reset table to initial state
  table.innerHTML = initialTable;
  // Create new rows and columns based on the number of players
  for (var i = 0; i < rows.length; i++) {
    for (var j = 1; j < playerCount + 1; j++) {
      let cell = rows[i].insertCell();

      if (i === 0) {
        cell.innerHTML = 'Player ' + j;
        // Setting custom attribute via which we allow name change
        cell.setAttribute('data-player', j);
      } else {
        // Setting custom attributes as cell coordinates
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-column', j);
      }
    }
  }
}
