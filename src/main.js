// let myGamePiece;
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
    this.interval = setInterval(updateGameArea, 20)
  }

  start() {
    document.body.prepend(this.canvas) 
    document.addEventListener('keydown', (e)=>{
      let rockbottom = myGameArea.canvas.height - actor.height
      if( actor.y < rockbottom) 
        return;
      if(e.key ===  ' ')
        jump(-4.8)
    } )
    document.addEventListener('keydown', e=> {
      if(e.key === 'ArrowRight')
        actor.speedX = 2
    })
    document.addEventListener('keyup', e=> {
      if(e.key === 'ArrowRight')
        actor.speedX = 0
    })
    document.addEventListener('keydown', e=> {
      if(e.key === 'ArrowLeft')
        actor.speedX = -2
    })
    document.addEventListener('keyup', e=> {
      if(e.key === 'ArrowLeft')
        actor.speedX = 0
    })
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
    this.gravity = 0.2
    this.hitBottom() 
  }

  hitBottom() {
    let rockbottom = myGameArea.canvas.height - this.height
    if( this.y > rockbottom) {
      this.y = rockbottom
      this.gravitySpeed = 0
    } 
  }

  crashWith(otherobj) {
    let myleft = this.x
    let myright = this.x + (this.width)
    let mytop = this.y
    let mybottom = this.y + (this.height)
    let otherleft = otherobj.x
    let otherright = otherobj.x + (otherobj.width)
    let othertop = otherobj.y
    let otherbottom = otherobj.y + (otherobj.height)
    let crash = true
    if( (mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false
    }
    return crash
  }
}  

myScore = new Component("30px", "Consolas", "slateblue", 280, 40, "text")
let actor = new Component(30, 30, "lime", 10, 120)
let randomInterval = random(100, 150)


function startGame() {
  myGameArea = new GameArea()
  myGameArea.start()
  myScore.text = 0
}

function updateGameArea() {
  for(let i=0; i<myObstacles.length; i++) {
    if(actor.crashWith(myObstacles[i])) {
      return 
    }
  }
  myGameArea.clear()
  myGameArea.frameNo +=1
  if(myGameArea.frameNo === 1 || everyInterval(150) ) {
    // console.log(myObstacles.length)
    let x = myGameArea.canvas.width
    let randomHeight = random(30,50 )
    // console.log(randomHeight)
    let y = myGameArea.canvas.height - randomHeight
    myObstacles.push(new Component(10,randomHeight, "red", x, y ))
    // console.log(myObstacles)
  }
  for(let i=0; i<myObstacles.length; i++) {
    myObstacles[i].x -= 1
    myObstacles[i].update()
    // if(myObstacles[i].x < -10) {
    //   myObstacles.splice(i, 1)
    // }
  }
  
   myScore.text='SCORE: ' + myObstacles.length
  myScore.update()
  actor.newPos()
  actor.update() 
}

function everyInterval(n) {
  if( (myGameArea.frameNo / n) % 1 === 0) {
    // myObstacles.filter( el=>el.x < -10)
    return true 
  }
  return false
}

function jump(n) {
  actor.gravity = n
}

function random(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}

function reset() {
  window.location.reload()
}