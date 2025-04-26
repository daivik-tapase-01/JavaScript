let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newbut = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg_container");
let para = document.querySelector("#msg");

let turnO = true;
let clickCount = 0 ;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            turnO = false;
            clickCount++;
        }else{
            box.innerText="X";
            turnO = true;
            clickCount++;
        }
        box.disabled="true";

        checkWinner();
    })
})

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const checkWinner = () => {
    
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText; 
        
        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }else if (clickCount == 9 ){
                msg.innerText="Draw, try again!";
                msgContainer.classList.remove("hide");
            }
        }
    }
}

const showWinner= (pos1Val) => {
    msg.innerText=`Congratulation, Winner is ${pos1Val}`
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    clickCount = 0;
}

newbut.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);


