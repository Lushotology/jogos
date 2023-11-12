function reset() {
  let p1sElement = document.getElementById("p1s");
  let p2sElement = document.getElementById("p2s");
  let p3sElement = document.getElementById("p3s");
  let p4sElement = document.getElementById("p4s");

  p1sElement.innerText = 40;
  p2sElement.innerText = 40;
  p3sElement.innerText = 40;
  p4sElement.innerText = 40;
}

reset();

//player 1

let p1m = document.getElementById("p1m");
p1m.onclick = function () {
  let p1sElement = document.getElementById("p1s");
  console.log("click");
  let p1s = parseInt(p1sElement.innerText);
  let updated = p1s - 1;
  p1sElement.innerText = updated;
};

let p1p = document.getElementById("p1p");
p1p.onclick = function () {
  let p1sElement = document.getElementById("p1s");
  let p1s = parseInt(p1sElement.innerText);
  let updated = p1s + 1;
  p1sElement.innerText = updated;
};

//player 2

let p2m = document.getElementById("p2m");
p2m.onclick = function () {
  let p2sElement = document.getElementById("p2s");
  console.log("click");
  let p2s = parseInt(p2sElement.innerText);
  let updated = p2s - 1;

  p2sElement.innerText = updated;
};

let p2p = document.getElementById("p2p");
p2p.onclick = function () {
  let p2sElement = document.getElementById("p2s");
  let p2s = parseInt(p2sElement.innerText);
  let updated = p2s + 1;
  p2sElement.innerText = updated;
};

//player 3

let p3m = document.getElementById("p3m");
p3m.onclick = function () {
  let p3sElement = document.getElementById("p3s");
  console.log("click");
  let p3s = parseInt(p3sElement.innerText);
  let updated = p3s - 1;

  p3sElement.innerText = updated;
};

let p3p = document.getElementById("p3p");
p3p.onclick = function () {
  let p3sElement = document.getElementById("p3s");
  let p3s = parseInt(p3sElement.innerText);
  let updated = p3s + 1;
  p3sElement.innerText = updated;
};

//player 4

let p4m = document.getElementById("p4m");
p4m.onclick = function () {
  let p4sElement = document.getElementById("p4s");
  console.log("click");
  let p4s = parseInt(p4sElement.innerText);
  let updated = p4s - 1;

  p4sElement.innerText = updated;
};

let p4p = document.getElementById("p4p");
p4p.onclick = function () {
  let p4sElement = document.getElementById("p4s");
  let p4s = parseInt(p4sElement.innerText);
  let updated = p4s + 1;
  p4sElement.innerText = updated;
};

let resetButton = document.getElementById("reset");
resetButton.onclick = function () {
  reset();
};

document.getElementById("chooseWinner").addEventListener("click", chooseWinner);

function chooseWinner() {
  // Array com os IDs dos jogadores
  const playerIds = ["p1", "p2", "p3", "p4"];

  // Escolhe aleatoriamente um jogador
  const randomPlayerId =
    playerIds[Math.floor(Math.random() * playerIds.length)];

  // Exibe a mensagem WINNER abaixo do jogador escolhido
  const winnerElement = document.getElementById(randomPlayerId);
  const winnerMessage = document.createElement("div");
  winnerMessage.classList.add("winner-message");
  winnerMessage.textContent = "WINNER";
  winnerElement.appendChild(winnerMessage);

  // Define um timeout para remover a mensagem após 6 segundos
  setTimeout(() => {
    winnerMessage.remove();
  }, 4000);
}

document.addEventListener("DOMContentLoaded", function () {
  // Adiciona um evento de clique ao botão de lançar dado
  document.getElementById("rollDiceButton").addEventListener("click", rollDice);
});


function rollDice() {
  // Gera um número aleatório de 1 a 6
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  // Cria uma caixa de resultado
  const resultBox = document.createElement("div");
  resultBox.classList.add("result-box");
  resultBox.textContent = randomNumber;

  // Adiciona a caixa de resultado ao corpo do documento
  document.body.appendChild(resultBox);

  // Remove a caixa de resultado após um período de tempo (por exemplo, 3 segundos)
  setTimeout(() => {
    resultBox.remove();
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  // ... Seu código JavaScript existente ...

  // Adiciona um evento de clique ao botão "Cara ou Coroa"
  document.getElementById("flipCoinButton").addEventListener("click", flipCoin);
});

function flipCoin() {
  // Gera aleatoriamente "Cara" ou "Coroa"
  const coinResult = Math.random() < 0.5 ? "Head" : "Tail";

  // Cria uma caixa de resultado
  const resultBox = document.createElement("div");
  resultBox.classList.add("result-box");
  resultBox.textContent = coinResult;

  // Adiciona um ícone representando o resultado
  const icon = document.createElement("i");
  icon.classList.add(
    "bi",
    coinResult === "Head" ? "bi-emoji-smile" : "bi-emoji-frown"
  );
  resultBox.appendChild(icon);

  // Adiciona a caixa de resultado ao corpo do documento
  document.body.appendChild(resultBox);

  // Remove a caixa de resultado após um período de tempo (3 segundos no exemplo)
  setTimeout(() => {
    resultBox.remove();
  }, 3000);
}

function toggleCrown(buttonId) {
  let button = document.getElementById(buttonId);
  button.classList.toggle('colored');
}



