const boxes = document.querySelectorAll('.box');
const dialogBox = document.getElementById('dialog-box');
const txt = dialogBox.querySelector('h1');
const reset = document.getElementById('reset-game');
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



const handleClick = (e) =>{

    box = e.target;
    if(flag == 1){
        box.innerHTML = 'X';
        flag = 0;
        box.classList.add('X');
        currentClass = 'X';
    }
    else{
        box.innerHTML = 'O';
        flag = 1;
        box.classList.add('O');
        currentClass = 'O';
    }
    if(checkWinner(currentClass)){
        endGame(true);
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


const addMark = () =>{
    for(const box of boxes){
        box.addEventListener('click', handleClick, {once : true});
    }
}


const resetGame = () =>{
    reset.addEventListener('click', function(){
        location.reload()
    })
}

const endGame = (winCheck) =>{
    addMark();
    if(winCheck == false){
        txt.innerText = 'Cat Game!';
        resetGame();
        dialogBox.classList.add('display')
    }
    else if(winCheck == true){
        txt.innerText = currentClass + ' has won!';
        resetGame();
        dialogBox.classList.add('display')
    }
   
    
}
endGame()









