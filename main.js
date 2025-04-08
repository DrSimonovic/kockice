// Globalne varijable - proba za git pull
const players = []; // Igraci i njihovi rezultati
let numberPlayers = 0;
const rounds = {
  current: 0,
  total: 0,
};

// Pocetak igre
function startGame() {
  let confirmationQuestion = confirm(
    "Da li želite da igrate igricu bacanje kockica?"
  );

  if (confirmationQuestion) {
    settingGame();
  } else {
    alert("Igra je otkazana. Mogućnost nove igre imate za 5 sekundi.");
    setTimeout(input, 5000);
  }
}

// Podesavanje parametara
function settingGame() {
  let numPlayers = prompt("Unesite broj igraca: ");
  let numRounds = prompt("Unesite broj bacanja: ");
  if (
    !isNaN(numPlayers) &&
    !isNaN(numRounds) &&
    numPlayers > 0 &&
    numRounds > 0
  ) {
    numberPlayers = numPlayers; // podesavanje broja igraca
    rounds.current = 1; // podesavanje za prvo bacanje
    rounds.total = numRounds; // podesavanje ukupnog broja bacanja
    inputPlayers();
  } else {
    alert(
      "Nijeste ispravno unijeli broj igraca ili broj bacanja!!! Pokusajte ponovo!"
    );
    setTimeout(settingGame, 0);
  }
}

// Unosenje svih igraca
function inputPlayers() {
  for (let countPlayers = 0; countPlayers < numberPlayers; countPlayers++) {
    inputPlayer();
  }
  playGame();
}

// Unosenje pojedinacnog igraca
function inputPlayer() {
  let position = players.length; // novi igrac ide na zadnje mjesto

  while (true) {
    let playerName = prompt(
      `Unesite ime ${position + 1}. igrača od ukupno ${numberPlayers}!`
    );

    if (playerName && /^[A-Za-z\s]+$/.test(playerName)) {
      players[position] = {
        name: playerName,
        score: 0,
        throws: [],
      };
      break;
    } else {
      alert("Morate unijeti ime koja sadrže samo slova i razmake!");
    }
  }
}

// Realizacija bacanja
function playGame() {
  for (let countRounds = 0; countRounds < rounds.total; countRounds++) {
    playRound();
    displayRound();
    displayStanding();
  }
}

function playRound() {
  const k = [];
  for (let countPlayers = 0; countPlayers < players.length; countPlayers++) {
    k[countPlayers] = Math.ceil(Math.random() * 6);
    players[countPlayers].throws[rounds.current] = k[countPlayers];
    players[countPlayers].score += k[countPlayers];
    rounds.current++
  }
}

function displayRound() {}

function displayStanding() {}

function input() {
  for (let j = 0; j < players.length; j++) {
    k[j] = Math.ceil(Math.random() * 6);
    players[j].score += k[j];
    console.log(
      players[j].name + " ---> " + k[j] + "  =>  " + players[j].score + "  <=="
    );
  }
}

startGame();

// inputPlayers();

// playRound();

console.log(players);
