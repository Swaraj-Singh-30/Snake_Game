
// Game Constatnts & Variables📍
let inputDir = {x:0, y:0};
const musicSound = new Audio();
const foodSound = new Audio();
const gameOverSound = new Audio();
const moveSound = new Audio();
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7}


//Game functions 🎮

function main(ctime) { //ctime = Current Time
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();
}

function isCollide(snake) {
    // If Snake Bumos into itself
    for (let i = 1; i < snakeArr.length; i++) {
       if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
           return true;
       }
    }
    // If Snake Bump Into The Wall
    if (snake[0].x >=18 || snake[0].y <= 0 || snake[0].y >=18 || snake[0].y <= 0) {
       return true;
    }
        
}

function gameEngine(){
    // Part-1 : Updating the Snake 🐍 Array And Food 🧁
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir ={x: 0, y:0 };
        alert("Game Over, Press Any Key To Play Again")
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    // Increment the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTMl ="Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }
    
    // Moving The Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part-2 : Display The Snake 🐍 and Food 🧁
    // Display The Snake 🐍
    board.innerHTMl = "";
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
    // Displaying Food 🧁
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');  
        board.appendChild(foodElement);

}





// Main Logic Starts From Here👇🏻👇🏻
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}; // Start The Game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})