console.log("JS Loaded")
// ----- Constants ----- //


// ----- Variables ----- //


// Card numerical values for the player and dealer
let playerTotal = 0
let dealerTotal = 0
// Account balance total, initialized at $500
let accountBalance = 500
//init value to allow the player to draw a card if the value of playerTotal is less than 21
let hitMe = true
// if a player or dealer has an ace it could be evaluated as either a 1 or a 10 depending on the hand
let playerAces
let dealerAces
// Working storage to track the value of the dealers hidden card
let hiddenCard
let deck
let message = "Welcome"


// ----- Event Listeners ----- //
// "Hit button"
document.getElementById("hit").addEventListener("click", hit)

// "Stay button"
document.getElementById("stay").addEventListener("click", stay)

// "Deal button"
document.getElementById("deal").addEventListener("click", deal)

// "Leave button"
document.getElementById("leave-game").addEventListener("click", leaveGame)

// "Bet 20 button"
document.getElementById("bet20").addEventListener("click", wager)

// "Bet 20 button"
document.getElementById("bet50").addEventListener("click", wager)

// "Bet 100 button"
document.getElementById("bet100").addEventListener("click", wager)

// ----- Functions ----- //

// init
gameFlow()


function gameFlow() {
    console.log("initializing game")
    //checkBalance();  -->see if the player has enough in their account to play.  If not end game
    createDeck();
    console.log("Deck created")
    shuffleCards();
    console.log("Cards shuffled")
    firstHand();
    console.log("First Hand Delt")
    console.log("Hidden Card = " + hidden)
    console.log("Hidden Card Total = " + dealerTotal)
    dealerCard();
    console.log("Dealer Initial Hand dealt")
    initPlayerCards();
    console.log("Player Initial hand dealt")
    console.log("Player Total = " + playerTotal)



}
// This function will create the deck by using nested for loops to create the card value and suit (to be associated with the corresponding .png)  NOTE:  ForEach can be used here - icebox
function createDeck () {
    let suits = ["S", "H", "C", "D"] //this array identies the cars as a spade, heart, club or diamond
    let cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"] //this array will be used to identify the first element of the card
    deck = []; //initialize the deck array which will contain the fully qualified card ()
    //iterate through the arrays to build the deck
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
            deck.push(cardValues[j] + "-" + suits[i]) //build naming convention used in imgs/cards (ex 2-D = 2 of diamonds png)
        }
    }
}
// This function will randomly shuffle/calculate the cards from the createDeck function
function shuffleCards() {
    for (let i = 0; i < deck.length; i++) { //iterate through the 52 cards (deck.length)
        let c = Math.floor(Math.random() * deck.length) //randomly select the card from the deck created
        let temp = deck[i] //create the shuffled deck by 
            deck[i] = deck[c]
            deck[c] = temp
    //console.log(deck)
    }
}

function firstHand() {
    hidden = deck.pop() //grab the last card from the deck and assign it to the dealer hidden card
    dealerTotal += getCardValue(hidden); //call getCardValue with the hidden card value
    dealerAces += aceCheck(hidden); //check to see if the dealer has an ace as their hidden card

}
// This function will determine the value of a card if the card is a non-numerical card (i.e. Ace, King, Queen, Jack) and return the corresponding value of the cards
function getCardValue(card) {
    let data = card.split("-") // isolate the card value and suit (2-D --> ["2", "D"])  
    let cardValue = data[0] //grab the first index (i.e. 2-D would grab 2) and assign that to cardValue
    
    if (cardValue == "J" || cardValue == "Q" || cardValue == "K") { //convert face-cards to 10
        return 10
    } 
    if (cardValue == "A") { //convert an ace to 11
        return 11
    }

    return parseInt(cardValue) //return the numerical value of the card for all non-face-cards or aces by parsing the deck string and returning the corresponding integer
}

function aceCheck(card) {
    if (card[0] == "A") {
        return 1
    } else {
        return 0
    }
}

function dealerCard() {
    if (dealerTotal < 18) {
        let cardImage = document.createElement("img") // create a new image tag for the  <div id = "dealer-cards"> assign to cardImage variable
        let card = deck.pop() //grab the last card in the randomized deck
        cardImage.src = "./imgs/cards/" + card + ".png" // create link to the card visual
        dealerTotal += getCardValue(card); //add the total of the hidden card and the card selected
        dealerAces += aceCheck(card); //check if the card is an Ace
        document.getElementById("dealer-cards").append(cardImage)
        console.log("Dealer Total = " + dealerTotal)
    } else {
        message = "Dealer:  Dealer Stays..."
    }
}
// This funciton is used to populate the intial 2 cards for the ployer deck
function initPlayerCards () {
    for (let i = 0; i < 2; i++) { //populate the screen with 2 cards using the for loop 
        let cardImage = document.createElement("img") // create a new image tag for the  <div id = "player-cards"> assign to cardImage variable
        let card = deck.shift() //grab the first card in the randomized deck
        cardImage.src = "./imgs/cards/" + card + ".png" // create link to the card visual
        playerTotal += getCardValue(card); //add the total of the hidden card and the card selected
        playerAces += aceCheck(card); //check if the card is an Ace
        document.getElementById("player-cards").append(cardImage) //target the player-cards ID and append the card image for the associated card
    }
}

function hit () {
    console.log("Clicked Hit Button")
    // Check to see if the player has 21.  If so do not let them hit/disable hit button. Mesasge =  "You already have 21, can't take a hit..."
    // Check to see if player has over 21.  If so do not let them hit/disable hit button.  Message = "You bust..."  Determine winner or tie.
    // Else allow player to hit
    // if player hit puts them over 21 evaluate dealer hand and determine winner or tie
    // it player hits and they are under 21 let dealer take their turn

}

function stay() {
    console.log("Clicked Stay Button")
    // let dealer take their turn
    // determine win, lose, tie
}

function deal() {
    console.log("Clicked Deal Button")
    // only can be invoked if player has 20 or more in their account balance
    // can only be invoked if player enters a valid wager first
    // call gameflow() to start new round
    // deactivate deal button untl end of game
    
}

function leaveGame() {
    console.log("Clicked Leave Button")
}

function wager() {
    console.log("Clicked a wager button")
    // icebox ---> allow for multiple clicks of wager buttons

}

function acctBalance() {
    //determine if balance is being reduced via wager
    //determine if balance is being incremented due to win
    //determine if balance is restored due to tie
}

function messageSystem() {
    //display appropriate message in the message-display to player

}

// render cards
// winning hand
// message system
// wager button logic
// action button handling


