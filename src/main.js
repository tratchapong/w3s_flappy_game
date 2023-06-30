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
    this.interval = setInterval(updateGameArea, 50)
  }

  start() {
    document.body.prepend(this.canvas) 
  }

  clear() {
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
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
      ctx.font = this.width + " " + this.height
      ctx.fillText(this.text, this.x, this.y)
    } else {
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }

  newPos() {
    this.gravitySpeed += this.gravity
    this.x += this.speedX
    this.y += this.speedY + this.gravitySpeed
    this.hitBottom()
  }

  hitBottom() {
    let rockbottom = myGameArea.canvas.height - this.height
    if( this.y > rockbottom) {
      this.y = rockbottom
      this.gravitySpeed = 0
    }
  }
}

let title = new Component("30px", "Consolas", "violet", 280, 40, "text")
title.text = "Codecamp"
let actor = new Component(30, 30, "red", 10, 120)
let direction = 1

function startGame() {
  myGameArea = new GameArea()
  myGameArea.start()
  actor.update()
  title.update()
}

function updateGameArea() {
  let ctx = myGameArea.context
  myGameArea.clear()
  if (title.x < -ctx.measureText(title.text).width ){
    console.log(ctx.measureText(title.text).width)
    title.x = myGameArea.canvas.width
  }
  title.x -= 5
  title.update()
  actor.x +=10 * direction
  if(actor.x > myGameArea.canvas.width - actor.width)
    direction = -1
  if(actor.x < 0 )
    direction = 1
  actor.update()
  
}