const gravity = 0.05
const lift = 40
const maxPosition = 400
const minPosition = 0

const squares = []
const pipes = []


let isGameOver = false

const gameArea = document.getElementById('gameArea')

function createSquare() {
  const square = {
    velocity: 0,
    position: 200,
    color: 'red',
    element: document.createElement('div'),
    death: false,
  }
  
  square.element.className = 'square'
  square.element.style.bottom = square.position + 'px'
  square.element.style.backgroundColor = square.color

  gameArea.appendChild(square.element)

  squares.push(square)
}

function createPipe() {
  const pipe = {
    position: 400,
    height: Math.floor(Math.random() * (maxPosition - 150)) + 100,
    element: document.createElement('div'),
  }
  
  pipe.element.className = 'pipe'
  pipe.element.style.borderBottom = (pipe.height - 50) + 'px'
  pipe.element.style.borderTop = (350 - pipe.height) + 'px'
  pipe.element.style.borderLeft = '0px'
  pipe.element.style.borderRight = '0px'
  pipe.element.style.borderStyle = 'solid'
  pipe.element.style.borderColor = 'black'
  pipe.element.style.left = pipe.position + 'px'

  gameArea.appendChild(pipe.element)

  pipes.push(pipe)
}

createPipe()
createSquare()

function jump() {
  for (const square of squares) {
    square.position += lift
    if (square.position > maxPosition)
      square.position = maxPosition
    square.velocity = 0
  }
}
  
function gravityForce(square) {
    square.velocity += gravity
    square.position -= square.velocity
    if (square.position < minPosition) {
      square.position = minPosition
      square.velocity = 0
    }
}

document.addEventListener('keydown', jump)

function gameLoop() {
  if (!isGameOver) {
    for (const square of squares) {
      gravityForce(square)

      square.element.style.bottom = square.position + 'px'

      const pipe = pipes.find((pipe) => pipe.position < 80)
      if (pipe) {
        const diff = square.position - pipe.height
        if ((diff <= -50 || diff >= 20) && pipe.position > 0  ) {
          pipe.element.style.borderColor = 'red'
        }
        if(pipe.element.style.borderColor != 'red' && pipe.position <= 0)
          pipe.element.style.borderColor = 'green'
      }
    }

    for (const pipe of pipes) {
      pipe.position -= 1

      if (pipe.position == 250)
        createPipe()

      if (pipe.position <= -50) {
        pipe.element.remove()
        pipes.shift()
      }

      pipe.element.style.left = pipe.position + 'px'
    }
  
    requestAnimationFrame(gameLoop);
  }
}

// function gameOver() {
//   isGameOver = true;
//   alert('Game Over!');
//   bird.style.top = '50%';
//   velocity = 0;
//   isGameOver = false;
// }

gameLoop();
