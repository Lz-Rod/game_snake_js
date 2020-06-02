let canvas = document.getElementById("snake"); //essa variavel chama o canvas do HTML
let context = canvas.getContext("2d");//essa variavel define o plano 2D para o canvas
let box = 32; //define o tamanho em pixels de cada quadrado do jogo

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarComida(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); //esse eventlistener pega a tecla que foi pressionada no teclado e chama a função update, serve para controlar a movimentação

function update (event) {// essa função controla a movimentação da cobrinha, ela testa a tecla pressionada, e verifica se a direção atual dela não seja a oposta a tecla pressionada, isso serve para que a cobra não volte e bugue o jogo
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){
    //esses ifs fazem a cobrinha atravessar a parede e voltar no lado oposto
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    //define a derrota quando a cabeça da cobra se choca com o corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    criarComida();

    let snakeX = snake[0].x;//define o x de partida ao iniciar o jogo
    let snakeY = snake[0].y;//define o y de partida ao iniciar o jogo

    //os ifs abaixo definem a movimentação da cobrinha
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    //esses if farão a comida sumir cada vez que a cobrinha encostar nela e reaparecer em outro lugar, ao mesmo tempo que a cobrinha aumenta o tamanho
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();//retira o ultimo elemento do array
    } else {
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    

    let newHead = {//adiciona o novo quadrado a cabeça da cobra
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha

}

let jogo = setInterval(iniciarJogo, 100);//a cada 100 milisegundos a tela é atualizada para dar a ilusão de movimento ao jogo