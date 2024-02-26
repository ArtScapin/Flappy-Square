const config = {
  gameArea: {
    width: 800,
    height: 500,
  },
  square: {
    size: 40,
    distance: 500,
  },
  pipe: {
    size: 150,
    width: 70,
    velocity: 1,
    distance: 250,
  },
  global: {
    gravity: 0.04,
    lift: 40,
    isGameOver: true,
  }
}

const squares = []
const pipes = []

const gameName = document.getElementById('gameName')

const gameArea = document.getElementById('gameArea')
gameArea.style.width = config.gameArea.width + 'px'
gameArea.style.height = config.gameArea.height + 'px'

const playButton = document.getElementById('playBtn')
playButton.onclick = () => {
  gameName.style.zIndex = 0
  pipes.forEach((pipe) => pipe.element.remove())
  pipes.length = 0
  squares.forEach((square) => square.element.remove())
  squares.length = 0
  config.global.isGameOver = false
  createPipe()
  createSquare('GREEN')
  playButton.style.visibility = 'hidden'
  configButton.style.visibility = 'hidden'
  score.innerText = 0
  gameLoop()
}

const configButton = document.getElementById('configBtn')
const configMenu = document.getElementById('configMenu')
configButton.onclick = () => {
  configMenu.style.visibility = 'visible'
}
const closeMenuConfigBtn = document.getElementById('closeMenuConfigBtn')
closeMenuConfigBtn.onclick = () => {
  config.gameArea.width = document.getElementById('gameWidth').value
  config.gameArea.height = document.getElementById('gameHeight').value
  // config.square.size = document.getElementById('squareSize').value
  // config.square.distance = document.getElementById('squareDistance').value
  // config.pipe.size = document.getElementById('pipeSize').value
  // config.pipe.width = document.getElementById('pipeWidth').value
  // config.pipe.velocity = document.getElementById('pipeVelocity').value
  // config.pipe.distance = document.getElementById('pipeDistance').value
  // config.global.gravity = document.getElementById('globalGravity').value
  // config.global.lift = document.getElementById('globalLift').value

  gameArea.style.width = config.gameArea.width + 'px'
  gameArea.style.height = config.gameArea.height + 'px'
  configMenu.style.visibility = 'hidden'
}

const score = document.getElementById('scoreValue')

function createSquare(color) {
  const square = {
    velocity: 0,
    position: config.gameArea.height / 2,
    color,
    element: document.createElement('div'),
    death: false,
    score: 0,
  }

  square.element.className = 'square'
  square.element.style.width = config.square.size + 'px'
  square.element.style.height = config.square.size + 'px'
  square.element.style.marginTop = '-' + config.square.size / 2 + 'px'
  square.element.style.bottom = square.position + 'px'
  square.element.style.backgroundColor = square.color
  square.element.style.left = config.square.distance + 'px'

  gameArea.appendChild(square.element)

  squares.push(square)
}

function createPipe() {
  const pipe = {
    position: config.gameArea.width,
    height: Math.round(Math.random() * ((config.gameArea.height - 50 - config.pipe.size / 2) - ((config.pipe.size / 2) + 50))) + ((config.pipe.size / 2) + 50),
    element: document.createElement('div'),
  }

  pipe.element.className = 'pipe'
  pipe.element.style.borderBottom = (pipe.height - (config.pipe.size / 2)) + 'px'
  pipe.element.style.borderTop = ((config.gameArea.height - pipe.height) - (config.pipe.size / 2)) + 'px'
  pipe.element.style.borderLeft = '0px'
  pipe.element.style.borderRight = '0px'
  pipe.element.style.borderStyle = 'solid'
  pipe.element.style.borderColor = 'black'
  pipe.element.style.height = config.pipe.size + 'px'
  pipe.element.style.width = config.pipe.width + 'px'
  pipe.element.style.left = pipe.position + 'px'

  gameArea.appendChild(pipe.element)

  pipes.push(pipe)
}

//refazer
function jump() {
  for (const square of squares) {
    square.position += config.global.lift
    if (square.position > config.gameArea.height)
      square.position = config.gameArea.height
    square.velocity = 0
  }
}

function gravityForce(square) {
  square.velocity += config.global.gravity
  square.position -= square.velocity
  if (square.position < 0) {
    square.position = 0
    square.death = true
  }
}

document.addEventListener('keydown', jump)

function gameLoop() {
  if (!config.global.isGameOver) {
    config.global.isGameOver = true
    const pipe = pipes.find((pipe) => pipe.position < config.square.distance + config.square.size && pipe.position >= config.square.distance - config.pipe.width)

    for (const square of squares) {
      if (!square.death) {
        gravityForce(square)

        square.element.style.bottom = square.position + 'px'

        if (pipe) {
          const diff = square.position - pipe.height
          if ((diff <= -(config.pipe.size / 2) || diff >= (config.pipe.size / 2 - config.square.size)) && pipe.position > (config.square.distance - config.pipe.width)) {
            square.death = true
          }
          if (!square.death && pipe.position <= config.square.distance - config.pipe.width) {
            square.score++
            score.innerText = square.score
          }

        }
      }

      if (!square.death) {
        config.global.isGameOver = false
      }
    }

    for (const pipe of pipes) {
      pipe.position -= config.pipe.velocity

      if (pipe.position == config.gameArea.width - config.pipe.distance)
        createPipe()

      if (pipe.position <= -(config.pipe.width)) {
        pipe.element.remove()
        pipes.shift()
      }

      pipe.element.style.left = pipe.position + 'px'
    }

    requestAnimationFrame(gameLoop)
  } else {
    gameName.style.zIndex = 1
    playButton.style.visibility = 'visible'
    configButton.style.visibility = 'visible'
  }
}

gameLoop()