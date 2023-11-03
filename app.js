console.log("JS Loaded")
// ----- Constants ----- //
// ----- Variables ----- //

// Card numerical values for the player and dealer
let playerTotal = 0
let dealerTotal = 0
// Account balance  integer to calculate numerical balance
let accountBalance = 500
let wagerAmt = 0
let wagerTotal = 0
//init value to allow the player or dealer to draw a card if they have less than 21
let hitMe = true
let leftGame = false
let wagerPlaced = false
// if a player or dealer has an ace it could be evaluated as either a 1 or a 10 depending on the hand
let playerAces = 0
let dealerAces = 0
// Working storage to track the value of the dealers hidden card
let hiddenCard
let deck
let initialGame = true

// ----- Cache the DOM ----- //

let message = document.getElementById("message-display")
let totBal = document.getElementById("acct-balance")
    totBal.innerHTML = "500"

let bet20Button = document.getElementById("bet20")
let bet50Button = document.getElementById("bet50")
let bet100Button = document.getElementById("bet100")

let hitButton = document.getElementById("hit")
let dealButton = document.getElementById("deal")
let stayButton = document.getElementById("stay")
let leaveButton = document.getElementById("leave-game")

let dealerCardsDiv = document.getElementById("dealer-cards") //test
let playerCardsDiv = document.getElementById("player-cards") //test
let hiddenCardFlag = document.getElementById("hidden")

let betAmount = document.getElementById('wager-total')

let dealerSum = document.getElementById("dealer-sum")
let playerSum = document.getElementById("player-sum")

// ----- Event Listeners ----- //

// "Hit button"
hitButton.addEventListener("click", hit)

// "Stay button"
stayButton.addEventListener("click", stay)

// "Deal button"
dealButton.addEventListener("click", deal)

// "Leave button"
leaveButton.addEventListener("click", leaveGame)

// "Bet 20 button"
bet20Button.addEventListener("click", function() {
  placeBet(20);
});

// "Bet 50 button"
bet50Button.addEventListener("click", function() {
    placeBet(50);
  });

// "Bet 100 button"
bet100Button.addEventListener("click", function() {
    placeBet(100);
  });

// ----- Functions ----- //

// init
initGameBoard();

// Main
gameFlow();

function gameFlow() {
    console.log("GAMEFLOW() Initiated")
    prepGameBoard();
    createDeck();
    shuffleCards();
    firstHand();
    dealerCard();
    initPlayerCards();
}

function initGameBoard () {
    // if (initialGame) {
    // //disable all buttons except for wager and leave (player can only start game by placing wager first)
    hitButton.disabled = true
    stayButton.disabled = true
    dealButton.disabled = true
    leaveButton.diabled = false

    // conditional logic to set the state of the wager buttons
    wagerPlaced = false
    bet20Button.disabled = false
    bet50Button.disabled = false
    bet100Button.disabled = false
    
    //reset the dealer and player variables
    deck = []
    playerTotal = 0
    dealerTotal = 0
    wagerAmt = 0
    wagerTotal = 0

    betAmount.textContent = "000"

    return
}

function prepGameBoard () {
    if (initialGame) {
        // message.innerText = "Dealer: Enter your wager to play..."
    } else {
        console.log("*********** SUBSEQUENT ROUND *************")
        //remove player cards images from the previous round
        let removePlayerCards = playerCardsDiv.getElementsByTagName("img")
        while (removePlayerCards.length > 0) {
            playerCardsDiv.removeChild(removePlayerCards[0])
        }
        //remove dealer cards images from previous round (keep the hidden card)
        let removeDealerCards = dealerCardsDiv.getElementsByTagName("img")
        //-->source stackoverflow
        for (let i = removeDealerCards.length - 1; i >= 0; i--) {
            if (removeDealerCards[i].id !== "hidden") {
                removeDealerCards[i].parentNode.removeChild(removeDealerCards[i]);
            }
        }

        if (accountBalance <= 20){
            message.innerText = "Dealer: You do not have enough money to play another round..."
            leaveGame()
        } else {
            message.innerText = "Dealer: Place your bet to play..."
            hiddenCardFlag. src = "./imgs/cards/BACK.png" //reset the hidden card image
            //***TEST*** 
            hitButton.disabled = true
            stayButton.disabled = true
            dealButton.disabled = true
            //***TEST***
        }
    }

    //disable all buttons except for wager and leave (player can only start game by placing wager first)
    dealButton.disabled = true
    leaveButton.disabled = false

    // conditional logic to set the state of the wager buttons based on player funds available
    if (wagerPlaced = false) {
        message.innerText = "Dealer: Place your bet to play..."
        dealButton.disabled = true
        hitButton.disabled = true
        stayButton.disabled = true
    }

    if (accountBalance >= 100) {
        totBal.style.color = "black"
        bet20Button.disabled = false
        bet50Button.disabled = false
        bet100Button.disabled = false
    } else if (accountBalance < 50) {
        totBal.style.color = "red"
        bet20Button.disabled = false
        bet50Button.diabled = true
        bet100Button.diabled = true
    } else {
        totBal.style.color = "red"
        bet20Button.disabled = false
        bet50Button.diabled = false
        bet100Button.diabled = true
    }
    //reset the dealer and player variables
    deck = []
    playerTotal = 0
    dealerTotal = 0
    wagerAmt = 0
    wagerTotal = 0
    dealerSum.innerText = ""
    playerSum.innerText = ""
    betAmount.textContent = "000"
    betAmount.style.textShadow = "none"
    hitMe = true
 
    return
}
// This function will create the deck by using nested for loops to create the card value and suit (to be associated with the corresponding .png)  NOTE:  ForEach can be used here - icebox
function createDeck () {
    //hiddenCardFlag.style.visibility = 'visable' //unhide the hidden card
    document.getElementById("hidden").style.visibility = "visable"

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
// This function randomly shuffles the cards from the createDeck function using the Fisher-Yates shuffle method.
function shuffleCards() {
    for (let i = 0; i < deck.length; i++) { //iterate through the 52 cards (deck.length)
        let c = Math.floor(Math.random() * deck.length) //randomly index the card from the deck created
        let temp = deck[i] //temporarily store the shuffled card
            deck[i] = deck[c] //swapsthe card at index i with the card at index c to shuffle the deck.
            deck[c] = temp
    }
}

function firstHand() {
    hiddenCard = deck.pop() //grab the last card from the deck and assign it to the dealer hidden card
    dealerTotal += getCardValue(hiddenCard); //call getCardValue with the hidden card value
    dealerAces += aceCheck(hiddenCard); //check to see if the dealer has an ace as their hidden card

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
    if (dealerTotal <= 18) {
        let cardImage = document.createElement("img") // create a new image tag for the  <div id = "dealer-cards"> assign to cardImage variable
        let card = deck.pop() //grab the last card in the randomized deck
        cardImage.src = "./imgs/cards/" + card + ".png" // create link to the card visual
        dealerTotal += getCardValue(card); //add the total of the hidden card and the card selected
        dealerAces += aceCheck(card); //check if a card is an Ace
        document.getElementById("dealer-cards").append(cardImage)
    }

    return dealerTotal
}
// This funciton is used to populate the intial 2 cards for the ployer deck
function initPlayerCards () {
    for (let i = 0; i < 2; i++) { //populate the screen with 2 cards using the for loop 
        let cardImage = document.createElement("img") // create a new image tag for the  <div id = "player-cards"> assign to cardImage variable
        let card = deck.shift() //grab the first card in the randomized deck
        cardImage.src = "./imgs/cards/" + card + ".png" // create link to the card visual
        playerTotal += getCardValue(card); //add the total of the card and the card selected
        playerAces += aceCheck(card); //check if the card is an Ace, if so add it to the ace count
        document.getElementById("player-cards").append(cardImage) //target the player-cards ID and append the card image for the associated card
    }
}

function hit () {
    if (hitMe) {
        // if (playerTotal <= 21) {
        let cardImage = document.createElement("img") // create a new image tag for the  <div id = "player-cards"> assign to cardImage variable
        let card = deck.shift() //grab the first card in the randomized deck
        cardImage.src = "./imgs/cards/" + card + ".png" 
        playerTotal += getCardValue(card);
        console.log("hit() invoke aceCheck() playerAces = " + playerAces + "card = " + card)
        playerAces += aceCheck(card); //check if the card is an Ace, if so add it to the ace count
        document.getElementById("player-cards").append(cardImage) 

        if (playerTotal < 21) {
            hitMe = true //needs to be evaluated
            hitButton.disabled = false
            return
        }
        if (playerTotal === 21) {
            hitMe = false
            hitButton.disabled = true 
            determineWinner();
            return 
        }
        if (playerAceMath(playerTotal, playerAces) > 21) { //check player sum and ace count to see if they can reduce the aces from 11 to 1 to get under 21
             if (playerTotal > 21) {
                 hitMe = false
                 hitButton.disabled = true 
                 determineWinner();
                 return
            } else {
                 hitMe = true
                 hitButton.disabled = false
            }
        }
        // } //*****TEST */
        return
    }
}

function stay() {
    //disable the hit and stay buttons
    hitButton.disabled = true
    document.getElementById("stay").disabled = true
    //reveal hidden dealer card
    document.getElementById("hidden").src = "./imgs/cards/" + hiddenCard + ".png"
    //ICEBOX:  set timer to insert sythetic pause before dealer takes next action
    while (dealerTotal <= 18) {
        dealerCard();
    }
   
    determineWinner(); 
}

function deal() {
    // show a fresh screen
    
    document.getElementById("table-screen").style.display = "block"
    document.getElementById("player-screen").style.display = "block"

    message.innerText = "Dealer:  Would you like to Hit or Stay..."

    // set button states
    bet20Button.disabled = true
    bet50Button.disabled = true
    bet100Button.disabled = true

    hitButton.disabled = false
    dealButton.disabled = true
    stayButton.disabled = false
    leaveButton.disabled = true

    // Set initialGame tag to false (not the first game) if or execute the main game flow if this is a subsequent deal
    if (initialGame) {
        initialGame = false
    } else {
        gameFlow ()

    }

    return
}
// This function is invoked when a user clicks the leave button.  It will disable all the buttons, thereby leaving the user with no option but to either refresh the page or navigate to another website
function leaveGame() {
    message.innerText = "Dealer:  Thanks for playing, come back soon!"
    leftGame = true
   
    bet20Button.disabled = true
    bet50Button.disabled = true
    bet100Button.disabled = true

    hitButton.disabled = true
    dealButton.disabled = false
    stayButton.disabled = true
    leaveButton.disabled = true
}

// This function calculates who (player or dealer) has the winning hand or if there is a tie game.  It also updates the players account balance accordingly
function determineWinner() {
    // Tie game
    if (dealerTotal == playerTotal) {
        message.innerText = "Dealer: It's a tie... Click Deal to play again."
        accountBalance += wagerTotal
    }

    // Winning hand.  player has 21, dealer does not have 21
    if (playerTotal == 21 && dealerTotal !== 21) {
        message.innerText = "Dealer: You got Blackjack! You win! Click Deal to play again."
        accountBalance += (wagerTotal * 3)
    }

    // Winning hand.  dealer over 21, player under or equal 21
    if (dealerTotal > 21 && playerTotal <= 21) {
        message.innerText = "Dealer: You win! Click Deal to play again."
        accountBalance += (wagerTotal * 3)
    }
     // Winning hand.  player has more than dealer but no one has 21 or over
     if (playerTotal < 21 && dealerTotal < 21) {
        if (playerTotal > dealerTotal) {
            message.innerText = "Dealer: You win! Click Deal to play again."
            accountBalance += (wagerTotal * 3)
        }
    }

    // Losing hand.  player over 21 (regardless of what the dealer has)
    if (playerTotal > 21) {
        message.innerText = "Dealer: You lose... Click Deal to play again."
    }
    
    // Losing hand.  dealer has 21 and player does not have 21
    if (dealerTotal == 21 && playerTotal !==21 ) {
        message.innerText = "Dealer:  You lose... Click Deal to play again."
    }
    // Losing hand.  dealer has larger hand (but not 21)
    if (dealerTotal < 21) {
        if (playerTotal < dealerTotal) {
            message .innerText= "Dealer: You lose... Click Deal to play again."
        }
    }

    // set button states
    dealButton.disabled = false
    leaveButton.disabled = false
    bet100Button.disabled = true
    bet20Button.diabled = true
    bet50Button.disabled = true

    //display end of hand totals
    totBal.innerText = accountBalance
    if (accountBalance >= 100) {
        totBal.style.color = "black"
    } else {
        totBal.style.color ="red"
    }
    dealerSum.innerText = dealerTotal
    playerSum.innerText = playerTotal

    return
}
// This function will determine if the hand (player) is over 21 and has an ace in their hand. If they do, then the ace will be converted from 11 to 1
function playerAceMath(playerTotal, playerAces) {
    console.log("playerTotal = " + playerTotal + "  Player Ace Count: " + playerAces)
    while (playerTotal > 21 && playerAces > 0) {
        playerTotal -= 10 // subtract the player total by 10
        playerAces -= 1  // remove the ace
    }
    console.log("Aces Math completed. Player total = " + playerTotal)
    return playerTotal
}

// This function will determine if the hand (dealer) is over 21 and has an ace in their hand. If they do, then the ace will be converted from 11 to 1
function dealerAceMath(dealerTotal, dealerAces) {
    console.log("dealerTotal = " + dealerTotal + "  Dlr Ace Count: " + dealerAces)
    while (dealerTotal > 21 && dealerAces > 0) {
        dealerTotal -= 10 // subtract the player total by 10
        dealerAces -= 1  // remove the ace
    }
    return dealerTotal
}

function placeBet(wagerAmt) {
    //check to see if the wager amount is higher than the account balance
    if (wagerAmt > accountBalance) {
        wagerPlaced = false
        message.innerText = "Dealer: You do not have enough money in your account for that bet.."
        //depending on the account balance dont allow player to click a higher wager buttons
        if (accountBalance < 20) {
            bet20Button.disabled = true
            bet50Button.disabled = true
            bet100Button.disabled = true
        } else if (accountBalance < 50) {
            bet50Button.disabled = true
            bet100Button.disabled = true 
        }   else if (accountBalance < 100) {
                bet100Button.disabled = true
        }
    } else {  
        wagerPlaced = true
        wagerAmount = wagerAmt;
        hitButton.disabled = false
        stayButton.disabled = false
        //decrease the account balance
        accountBalance -= wagerAmount;
        //visually set the account balance to red if the player has under 50 left in their account
        if (accountBalance <= 50) {
            totBal.style.fontWeight = "bold"
            totBal.style.color = "red"
        } else {
            totBal.style.fontWeight = "normal"
            totBal.style.color = "black"
        }
        //increase the wager total
        wagerTotal += wagerAmount
        //update the UI to show the new balance
        totBal.innerText = accountBalance

        //enable deal button
        dealButton.disabled = false
        
        //update the UI to show the new wager total
        //document.getElementById('wager-total').textContent = wagerTotal;
        betAmount.textContent = wagerTotal;
        betAmount.style.textShadow = "1px 1px 3px #FFD700, 1px 1px 1px #0000ff";
      }
}
