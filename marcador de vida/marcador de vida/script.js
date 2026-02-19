document.addEventListener("DOMContentLoaded", function () {
    const players = [
        { id: 1, name: "Jogador 1", life: 20, poison: 0, isMonarch: false, color: "lightblue" },
        { id: 2, name: "Jogador 2", life: 20, poison: 0, isMonarch: false, color: "lightgreen" },
        { id: 3, name: "Jogador 3", life: 20, poison: 0, isMonarch: false, color: "lightcoral" },
        { id: 4, name: "Jogador 4", life: 20, poison: 0, isMonarch: false, color: "lightyellow" },
    ];

    let currentPlayerIndex = 0;
    let gameTime = 0;

    const playersContainer = document.getElementById('players');
    const timerDisplay = document.getElementById('timer');
    const nextTurnButton = document.getElementById('next-turn');

    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.style.backgroundColor = player.color;
        playerDiv.dataset.playerId = player.id;

        playerDiv.innerHTML = `
            <h2>${player.name}</h2>
            <div>Vida: <span class="life">${player.life}</span></div>
            <div>Veneno: <span class="poison">${player.poison}</span></div>
            <div class="controls">
                <button class="life-inc-1">+1 Vida</button>
                <button class="life-dec-1">-1 Vida</button>
                <button class="life-inc-10">+10 Vida</button>
                <button class="life-dec-10">-10 Vida</button>
                <button class="poison-inc-1">+1 Veneno</button>
                <button class="poison-dec-1">-1 Veneno</button>
                <button class="monarch-btn">👑 Monarca</button>
            </div>
        `;

        playersContainer.appendChild(playerDiv);

        // Event listeners
        playerDiv.querySelector('.life-inc-1').addEventListener('click', () => updateLife(player.id, 1));
        playerDiv.querySelector('.life-dec-1').addEventListener('click', () => updateLife(player.id, -1));
        playerDiv.querySelector('.life-inc-10').addEventListener('click', () => updateLife(player.id, 10));
        playerDiv.querySelector('.life-dec-10').addEventListener('click', () => updateLife(player.id, -10));
        playerDiv.querySelector('.poison-inc-1').addEventListener('click', () => updatePoison(player.id, 1));
        playerDiv.querySelector('.poison-dec-1').addEventListener('click', () => updatePoison(player.id, -1));
        playerDiv.querySelector('.monarch-btn').addEventListener('click', () => setMonarch(player.id));
    });

    // Highlight the first player initially
    document.querySelector(`[data-player-id="${players[currentPlayerIndex].id}"]`).classList.add('active-player');

    nextTurnButton.addEventListener('click', nextTurn);

    function updateLife(playerId, amount) {
        const player = players.find(p => p.id === playerId);
        player.life += amount;
        if (player.life <= 0) {
            player.life = 0;
            setGrayOut(playerId, true);
        }
        document.querySelector(`[data-player-id="${playerId}"] .life`).textContent = player.life;
    }

    function updatePoison(playerId, amount) {
        const player = players.find(p => p.id === playerId);
        player.poison += amount;
        if (player.poison >= 10) {
            player.poison = 10;
            setGrayOut(playerId, true);
        }
        document.querySelector(`[data-player-id="${playerId}"] .poison`).textContent = player.poison;
    }

    function setGrayOut(playerId, grayOut) {
        const playerDiv = document.querySelector(`[data-player-id="${playerId}"]`);
        if (grayOut) {
            playerDiv.classList.add('grayed-out');
        } else {
            playerDiv.classList.remove('grayed-out');
        }
    }

    function setMonarch(playerId) {
        players.forEach(player => player.isMonarch = false);
        players.find(p => p.id === playerId).isMonarch = true;
        document.querySelectorAll('.monarch-btn').forEach(btn => btn.parentElement.parentElement.classList.remove('monarch'));
        document.querySelector(`[data-player-id="${playerId}"]`).classList.add('monarch');
    }

    function nextTurn() {
        // Remove highlight from the current player
        document.querySelector(`[data-player-id="${players[currentPlayerIndex].id}"]`).classList.remove('active-player');

        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

        // Highlight the new current player. not working at moment 
        document.querySelector(`[data-player-id="${players[currentPlayerIndex].id}"]`).classList.add('active-player');

        alert(`É a vez do ${players[currentPlayerIndex].name}`);
    }

    setInterval(() => {
        gameTime++;
        timerDisplay.textContent = `Tempo: ${Math.floor(gameTime / 60).toString().padStart(2, '0')}:${(gameTime % 60).toString().padStart(2, '0')}`;
    }, 1000);
});
