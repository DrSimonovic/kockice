// Globalne varijable
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
    alert("Igra je otkazana.");
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
    rounds.current = 0; // podesavanje za prvo bacanje
    rounds.total = numRounds; // podesavanje ukupnog broja bacanja
    inputPlayers();
  } else {
    alert(
      "Nijeste ispravno unijeli broj igraca ili broj bacanja!!! Pokusajte ponovo!"
    );
    settingGame();
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

// Realizacija igre
function playGame() {
  for (let countRounds = 0; countRounds < rounds.total; countRounds++) {
    rounds.current = countRounds;
    playRound();
    displayRound();
  }
  displayStanding();
}

// Realizacija jednog bacanja
function playRound() {
  const k = [];

  for (let countPlayers = 0; countPlayers < players.length; countPlayers++) {
    k[countPlayers] = Math.ceil(Math.random() * 6);
    players[countPlayers].throws[rounds.current] = k[countPlayers];
    players[countPlayers].score += k[countPlayers];
  }
}

// Prikaz poslije jednog bacanja
function displayRound() {
  console.log(
    `%c**** ROUND ${rounds.current + 1} ****`,
    "color: blue; font-size: 20px; font-weight: bold;"
  );
  for (let countPlayers = 0; countPlayers < players.length; countPlayers++) {
    const player = players[countPlayers];
    console.log(
      `${player.name} ==> ${player.throws[rounds.current]} ==> ( %c${
        player.score
      } )`,
      "color: red; font-weight: bold;"
    );
  }
}

// Prikazivanje tabele i isticanje pobjednika (jednog ili vise njih)
function displayStanding() {
  const standing = players.map((player) => player); // kopiranje niza players radi sortiranja

  standing.sort((a, b) => b.score - a.score);
  let max = standing[0].score; // najbolji rezultat

  console.log(max);
  console.log(
    `%c******************`,
    "color: green; font-size: 20px; font-weight: bold;"
  );
  console.log(
    `%c**** STANDING ****`,
    "color: green; font-size: 20px; font-weight: bold;"
  );
  console.log(
    `%c******************`,
    "color: green; font-size: 20px; font-weight: bold;"
  );

  // Pobjednik
  console.log(
    ` %c 1.  ${standing[0].name} ===> ${standing[0].score} <=== W I N N E R `,
    `color: green;
       font-size: 16px; font-weight: bold;
       background-color: gold`
  );

  //Ostali, moguce da ima vise pobjednika
  for (let countPlayers = 1; countPlayers < standing.length; countPlayers++) {
    console.log(
      ` %c ${
        standing[countPlayers].score === standing[countPlayers - 1].score
          ? " "
          : countPlayers + 1
      }.  ${standing[countPlayers].name} ===> ${standing[countPlayers].score} ${standing[countPlayers].score === max ? "<=== W I N N E R " : ""}`,
      `color: green;
       font-size: 16px; font-weight: bold;
       background-color: ${standing[countPlayers].score === max ? "gold" : ""};`
    );
  }
}

startGame();
