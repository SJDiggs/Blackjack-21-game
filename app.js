console.log("JS Loaded")
// ----- Constants ----- //



// ----- Variables ----- //


// keep card totals for the player and dealer
let playerTotal
let dealerTotal
// keep the account balance total
let accountBalance
//init value to allow the player to draw a card if the value of playerTotal is less than 21
let hitMe = true
// if a player or dealer has an ace it could be evaluated as either a 1 or a 10 depending on the hand
let playerAces
let dealerAces
// track value of dealers hidden card
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
    
}
// render
// winning
// message system
// account balance add/decrease
// leave game
// deal hand
// hit logic
