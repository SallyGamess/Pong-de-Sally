// variáveis da bolinha.
let xBolinha = 300;
let yBolinha = 200;
let diametroDaBolinha = 15;
let raio = diametroDaBolinha / 2;

//velocidade da bolinha.
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis minha raquete.
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

//variáveis do oponente.
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload (){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha ();
  movimentaBolinha ();
  verificaColisaoBorda();
  mostraRaquete (xRaquete,yRaquete);
  movimentaRaquete ();
  verificaColisaoRaquete (xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente ();
  verificaColisaoRaquete (xRaqueteOponente, yRaqueteOponente)
  incluiPlacar();
  marcaPonto();
 bolinhaNaoFicaPresa();
calcularChanceDeErrar ();
}

function mostraBolinha (){
  circle(xBolinha,yBolinha,diametroDaBolinha);
}

function movimentaBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda (){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio  < 0){
    velocidadeYBolinha *= -1;
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}


function mostraRaquete (x,y){
  rect (x, y, raqueteComprimento, raqueteAltura);
}


function movimentaRaquete (){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
}
}

function movimentaRaqueteOponente (){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calcularChanceDeErrar ();
}

function calcularChanceDeErrar (){
  if (pontosDoOponente >= meusPontos){
    chanceDeErrar += 1;
  }
  if (chanceDeErrar >= 39){
    chanceDeErrar = 50;
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35;
    }
  }
}

function incluiPlacar (){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color (255, 153, 255));
  rect (150, 10, 40, 20);
  fill(255);
  text (meusPontos,170,26);
  fill(color(255, 153, 255));
  rect (450,10, 40, 20);
  fill(255);
  text (pontosDoOponente, 470, 26);
}

function marcaPonto (){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function verificaColisaoRaquete (){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1; 
  }
}

function verificaColisaoRaquete (x,y){
  colidiu = collideRectCircle (x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu ){
    velocidadeXBolinha *= - 1;
    raquetada.play();
  }
}


function colisaoRaqueteOponenteBiblioteca (){
  colidiu = collideRectCircle (xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu ){
    velocidadeXBolinha *= - 1;
    raquetada.play();
  }
}

