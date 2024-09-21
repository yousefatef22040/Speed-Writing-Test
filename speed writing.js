//array of words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "python",
    "Scale",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing",
    "yousef"
];

//setting levels
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2,
}

//defult level
let defultLevelName = "Normal" //Change level from here
let defultLevelSeconds = lvls[defultLevelName]

//catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".got");
let scoreTotal = document.querySelector(".total");
let finishMessage = document.querySelector(".finish");

//setting level name + seconds + score
lvlNameSpan.innerHTML = defultLevelName;
secondsSpan.innerHTML = defultLevelSeconds;
timeLeftSpan.innerHTML = defultLevelSeconds;
scoreTotal.innerHTML = words.length;

//disable paste event
input.onpaste = function () {
    return false;
}

//start game
startButton.onclick = function () {
    this.remove();
    input.focus();
    // generate word function
    genWords();
}
function genWords() {
    //get random word from array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //get word index
    let wordIndex = words.indexOf(randomWord);
    //remove woed from array
    words.splice(wordIndex, 1);
    //show the random word
    theWord.innerHTML = randomWord
    // empty upcoming words
    upcomingWords.innerHTML = '';
    //generate words
    for (let i = 0; i < words.length; i++) {
        //create div elemnt
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div)
    }
    //call stert play function
    startplay()
}

function startplay() {
    //reset time
    timeLeftSpan.innerHTML = defultLevelSeconds

    let start = setInterval(() =>{
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML === "0"){
            //stop time
            clearInterval(start);
            //compare words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
                //empty input field
                input.value = '';
                //increase score
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    //call generate word function
                    genWords();
                } else {
                    let span = document.createElement("span");
                    span.className = 'good';
                    let spanText = document.createTextNode("congratulation");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span)
                    //remove upcoming words box
                    upcomingWords.remove();
                }
            } else{
                let span = document.createElement("span");
                span.className = 'bad';
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000)
}