var trex, trex_running, edges;
var groundImage,solo;
var chao
var cloud
var cloudImage
var obstaculo
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstaculo1 = loadImage("obstacle1.png")
  obstaculo2 = loadImage("obstacle2.png")
  obstaculo3 = loadImage("obstacle3.png")
  obstaculo4 = loadImage("obstacle4.png")
  obstaculo5 = loadImage("obstacle5.png")
  obstaculo6 = loadImage("obstacle6.png")
}

function setup(){
  
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  solo = createSprite(180,180,600,20)
  solo.addImage("graminha",groundImage)
  chao = createSprite(180,190,600,10)
  chao.visible=false

}


function draw(){
  //definir a cor do plano de fundo 
  background("gray");
  
  //registrando a posição y do trex
  console.log(trex.y)
  solo.velocityX=-5
  if(solo.x<0){
    solo.x=solo.width/2
  }
  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&&trex.y>150){
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  createCloud(  )
  createObstaculo(  )
 //impedir que o trex caia
  trex.collide(chao)
  drawSprites();
}
function createCloud(){
  if(frameCount%60===0){
  cloud = createSprite (600,10,20,15)
  cloud.addImage("nuvem",cloudImage)
  cloud.velocityX = -5
  cloud.y = Math.round(random(10,150))
  cloud.scale = 0.7
  cloud.depth = trex.depth
  trex.depth++
  cloud.setLifetime=120
}
}
function createObstaculo(){
if(frameCont%60===0){
obstaculo = createSprite (600,170,10,10)
  obstaculo.velocityX = -5
  var escolha= Math.round(random(1,6))
  obstaculo.scale = 0.7
  obstaculo.depth = trex.depth
  trex.depth++
  obstaculo.setLifetime=120
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