let order = [];
let clickedOrder = [];
let score = 0;
let level = 0;

// identificação das áreas
// 0 - vermelho
// 1 - verde
// 2 - amarelo
// 3 - azul

const blue = document.querySelector('.area-blue');
const red = document.querySelector('.area-red');
const yellow = document.querySelector('.area-yellow');
const green = document.querySelector('.area-green');

const txtPontos = document.querySelector('#pontos');
const txtNiveis = document.querySelector('#nivel');
const btnRepetir = document.querySelector('.button-repetir');

// sorteia a ordem das cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor,  Number(i) + 1);
    }
}

// repete sequencia de cores
let repeatlightColorSequence = () => {
    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor,  Number(i) + 1);
    }
}

// volta todas as cores ao normal 
let clearlightColor = () => {
    setTimeout(() => {
        red.classList.remove('selected-area');
        green.classList.remove('selected-area');
        yellow.classList.remove('selected-area');
        blue.classList.remove('selected-area');
    })
}

// acende a cor
let lightColor = (element, time) => {
    time = time * 500;
    setTimeout(() => {
        element.classList.add('selected-area');
    }, time - 400);
    setTimeout(() => {
        element.classList.remove('selected-area');
    }, time );
}

// verifica ordem clicada pelo usuario
let checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
        score++;
    }
    if(clickedOrder.length == order.length){
        txtPontos.innerHTML = score.toString();
        txtNiveis.innerHTML = level.toString();
        nextLevel();
    }
}

// quando usuario clica
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected-area');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected-area');
        checkOrder();
    }, 250);

}

// retorna a cor
let createColorElement = (color) => {
    switch(color){
        case 0:
            return red;
        case 1:
            return green;
        case 2:
            return yellow;
        case 3:
            return blue;
    }
}

// ganhou
let nextLevel = () => {
    level++;
    shuffleOrder();
}

// perdeu
let gameOver = () => {
    order = [];
    clickedOrder = [];

    alert(`Pontuação: ${score}\n Você perdeu :( \n Clique em OK para recomeçar`);
    
    playGame();
}

// jogando o jogo
let playGame = () => {
    score = 0;
    level = 0;
    
    txtPontos.innerHTML = score.toString();
    txtNiveis.innerHTML = level.toString();

    nextLevel();

}

red.onclick = () => click(0);
green.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// verifica clicks no botao repetir
btnRepetir.onclick = () => {
    if(score == 0){
        repeatlightColorSequence();
        return;
    }
    score -= score/10;
    txtPontos.innerHTML = score.toFixed(2).toString();
    repeatlightColorSequence();

}

// jogando pela primeira vez
let playFistTime = () => {
    alert("Bem vindo ao Gênius! \n Iniciar Novo Jogo !");
    playGame();
}

// iniciando o js
playFistTime();