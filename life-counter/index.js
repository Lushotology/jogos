// ===== Reset vidas =====
function reset() {
  ["p1", "p2", "p3", "p4"].forEach(id => {
    document.getElementById(id + "s").innerText = 40;
  });
}
reset();

// ===== Atualizar vida =====
function updateLife(playerId, change) {
  let element = document.getElementById(playerId + "s");
  let value = parseInt(element.innerText);
  element.innerText = value + change;
}

// Configura botões de + e - para todos os jogadores
["p1", "p2", "p3", "p4"].forEach(id => {
  document.getElementById(id + "p").onclick = () => updateLife(id, +1);
  document.getElementById(id + "m").onclick = () => updateLife(id, -1);
});

// Botão Reset
document.getElementById("reset").onclick = reset;

// ===== Escolher vencedor =====
document.getElementById("chooseWinner").addEventListener("click", chooseWinner);

function chooseWinner() {
  const playerIds = ["p1", "p2", "p3", "p4"];
  const randomPlayerId = playerIds[Math.floor(Math.random() * playerIds.length)];
  const winnerElement = document.getElementById(randomPlayerId);

  // Remove mensagens antigas antes de criar uma nova
  winnerElement.querySelectorAll(".winner-message").forEach(msg => msg.remove());

  const winnerMessage = document.createElement("div");
  winnerMessage.classList.add("winner-message");
  winnerMessage.textContent = "WINNER";
  winnerElement.appendChild(winnerMessage);

  setTimeout(() => {
    winnerMessage.remove();
  }, 4000);
}

// ===== Rolagem de dado =====
document.getElementById("rollDiceButton").addEventListener("click", rollDice);

function rollDice() {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  const resultBox = document.createElement("div");
  resultBox.classList.add("result-box");
  resultBox.textContent = randomNumber;
  document.body.appendChild(resultBox);

  setTimeout(() => {
    resultBox.remove();
  }, 3000);
}

// ===== Cara ou coroa =====
document.getElementById("flipCoinButton").addEventListener("click", flipCoin);

function flipCoin() {
  const coinResult = Math.random() < 0.5 ? "Head" : "Tail";
  const resultBox = document.createElement("div");
  resultBox.classList.add("result-box");
  resultBox.textContent = coinResult;

  const icon = document.createElement("i");
  icon.classList.add("bi", coinResult === "Head" ? "bi-emoji-smile" : "bi-emoji-frown");
  resultBox.appendChild(icon);

  document.body.appendChild(resultBox);

  setTimeout(() => {
    resultBox.remove();
  }, 3000);
}

// ===== Coroa de monarca (somente um ativo) =====
function toggleCrown(buttonId) {
  // Remove coroa de todos os jogadores
  document.querySelectorAll(".crown-icon").forEach(btn => btn.classList.remove("colored"));

  // Ativa coroa apenas no jogador clicado
  let button = document.getElementById(buttonId);
  button.classList.add("colored");
}

// ===== Menu lateral (abrir/fechar por clique no celular) =====
const menu = document.querySelector("nav.menu-lateral");
const btnExpandir = document.querySelector(".btn-expandir");

btnExpandir.onclick = () => {
  menu.classList.toggle("open");
  menu.classList.toggle("closed");
};