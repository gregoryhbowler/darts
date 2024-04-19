// Game mode selection
const cricketBtn = document.getElementById('cricketBtn');
const customBtn = document.getElementById('customBtn');
const gameContainer = document.getElementById('gameContainer');

cricketBtn.addEventListener('click', startCricketGame);
customBtn.addEventListener('click', startCustomGame);

function startCricketGame() {
  gameContainer.innerHTML = `
    <h2>Cricket Game</h2>
    <table id="cricketTable"></table>
    <button id="undoBtn">Undo</button>
    <button id="newGameBtn">New Game</button>
  `;
  
  const cricketTable = document.getElementById('cricketTable');
  const undoBtn = document.getElementById('undoBtn');
  const newGameBtn = document.getElementById('newGameBtn');
  
  // Generate the cricket table dynamically
  const numbers = [20, 19, 18, 17, 16, 15, 'Bull'];
  let tableHTML = '<tr><th></th>';
  for (let i = 1; i <= 4; i++) {
    tableHTML += `<th>Player ${i}</th>`;
  }
  tableHTML += '</tr>';
  
  numbers.forEach(num => {
    tableHTML += `<tr><td>${num}</td>`;
    for (let i = 1; i <= 4; i++) {
      tableHTML += `<td data-player="${i}" data-number="${num}"></td>`;
    }
    tableHTML += '</tr>';
  });
  
  cricketTable.innerHTML = tableHTML;
  
  // Add event listeners for table cells, undo, and new game buttons
  cricketTable.addEventListener('click', handleCricketCellClick);
  undoBtn.addEventListener('click', handleUndoClick);
  newGameBtn.addEventListener('click', startCricketGame);
}

function handleCricketCellClick(event) {
  const cell = event.target;
  if (cell.tagName === 'TD' && cell.dataset.player) {
    cell.textContent = cell.textContent ? '' : 'X';
    cell.classList.toggle('hit');
  }
}

function handleUndoClick() {
  // Implement undo logic
}

function startCustomGame() {
  gameContainer.innerHTML = `
    <h2>Custom Game</h2>
    <p>Round: <span id="roundDisplay">1</span></p>
    <p>Target: <span id="targetDisplay"></span></p>
    <button id="hitBtn">Hit</button>
    <button id="nextRoundBtn">Next Round</button>
    <table id="scoreTable"></table>
    <button id="newGameBtn">New Game</button>
  `;

  const roundDisplay = document.getElementById('roundDisplay');
  const targetDisplay = document.getElementById('targetDisplay');
  const hitBtn = document.getElementById('hitBtn');
  const nextRoundBtn = document.getElementById('nextRoundBtn');
  const scoreTable = document.getElementById('scoreTable');
  const newGameBtn = document.getElementById('newGameBtn');

  let currentRound = 1;
  let currentTarget = generateRandomTarget();
  let scores = [0, 0, 0, 0];

  // Display the initial target
  targetDisplay.textContent = currentTarget;

  // Generate the score table dynamically
  let scoreTableHTML = '<tr><th>Player</th><th>Score</th></tr>';
  for (let i = 1; i <= 4; i++) {
    scoreTableHTML += `<tr><td>Player ${i}</td><td id="score${i}">0</td></tr>`;
  }
  scoreTable.innerHTML = scoreTableHTML;

  // Add event listeners for hit, next round, and new game buttons
  hitBtn.addEventListener('click', handleHitClick);
  nextRoundBtn.addEventListener('click', handleNextRoundClick);
  newGameBtn.addEventListener('click', startCustomGame);

  function generateRandomTarget() {
    return Math.floor(Math.random() * 20) + 1;
  }

  function handleHitClick() {
    const playerIndex = currentRound - 1;
    scores[playerIndex]++;
    document.getElementById(`score${currentRound}`).textContent = scores[playerIndex];
  }

  function handleNextRoundClick() {
    currentRound++;
    if (currentRound > 4) {
      currentRound = 1;
    }
    roundDisplay.textContent = currentRound;
    currentTarget = generateRandomTarget();
    targetDisplay.textContent = currentTarget;
  }
}