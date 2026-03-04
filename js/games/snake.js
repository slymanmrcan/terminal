function randomCell(gridSize, occupied) {
  let x = 0;
  let y = 0;
  let valid = false;

  while (!valid) {
    x = Math.floor(Math.random() * gridSize);
    y = Math.floor(Math.random() * gridSize);
    valid = !occupied.some((segment) => segment.x === x && segment.y === y);
  }

  return { x, y };
}

export function mountSnakeGame(container, options = {}) {
  const locale = options.locale === "tr" ? "tr" : "en";

  const messages =
    locale === "tr"
      ? {
          score: "Skor",
          controls: "Kontrol: ok tuslari/WASD, cikis: X/ESC, restart: R",
          running: "Calisiyor",
          gameOver: "Oyun bitti - tekrar icin R",
          exited: "Snake kapatildi",
        }
      : {
          score: "Score",
          controls: "Controls: arrows/WASD, quit: X/ESC, restart: R",
          running: "Running",
          gameOver: "Game over - press R to restart",
          exited: "Snake closed",
        };

  container.innerHTML = `
<div class="snake-game-panel">
  <div class="snake-game-head">
    <span class="snake-score">${messages.score}: <strong data-snake-score>0</strong></span>
    <span class="snake-status" data-snake-status>${messages.running}</span>
  </div>
  <canvas class="snake-canvas" data-snake-canvas width="320" height="320"></canvas>
  <div class="snake-hint">${messages.controls}</div>
</div>
`;

  const canvas = container.querySelector("[data-snake-canvas]");
  const scoreEl = container.querySelector("[data-snake-score]");
  const statusEl = container.querySelector("[data-snake-status]");
  const ctx = canvas.getContext("2d");

  const gridSize = 20;
  const cellSize = canvas.width / gridSize;

  let snake = [];
  let direction = { x: 1, y: 0 };
  let nextDirection = { x: 1, y: 0 };
  let food = { x: 10, y: 10 };
  let score = 0;
  let timer = null;
  let active = false;

  function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
  }

  function drawBoard() {
    ctx.fillStyle = "#0b0f12";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < gridSize; y += 1) {
      for (let x = 0; x < gridSize; x += 1) {
        if ((x + y) % 2 === 0) {
          ctx.fillStyle = "#10171d";
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }

    drawCell(food.x, food.y, "#ff6b6b");

    snake.forEach((segment, index) => {
      drawCell(segment.x, segment.y, index === 0 ? "#57e389" : "#2ec27e");
    });
  }

  function resetGameState() {
    snake = [
      { x: 7, y: 10 },
      { x: 6, y: 10 },
      { x: 5, y: 10 },
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    food = randomCell(gridSize, snake);
    score = 0;
    scoreEl.textContent = String(score);
    statusEl.textContent = messages.running;
  }

  function gameOver() {
    active = false;
    statusEl.textContent = messages.gameOver;
  }

  function tick() {
    if (!active) return;

    direction = nextDirection;
    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    const hitWall = head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize;
    const hitBody = snake.some((segment) => segment.x === head.x && segment.y === head.y);

    if (hitWall || hitBody) {
      gameOver();
      drawBoard();
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 1;
      scoreEl.textContent = String(score);
      food = randomCell(gridSize, snake);
    } else {
      snake.pop();
    }

    drawBoard();
  }

  function startLoop() {
    if (timer) clearInterval(timer);
    timer = setInterval(tick, 120);
  }

  function restart() {
    resetGameState();
    active = true;
    drawBoard();
    startLoop();
  }

  function canTurnTo(next) {
    return !(next.x === -direction.x && next.y === -direction.y);
  }

  function handleDirection(next) {
    if (canTurnTo(next)) {
      nextDirection = next;
    }
  }

  function handleKey(event) {
    const key = (event.key || "").toLowerCase();

    if (key === "arrowup" || key === "w") {
      handleDirection({ x: 0, y: -1 });
      return true;
    }
    if (key === "arrowdown" || key === "s") {
      handleDirection({ x: 0, y: 1 });
      return true;
    }
    if (key === "arrowleft" || key === "a") {
      handleDirection({ x: -1, y: 0 });
      return true;
    }
    if (key === "arrowright" || key === "d") {
      handleDirection({ x: 1, y: 0 });
      return true;
    }

    if (key === "r") {
      restart();
      return true;
    }

    if (key === "escape" || key === "x") {
      stop(messages.exited);
      return true;
    }

    return false;
  }

  function stop(reasonText = "") {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    active = false;
    if (reasonText) {
      statusEl.textContent = reasonText;
    }
    if (typeof options.onExit === "function") {
      options.onExit();
    }
  }

  restart();

  return {
    handleKey,
    stop,
    isActive: () => active,
  };
}
