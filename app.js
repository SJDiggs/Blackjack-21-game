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




// ----- Cached DOM elements ----- //



// ----- Event Listeners ----- //



// ----- Functions ----- //

// init
init()


function init() {
    console.log("initializing game")
    createDeck();
    console.log("Deck created")
    shuffleCards();
    console.log("Cards shuffled")
    firstHand();
    console.log("First Hand Delt")
    console.log(hidden)
    console.log(dealerTotal)

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
    let cardValue = data[0]
    if (cardValue == "J" || cardValue == "Q" || cardValue == "K") { //convert face-cards to number 10
        return 10
    }
    if (cardValue = "A") { //convert ace to 11
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
// render
// winning
// message system
// account balance add/decrease
// leave game
// deal hand
// hit logic
