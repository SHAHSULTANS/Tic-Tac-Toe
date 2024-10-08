

const cells=document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const restartBtn=document.querySelector("#restartBtn");

const windConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];
let options=["","","","","","","","",""];

let currentPlayer="X";
let running =true;

initializedGame();
function initializedGame(){
    cells.forEach((cell)=>{
        cell.addEventListener("click",cellClicked);
    
    });

    restartBtn.addEventListener("click",restartGame);
    statusText.textContent=`${currentPlayer}'s turn`;

}

function cellClicked(){
    const cellIndex=this.getAttribute("cellIndex");
    //console.log(cellIndex);
    //console.log(this);
    if(options[cellIndex]!=""||!running){
        console.log("YES");
        return;
    }

    updateCell(this,cellIndex);
    //changePlayer();
    checkWinner();

}

function updateCell(cell,index){
    options[index]=currentPlayer;
    //console.log(cell);
    cell.innerText=currentPlayer;

}
function changePlayer(){
    //console.log("YES");
    currentPlayer=(currentPlayer=="X")?"O":"X";
    statusText.textContent=`${currentPlayer}'s turn`;


}

function checkWinner(){
    let roundWon=false;

    for(let i=0;i<windConditions.length;i++){
        const condition=windConditions[i];

        const cellA=options[condition[0]];
        const cellB=options[condition[1]];
        const cellC=options[condition[2]];

        if(cellA==""||cellB==""||cellC==""){
            continue;
        }
        if(cellA==cellB && cellB==cellC){
            roundWon=true;
            break;
        }
        
    }

    if(roundWon){
        statusText.textContent=`${currentPlayer} Wins`;
        running=false;

    }
    else if(!options.includes("")){
        statusText.textContent=`Draw!`;
        running=false;
    }
    else{
        changePlayer();
    }

}
function restartGame(){
    currentPlayer='X';
    options=["","","","","","","","",""];
    statusText.textContent=`${currentPlayer}'s turn`;
    cells.forEach((cell)=>{
        cell.textContent="";
    });
    running=true;

    

}