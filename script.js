//Variables 
let numOfPlayers = 0;
let players = {};
let playerTurn = 0;
let finalResults = [];
let finishCounter = 0;
let playersTurnArr = [];
let indexOnTurn = 0;

// Function constamt result - must be deleted after! 
var constResult = 0;
function constRes(gameNum) {
    if (gameNum == 1) {
        return 100;
    } else if (gameNum == 2) {
        return 200;
    } else if (gameNum == 3) {
        return 300;
    } else if (gameNum == 4) {
        return 400;
    }
}

//Class Player 
class Player {
    constructor(name, infoBoxId, pawnId, pawnFieldId, startPawnFieldTop, startPawnFieldLeft, resultId, isFinish, allPoints) {
        this.name = name;
        this.infoBoxId = infoBoxId;
        this.pawnId = pawnId;
        this.pawnFieldId = pawnFieldId;
        this.startPawnFieldTop = startPawnFieldTop;
        this.startPawnFieldLeft = startPawnFieldLeft;
        this.color = numInfo[this.name].color;
        this.numStr = numInfo[this.name].numStr;
        this.isFinish = isFinish;
        this.resultId = resultId;
        this.allPoints = allPoints;
    }
}

// Object with basic color, name, and path of pawn image, and the beggining coordinates of Pawns
let numInfo = {
    '1': {
        'color': 'rgb(255, 84, 84)',
        'numStr': 'One',
        'imgPawnPath': '/images/pawn1.png',
        'imgPath': '/images/game1.png',
        'top': '0%',
        'left': '10.5%'
    },
    '2': {
        'color': 'rgb(95, 214, 103)',
        'numStr': 'Two',
        'imgPawnPath': '/images/pawn2.png',
        'imgPath': '/images/game2.png',
        'top': '0%',
        'left': '13%'
    },
    '3': {
        'color': 'rgb(245, 237, 98)',
        'numStr': 'Three',
        'imgPawnPath': '/images/pawn3.png',
        'imgPath': '/images/game3.png',
        'top': '3%',
        'left': '11.2%'
    },
    '4': {
        'color': 'rgb(115, 222, 252)',
        'numStr': 'Four',
        'imgPawnPath': '/images/pawn4.png',
        'imgPath': '/images/game4.png',
        'top': '3%',
        'left': '14.2%'
    }
};

// The Matrix with field  numbers
let movingCodinates = [
    [0, 1, 2, 3],
    [7, 6, 5, 4],
    [8, 9, 10, 11],
    [15, 14, 13, 12],
    [16, 17, 18, 19],
    [23, 22, 21, 20],
    [24, 25, 26, 27],
    [31, 30, 29, 28],
    [32, 33, 34, 35],
    [39, 38, 37, 36],
    [40, 41, 42, 43],
    [47, 46, 45, 44]
];

// Function that returns coordinates of a value in Matrix
function getCoordinates(array, char) {
    for (let i = 0; i < array.length; i++) {
        const i2 = array[i].indexOf(char);
        if (i2 !== -1)
            return [i, i2]
    }
    return undefined;
}

// Function that draw a different board every time
function drawBoard() {
    let counter = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0
    };
    let categories = Object.entries(numInfo);
    for (let i = 1; i <= 46; i++) {
        let fieldId = 'field' + i;
        let random = Math.floor(Math.random() * 4 + 1);
        if (counter[random] == 0) {
            document.getElementById(fieldId).src = categories[random - 1][1].imgPath;
            document.getElementById(fieldId).style.backgroundColor = colorBoard(random);
            counter[random] = 1;
        } else if (counter[random] == 1) {
            if (counter['1'] == 1 && counter['2'] == 1 && counter['3'] == 1 && counter['4'] == 1) {
                counter['1'] = 0;
                counter['2'] = 0;
                counter['3'] = 0;
                counter['4'] = 0;
                random = Math.floor(Math.random() * 4 + 1);
                document.getElementById(fieldId).src = categories[random - 1][1].imgPath;
                document.getElementById(fieldId).style.backgroundColor = colorBoard(random);
                counter[random] = 1;
            } else {
                while (counter[random] != 0) {
                    random = Math.floor(Math.random() * 4 + 1);
                    if (counter[random] == 0) {
                        document.getElementById(fieldId).src = categories[random - 1][1].imgPath;
                        document.getElementById(fieldId).style.backgroundColor = colorBoard(random);
                        counter[random] = 1;
                        break;
                    }
                }
            }
        }
    }
    roundness(3);
    roundness(4);
    roundness(7);
    roundness(8);
}

/* ---> Function for board field colors
//--> INPUT --> take a random number and change the background on the game field.
//--> OUTPUT -> return a string that is the color of the field.*/
function colorBoard(num) {
    return numInfo[num]['color'];
}

/* ---> Function that roundness the color board */
function roundness(startNum) {
    let borderRad;
    if (startNum == 3) {
        borderRad = "0 0 0 30px";
    } else if (startNum == 4) {
        borderRad = "0 0 30px 0";
    } else if (startNum == 7) {
        borderRad = "30px 0 0 0";
    } else if (startNum == 8) {
        borderRad = "0 30px 0 0";
    }
    for (let i = startNum; i <= 46; i += 8) {
        let fieldId = 'field' + i;
        let divId = 'div-' + fieldId;
        document.getElementById(fieldId).style.borderRadius = borderRad;
        document.getElementById(divId).style.borderRadius = borderRad;
    }
}

// ---> Function onLoad() 
function onLoad() {
    drawBoard();
    let str = "Player One Finish with 2000 points!";
    document.getElementById("finalMessage").value = str;
}

/* ---> Function onClick Start Button
//--> Hide the Start Button Section
//--> Show Rulles Message Alert
//--> Make the dropdawn Menu for choosing players */
function start() {
    document.getElementById("rulles-message").style.display = "flex";
    document.getElementById("start-button-section").style.display = "none";

    //Dropdawn menu for choosing number of players
    const playersNumbers = [2, 3, 4];
    var dropdown = document.getElementById("selectPlayers");
    for (let i = 0; i < playersNumbers.length; ++i) {
        dropdown[dropdown.length] = new Option(playersNumbers[i], playersNumbers[i]);
    }
}

/* ---> Function for OK Button to Game Rulles Message
//--> Hide Rulles Message
//--> Show board
//--> Show Info Field
//--> Show the Pawns of number of Players
//--> GET the Numbers of players in the Game
//--> Set Start Numbers Of players
//--> OUTPUT -> number of players */
function okRulllesButton() {
    if (document.getElementById("selectPlayers").value == 'Please select') {
        alert('Please select number of Players from 2 to 4 and Try again!');
    } else {
        document.getElementById("rulles-message").style.display = "none";
        document.getElementById("board").style.display = "flex";
        document.getElementById("info").style.display = "flex";
    
        //Take the number of playres and create Object 
        numOfPlayers = document.getElementById("selectPlayers").value;
        for (let i = 1; i <= numOfPlayers; i++) {
            playersTurnArr.push(i);
            let name = i;
            let infoBoxId = 'infoPl-' + name;
            let pawnId = 'pawn' + name;
            let pawnFieldId = 0;
            let startPawnFieldTop = numInfo[name].top;
            let startPawnFieldLeft = numInfo[name].left;
            let resultId = 'resultPl-' + i;
            let isFinish = false;
            let allPoints = 0;
            players[i] = new Player(name, infoBoxId, pawnId, pawnFieldId, startPawnFieldTop, startPawnFieldLeft, resultId, isFinish, allPoints);
            document.getElementById(infoBoxId).style.display = "flex";
            document.getElementById(infoBoxId).style.borderColor = players[i].color;
            document.getElementById(infoBoxId).style.color = players[i].color;
            document.getElementById(pawnId).style.display = "flex";
        }
        playerTurn = playersTurnArr[indexOnTurn]
        playerTurnChange(playerTurn);
    }
}

// ---> Function that show dice Container and show info who player is on turn
function playerTurnChange(playerTurn) {
    if (playersTurnArr.length == 0) {
        winner();
    } else {
        showDiceContainer(playerTurn);
    }
}

// ---> Function  that shows Dice Container
function showDiceContainer(playerTurn) {
    document.getElementById("dice-container").style.display = "flex";
    document.getElementById("infoText1").style.display = "flex";
    document.getElementById("infoText2").style.display = "none";
    document.getElementById("ok-rolls-button").style.display = "none";
    document.getElementById("dice").src = "/images/dices.png";
    document.getElementById("dice").style.pointerEvents = "auto";
    let infoLabelStr = `It's Player ` + players[playerTurn].numStr + ' turn!';
    document.getElementById("infoLabel").value = infoLabelStr;
    let infoText = 'Player ' + players[playerTurn].numStr + ' please click on dices to Roll the dice !';
    document.getElementById("infoText1").value = infoText;
    document.getElementById("infoText1").style.color = players[playerTurn].color;
    document.getElementById(players[playerTurn].infoBoxId).style.animation = "blinkerInfo 1s linear infinite";
}

// ---> Funcion that Roll dice
function rollDice() {
    let randomDice = Math.floor(Math.random() * 6) + 1;
    let dicePath = '/images/dice' + randomDice + '.png';
    document.getElementById("dice").src = dicePath;
    document.getElementById("dice").style.pointerEvents = "none";
    document.getElementById("infoText1").style.display = "none";
    let moveText = 'Player ' + players[playerTurn].numStr + ' please click on OK button and click on board to move your pawn with ' + randomDice + ' number of fields !';
    document.getElementById("infoText2").value = moveText;
    document.getElementById("infoText2").style.display = "flex";
    document.getElementById("infoText2").style.color = players[playerTurn].color;
    document.getElementById("ok-rolls-button").style.display = "block";
}

/* ---> Function when click on OK buttun in Roll dice message
//--> Its takes the number if move
//--> Hide Dice Section
//--> make the field the player must move blinking */
function blinkingMove() {
    diceMove = document.getElementById("dice").src;
    diceMove = Number(diceMove[diceMove.length - 5]);
    document.getElementById("dice-container").style.display = "none";
    let currentPlayerField = players[playerTurn].pawnFieldId;
    let newFieldId = Number(currentPlayerField) + Number(diceMove);

    if (newFieldId > 47) {
        newFieldId = 47;
    }
    newFieldId = 'field' + newFieldId;
    document.getElementById(newFieldId).style.animation = "blinker 3s linear infinite";
    document.getElementById(newFieldId).style.cursor = "pointer";
    document.getElementById(newFieldId).style.pointerEvents = "all";
}

// ---> Function that moves Pawns on the field
function movePawn(newField) {
    let thisId = newField.id;
    let regex = /\d+/g;
    let fieldNum = Number(thisId.match(regex));

    let oldTop = Number(players[playerTurn].startPawnFieldTop.split('').slice(0, players[playerTurn].startPawnFieldTop.length - 1).join(''));
    let stepTop = Number(getCoordinates(movingCodinates, fieldNum)[1]) * 7;
    let newTopNum = oldTop + stepTop;
    let top = newTopNum + '%';

    let oldLeft = Number(players[playerTurn].startPawnFieldLeft.split('').slice(0, players[playerTurn].startPawnFieldLeft.length - 1).join(''));
    let stepLeft = Number(getCoordinates(movingCodinates, fieldNum)[0]) * 6.66;
    if (playerTurn==3||playerTurn==4) {
        stepLeft --;
    }
    let newLeftNum = oldLeft + stepLeft;
    let left = newLeftNum + '%';

    document.getElementById(players[playerTurn].pawnId).style.marginTop = top;
    document.getElementById(players[playerTurn].pawnId).style.marginLeft = left;
    document.getElementById(thisId).style.animation = "none";
    document.getElementById(thisId).style.pointerEvents = "none";


    players[playerTurn].pawnFieldId = fieldNum;
    if (fieldNum == 47) {
        players[playerTurn].isFinish = true;
        finishCounter++;
        let pawnImgPath = '/images/pawn' + playerTurn + '.png';
        document.getElementById("pawnFinalImg").src = pawnImgPath;
        let finishMessage = 'Player ' + players[playerTurn].numStr + ' has finish with ' + players[playerTurn].allPoints+' points !';
        document.getElementById("finalMessage").value = finishMessage;
        document.getElementById("alert-container").style.display = "flex";
        document.getElementById("alert-container").style.color = players[playerTurn].color;
        let resultText = 'FINISH  -  ' + players[playerTurn].allPoints;
        document.getElementById(players[playerTurn].resultId).value = resultText;
        document.getElementById(players[playerTurn].infoBoxId).style.animation = "none";
        playersTurnArr.splice(playersTurnArr.indexOf(playerTurn), 1);
    } else if (fieldNum < 47) {
        let gameImgSrc = document.getElementById(thisId).src;
        let gameNum = gameImgSrc[gameImgSrc.length - 5];
        let gameId = 'game' + gameNum;
        document.getElementById(gameId).style.display = "flex";
        let idResultGame = "result-" + gameId;
        document.getElementById(idResultGame).value = '+' + constRes(gameNum);
        let curValue = Number(document.getElementById(players[playerTurn].resultId).value);
        let newValue = curValue + constRes(gameNum);
        players[playerTurn].allPoints = newValue;
        document.getElementById(players[playerTurn].resultId).value = newValue;
        let gameLabel = "gameLabel" + gameNum;
        let gameLabelStr = 'Game ' + numInfo[gameNum].numStr;
        document.getElementById(gameLabel).value = gameLabelStr;
    }
}

// ---> Function that close Game Container
function closeGame(thisId) {
    let id = thisId.id;
    let gameId = 'game' + id[id.length - 1];
    document.getElementById(gameId).style.display = "none";
    document.getElementById(players[playerTurn].infoBoxId).style.animation = "none";
    indexOnTurn++;
    if (indexOnTurn >= playersTurnArr.length) {
        indexOnTurn = 0;
    }
    playerTurn = playersTurnArr[indexOnTurn];
    playerTurnChange(playerTurn);
}

//function for closing Message
function closeAlert() {
    document.getElementById("alert-container").style.display = "none";
    if (indexOnTurn >= playersTurnArr.length) {
        indexOnTurn = 0;
    }
    if (playersTurnArr.length == 0) {
        document.getElementById(players[playerTurn].infoBoxId).style.animation = "none";
    }
    playerTurn = playersTurnArr[indexOnTurn];
    playerTurnChange(playerTurn);
}

//function for closing End Game Message
function closeEndGameAlert() {
    document.getElementById("end-game-container").style.display = "none";
}

//Function that determines the Winner
function winner() {
    let finalResults = Object.entries(players);
    finalResults.sort(([playerA, infoA], [playerB, infoB]) => {
        return infoB.allPoints - infoA.allPoints || infoA.name - infoB.name;
    });
    let winnerPoints = finalResults[0][1].allPoints;
    let winners = finalResults.filter((value)=> {
        if (value[1].allPoints == winnerPoints) {
            return value;
        }
    });
    let winnerMessage = '';
    if (winners.length==1) {
        winnerMessage = 'Player ' + winners[0][1].numStr + ' wins the Game with ' + winners[0][1].allPoints + ' points !';
    } else {
        winnerMessage = 'Player '+ winners[0][1].numStr;
        for (let i=1; i<winners.length; i++) {
            winnerMessage+=' and ';
            winnerMessage+= 'Player '+ winners[i][1].numStr;
        }
        winnerMessage+=' are winners with '+winnerPoints+ ' points!';
    }
    document.getElementById("endGameMessage").value = winnerMessage;
    document.getElementById("end-game-container").style.display = "flex";
}