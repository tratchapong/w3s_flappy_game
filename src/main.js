let myGamePiece;
let myObstacles = [];
let myScore;
let myGameArea

class GameArea {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = 480
    this.canvas.height = 270
    this.context = this.canvas.getContext('2d')
    this.frameNo = 0
    // this.interval = setInterval(updateGameArea, 20)
  }

  start() {
    document.body.prepend(this.canvas) 
  }
}

class Component {
  constructor(width, height, color, x, y, type) {
    this.width = width
    this.height = height
    this.color = color
    this.x = x
    this.y = y
    this.type = type
    this.score = 0
    this.speedX = 0
    this.speedY = 0
    this.gravity = 0
    this.gravitySpeed = 0
  }

  update() {
    let ctx = myGameArea.context
    ctx.fillStyle = this.color
    if(this?.type === 'text') {
      console.log(999)
      ctx.font = this.width + " " + this.height
      ctx.fillText(this.text, this.x, this.y)
    } else {
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }

  }
}

function startGame() {
  myGameArea = new GameArea()
  myGameArea.start()
  let actor = new Component(30, 30, "red", 10, 120)
  actor.update()
  let title = new Component("30px", "Consolas", "violet", 280, 40, "text")
  title.text = "Codecamp"
  title.update()
}