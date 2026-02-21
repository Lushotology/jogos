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
  let newValue = Math.max(0, value + change); // nunca abaixo de 0
  element.innerText = newValue;

  // muda cor conforme ganho ou perda
  if (change > 0) {
    element.style.color = "lime";   // verde ao ganhar
  } else {
    element.style.color = "red";    // vermelho ao perder
  }

  // volta para branco depois de 300ms
  setTimeout(() => {
    element.style.color = "white";
  }, 300);
}

// Configura botões de + e - para todos os jogadores
["p1", "p2", "p3", "p4"].forEach(id => {
  document.getElementById(id + "p").onclick = () => updateLife(id, +1);
  document.getElementById(id + "m").onclick = () => updateLife(id, -1);
});

// ===== Botão Reset =====
document.getElementById("resetBtn").onclick = reset;

// ===== Escolher vencedor =====
document.getElementById("startBtn").addEventListener("click", chooseWinner);

function chooseWinner() {
  const playerIds = ["p1", "p2", "p3", "p4"];
  const randomPlayerId = playerIds[Math.floor(Math.random() * playerIds.length)];
  const winnerElement = document.getElementById(randomPlayerId);

  // Remove mensagens antigas de TODOS os jogadores
  document.querySelectorAll(".winner-message").forEach(msg => msg.remove());

  // Cria a nova mensagem
  const winnerMessage = document.createElement("div");
  winnerMessage.classList.add("winner-message");
  winnerMessage.textContent = "WINNER";
  winnerElement.appendChild(winnerMessage);

  // Remove após 4 segundos
  setTimeout(() => {
    winnerMessage.remove();
  }, 4000);
}

// ===== Coroa de monarca (somente um ativo) =====
function toggleCrown(buttonId) {
  // Remove coroa de todos os jogadores
  document.querySelectorAll(".crown-icon").forEach(btn => btn.classList.remove("colored"));

  // Ativa coroa apenas no jogador clicado
  let button = document.getElementById(buttonId);
  button.classList.add("colored");
}