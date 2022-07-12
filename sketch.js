var trex, trex_running, edges;
var groundImage,solo;
var chao
var cloud
var cloudImage
var obstaculo
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6
var gamestate = "playing"
var cactus, nuvens
var ponto, morte, pulo
var pontuacao =0
var morreu
var restart, imagemRestart
var gameOver, imagemGameOver
function preload(){
  morreu = loadImage("trex_collided.png")
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstaculo1 = loadImage("obstacle1.png")
  obstaculo2 = loadImage("obstacle2.png")
  obstaculo3 = loadImage("obstacle3.png")
  obstaculo4 = loadImage("obstacle4.png")
  obstaculo5 = loadImage("obstacle5.png")
  obstaculo6 = loadImage("obstacle6.png")
  morte = loadSound ("die.mp3")
  ponto = loadSound ("checkpoint.mp3")
  pulo = loadSound ("jump.mp3")
  imagemRestart = loadImage ("restart.png")
  imagemGameOver = loadImage ("gameOver.png")

}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,height-140,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("morreu",morreu)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  solo = createSprite(width/2,height-20,width,20)
  solo.addImage("graminha",groundImage)
  chao = createSprite(width/2,height-10,width,10)
  chao.visible=false

  nuvens = new Group ()
  cactus = new Group ()
  trex.debug=false
  trex.setCollider("circle",0,0,40)
  restart = createSprite (width/2,height/2)
  restart.addImage(imagemRestart)
  gameOver = createSprite (width/2,height/2-30)
  gameOver.addImage(imagemGameOver)
  gameOver.scale = 0.4
  restart.scale=0.4
  gameOver.visible = false
  restart.visible = false
}


function draw(){
  //definir a cor do plano de fundo 
  background("gray");
 fill ("black")
  text("pontos "+ pontuacao, 500, 50 )
  if(pontuacao>0&&pontuacao%500===0){
    ponto.play()
  }
  if (gamestate==="playing") {
  pontuacao = pontuacao+ Math.round(frameCount/120)
    solo.velocityX=-(5+pontuacao/100)
  if(solo.x<0){
    solo.x=solo.width/2
  }
  createCloud(  )
  createObstaculo(  )
  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&&trex.y>height-50){
    trex.velocityY = -10;
    pulo.play()
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  if (trex.isTouching(cactus)) {
    gamestate="fim"
    morte.play()
  }
  } else if(gamestate==="fim") {
    solo.velocityX= 0
    trex.changeAnimation ("morreu",morreu)
    trex.velocityY= 0
    nuvens.setVelocityXEach(0)
    cactus.setVelocityXEach(0)
    nuvens.setLifetimeEach(-1)
    cactus.setLifetimeEach(-1)
    restart.visible = true
    gameOver.visible= true
    textAlign(CENTER)
    text ("aperte o mouse para restart",width/2,height/2+40)
    if(mousePressedOver(restart)){
     reset()
   
   }
   

  }
  

 
 
 //impedir que o trex caia
  trex.collide(chao)
  drawSprites();
}
function reset(){
  gamestate= "playing"
  pontuacao=0
  cactus.destroyEach()
  nuvens.destroyEach()
  trex.changeAnimation("running", trex_running);
  gameOver.visible = false
  restart.visible = false
}
function createCloud(){
  if(frameCount%60===0){
  cloud = createSprite (width,10,20,15)
  cloud.addImage("nuvem",cloudImage)
  cloud.velocityX = -5
  cloud.y = Math.round(random(10,height/2))
  cloud.scale = 0.7
  cloud.depth = trex.depth
  trex.depth++
  cloud.lifetime=1120
  nuvens.add(cloud)
}
}
function createObstaculo(){
if(frameCount%60===0){
obstaculo = createSprite (width,height-30,10,10)
  obstaculo.velocityX = -(5+pontuacao/100)
  var escolha= Math.round(random(1,6))
  obstaculo.scale = 0.7
  obstaculo.depth = trex.depth
  trex.depth++
  obstaculo.lifetime=1120
  cactus.add(obstaculo)
  switch (escolha){
  case 1: obstaculo.addImage(obstaculo1);
  break;
  case 2: obstaculo.addImage(obstaculo2);
  break;
  case 3: obstaculo.addImage(obstaculo3);
  break;
  case 4: obstaculo.addImage(obstaculo4);
  break;
  case 5: obstaculo.addImage(obstaculo5);
  break;
  case 6: obstaculo.addImage(obstaculo6);
  break
  default: break

  }
}
}