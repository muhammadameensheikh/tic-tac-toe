const boxes = document.querySelectorAll('.box');
const playerX = document.getElementById('playerX');
const playerO = document.getElementById('playerO');
const dialogBox = document.getElementById('dialog-box');
const txt = dialogBox.querySelector('h1');
const resetBtn = document.getElementById('reset-game');
const xScore = document.getElementById('x-score');
const oScore = document.getElementById('o-score');
const playBtn = document.getElementById('play');
const board = document.getElementById('board');

var xScoreCount = 0;
var oScoreCount = 0

var flag = 1;
var currentClass;
const winningComb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]



const addMark = () =>{
    for(const box of boxes){
        box.addEventListener('click', handleClick, {once : true});
    }
}

const handleClick = (e) =>{
    box = e.target;
    if(flag == 1){
        box.innerText = 'X';
        flag = 0;
        playerX.classList.remove('player-turn');
        playerO.classList.add('player-turn')
        box.classList.add('X');
        currentClass = 'X';
    }
    else{
        box.innerText = 'O';
        flag = 1;
        playerX.classList.add('player-turn');
        playerO.classList.remove('player-turn')
        box.classList.add('O');
        currentClass = 'O';
    }
    if(checkWinner(currentClass)){
        endGame(true);
        if(currentClass == 'X'){
            xScoreCount =  xScore.innerHTML;
            xScoreCount++;
            xScore.innerHTML = xScoreCount;
         }
         else{
             oScoreCount = oScore.innerHTML;
             oScoreCount++;
             oScore.innerHTML = oScoreCount
         }
    } 
    else if(isDraw()){
        endGame(false);
    } 
}



const checkWinner = (currentClass) =>{
   return  winningComb.some(combination => {
    return  combination.every(index =>{
        return boxes[index].classList.contains(currentClass);
        })
    })
}


const isDraw = () =>{
    return [...boxes].every(singBox => {
        return singBox.classList.contains('X') || singBox.classList.contains('O')
    })
}





const resetGame = () =>{
    resetBtn.addEventListener('click', function(){
        location.reload()
    })
}
const playAgain = () =>{
    playBtn.addEventListener('click', function(){
        dialogBox.classList.remove('display');
        for(const box of boxes){
            if(box.classList.contains('X') || box.classList.contains('O')){
                box.innerText = '';
                box.classList.remove('O');
                box.classList.remove('X');
                flag = 1;
                playerX.classList.add('player-turn');
                playerO.classList.remove('player-turn')
            }
        }
    })
}

const score = () =>{
    xScore.innerText = xScoreCount;
    oScore.innerText = oScoreCount;
}

const endGame = (winCheck) =>{
    addMark();
    score();
    resetGame();

    if(winCheck == false){
        txt.innerText = 'Draw!';
        dialogBox.classList.add('display');
        playAgain();
    }
    else if(winCheck == true){
       txt.innerText = currentClass + ' has won!';
        dialogBox.classList.add('display')
        playAgain();
       
    }
    
}
endGame()









