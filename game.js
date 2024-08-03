const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let score = 0;
const scoreDisplay = document.getElementById('score');

// Player bat
const bat = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 20,
    speed: 20
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 5
};

// Draw bat
function drawBat() {
    context.fillStyle = '#000';
    context.fillRect(bat.x, bat.y, bat.width, bat.height);
}

// Draw ball
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = '#ff0000';
    context.fill();
    context.closePath();
}

// Update ball position
function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Wall collision detection
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    if (ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    // Bat collision detection
    if (ball.y + ball.radius > bat.y && ball.x > bat.x && ball.x < bat.x + bat.width) {
        ball.speedY = -ball.speedY;
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
    }

    // Game over detection
    if (ball.y + ball.radius > canvas.height) {
        alert('Game Over! Your score: ' + score);
        document.location.reload();
    }
}

// Move bat
function moveBat(e) {
    if (e.key === 'ArrowLeft' && bat.x > 0) {
        bat.x -= bat.speed;
    } else if (e.key === 'ArrowRight' && bat.x < canvas.width - bat.width) {
        bat.x += bat.speed;
    }
}

// Update game
function updateGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBat();
    drawBall();
    updateBall();
    requestAnimationFrame(updateGame);
}

// Event listener for bat movement
document.addEventListener('keydown', moveBat);

// Start game
updateGame();
