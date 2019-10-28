/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var totalScore, currentScore, currentUser, gamePlaying;

initGame();

function switchUser() {
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
  currentUser === 0 ? (currentUser = 1) : (currentUser = 0);
}

function initGame() {
  gamePlaying = true;
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  totalScore = [0, 0];
  currentScore = 0;
  currentUser = 0;
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('#name-0').textContent = 'Player 0';
  document.querySelector('#name-1').textContent = 'Player 1';
  document.querySelector('.player-0' + '-panel').classList.remove('winner');
  document.querySelector('.player-1' + '-panel').classList.remove('winner');
}

//rolling of the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    diceDOM = document.querySelector('.dice');
    diceDOM.src = 'dice-' + dice + '.png';
    document.querySelector('.dice').style.display = 'block';
    if (dice === 1) {
      currentScore = 0;
      document.querySelector(
        '#current-' + currentUser
      ).textContent = currentScore;
      switchUser();
    } else {
      currentScore += dice;
      document.querySelector(
        '#current-' + currentUser
      ).textContent = currentScore;
    }
  }
});

//pressing hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    totalScore[currentUser] += currentScore;
    document.querySelector('#score-' + currentUser).textContent =
      totalScore[currentUser];
    if (totalScore[currentUser] >= 100) {
      gamePlaying = false;
      document.querySelector('#name-' + currentUser).textContent = 'Winner !';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + currentUser + '-panel')
        .classList.remove('active');
      document
        .querySelector('.player-' + currentUser + '-panel')
        .classList.add('winner');
    } else {
      currentScore = 0;
      document.querySelector(
        '#current-' + currentUser
      ).textContent = currentScore;
      switchUser();
    }
  }
});

//pressing the new game button
document.querySelector('.btn-new').addEventListener('click', initGame);
