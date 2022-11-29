let inputDir = {x: 0, y:0};
const foodSound = new Audio('food.mp3');
const GameOverSound = new Audio('Game Over 3.wav');
const moveSound = new Audio('Insect Move Object On Dirt.mp3');
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 23, y: 20}
]
food = {x: 9, y: 35};



function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
        if (snake[0].x >= 50 || snake[0].x <=0 || snake[0].y >= 50 || snake[0].y <=0){
            return true;
        }
        return false;
    }

function gameEngine() {
    if (isCollide(snakeArr)) {
        GameOverSound.play();
        inputDir = {x: 0, y: 0};
        swal.fire("Game Over");
        snakeArr = [{x: 23, y: 20}];
        score = 0;
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>Highscoreval){
            Highscoreval = score;
            localStorage.setItem("Highscore", JSON.stringify(Highscoreval));
            HighscoreBox.innerHTML = "Highscore: " + Highscoreval;
        }

        scoreBox.innerHTML ="score: " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y
        });
        let a = 7;
        let b = 49;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b -a)*Math.random())}
    }

    for (let i = snakeArr.length - 2; i>=0; i--){
        const element = Array[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        
        else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}


let Highscore = localStorage.getItem("Highscore");
if(Highscore === null){
    Highscoreval = 0;
    localStorage.setItem("Highscore", JSON.stringify(Highscoreval))
}
else{
    Highscoreval = JSON.parse(Highscore);
    HighscoreBox.innerHTML = "High Score: " + Highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

            case "ArrowDown":
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case "ArrowLeft":
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            case "ArrowRight":
                inputDir.x = 1;
                inputDir.y = 0;
                break;

        default:
            break;
    }
});