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
let hitdealer = true
let leftGame = false
// if a player or dealer has an ace it could be evaluated as either a 1 or a 10 depending on the hand
let playerAces = 0
let dealerAces = 0
// Working storage to track the value of the dealers hidden card
let hiddenCard
let deck

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

// ----- Event Listeners ----- //

// "Hit button"
hitButton.addEventListener("click", hit)
//document.getElementById("hit").addEventListener("click", hit)

// "Stay button"
stayButton.addEventListener("click", stay)
// document.getElementById("stay").addEventListener("click", stay)

// "Deal button"
dealButton.addEventListener("click", deal)
// document.getElementById("deal").addEventListener("click", deal)

// "Leave button"
leaveButton.addEventListener("click", leaveGame)
//document.getElementById("leave-game").addEventListener("click", leaveGame)

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

//hiddenCardFlag.style.visibility = 'hidden'

// init
gameFlow()

function gameFlow() {
    console.log("initializing game")
    cleanBoard();
    console.log("Cleaned the board")
    //placeBet();
    createDeck();
    console.log("Deck created")
    shuffleCards();
    console.log("Cards shuffled")
    firstHand();
    console.log("First Hand Delt")
    console.log("Hidden Card = " + hiddenCard)
    console.log("Hidden Card Total = " + dealerTotal)
    dealerCard();
    console.log("Dealer Initial Hand dealt")
    initPlayerCards();
    console.log("Player Initial hand dealt")
    console.log("Player Total = " + playerTotal)

}

function cleanBoard () {
    // hide the dealer cards
    dealerCardsDiv.style.display = "none"
    // hide the player cards
    playerCardsDiv .style.display = "none"
    // clear the message panel
    message.innerText = ""
    // pause game wait for user to place their wager
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
    //console.log(temp)
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
    console.log("Dealer takes a card")
    if (dealerTotal <= 18) {
        let cardImage = document.createElement("img") // create a new image tag for the  <div id = "dealer-cards"> assign to cardImage variable
        let card = deck.pop() //grab the last card in the randomized deck
        cardImage.src = "./imgs/cards/" + card + ".png" // create link to the card visual
        dealerTotal += getCardValue(card); //add the total of the hidden card and the card selected
        dealerAces += aceCheck(card); //check if the card is an Ace
        document.getElementById("dealer-cards").append(cardImage)
         console.log("Dealer Hits. New total = " + dealerTotal)
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
        playerAces += aceCheck(card); //check if the card is an Ace
        document.getElementById("player-cards").append(cardImage) //target the player-cards ID and append the card image for the associated card
    }
}

function hit () {
    console.log("Clicked Hit Button.  hitMe value: " + hitMe)
    if (hitMe) {
        let cardImage = document.createElement("img") // create a new image tag for the  <div id = "player-cards"> assign to cardImage variable
        let card = deck.shift() //grab the first card in the randomized deck
        cardImage.src = "./imgs/cards/" + card + ".png" 
        playerTotal += getCardValue(card);
        playerAces += aceCheck(card); //check if the card is an Ace
        document.getElementById("player-cards").append(cardImage) 
        console.log("New total after hit: " + playerTotal)
        if (playerTotal < 21) {
            hitMe = true //needs to be evaluated to see if ace can be changed to 1
            document.getElementById("hit").disabled = false
            //console.log("Under 21: hit button active")
            return
        }
        if (playerTotal === 21) {
            console.log("hit me: player = 21, calling determineWinner()")
            hitMe = false
            document.getElementById("hit").disabled = true  //turn off hit me button
            //message = "Dealer: You have 21..."
            determineWinner();
            return 
        }
        if (playerAceMath(playerTotal, playerAces) > 21) { //check player sum and ace count to see if they can reduce the aces from 11 to 1 to get under 21
             if (playerTotal > 21) {
                 hitMe = false
                 document.getElementById("hit").disabled = true 
                 console.log("hit. player over 21 calliing determineWinner()")
                 determineWinner();
                 return
            } else {
                 hitMe = true
                document.getElementById("hit").disabled = false
            }
        }
        return
    }
}

function stay() {
    console.log("Clicked Stay Button")
    //disable the hit and stay buttons
    document.getElementById("hit").disabled = true
    document.getElementById("stay").disabled = true
    //reveal hidden dealer card
    document.getElementById("hidden").src = "./imgs/cards/" + hiddenCard + ".png"
    //set timer to insert sythetic pause before dealer takes next action
    while (dealerTotal <= 18) {
        dealerCard();
    }
    console.log("Finished dealer hit logic.  total = " + dealerTotal)
    determineWinner(); 
}

function deal() {
    console.log("Clicked Deal Button")
    if (leftGame)  { //player left game but hit deal button

    } else {
        // reset the board
        // wager
        // 

    }
    //     bet20Button.disabled = false
    //     bet50Button.disabled = false
    //     bet100Button.disabled = true

    // hitButton.disabled = true
    // dealButton.disabled = false
    // stayButton.disabled = true
    // leaveButton.disabled = true

    // call gameflow() to start new round
    // deactivate deal button untl end of game
    
}

function leaveGame() {
    console.log("Clicked Leave Button")
    message.innerText = "Dealer:  Thanks for playing, come back soon!"
    leftGame = true
   
    bet20Button.disabled = true
    bet50Button.disabled = true
    bet100Button.disabled = true

    hitButton.disabled = true
    dealButton.disabled = false
    stayButton.disabled = true
    leaveButton.disabled = true
    //disable the buttons

}

function acctBalance() {
    //determine if balance is being reduced via wager
    //determine if balance is being incremented due to win
    //determine if balance is restored due to tie
}

function messageSystem() {
    //display appropriate message in the message-display to player

}

function determineWinner() {
    console.log("Determining Winner...")
    // tie game
    if (dealerTotal == playerTotal) {
        message.innerText = "Dealer:  It's a tie..."
        console.log("msg: Tie Game. dealer= " + dealerTotal + " player= " + playerTotal)
    }

    // winning hand.  player has 21, dealer does not have 21
    if (playerTotal == 21 && dealerTotal !== 21) {
        message.innerText = "Dealer:  You got Blackjack!  You win!"
        console.log("Player Black Jack! " + playerTotal + " dlr: " + dealerTotal)
    }

    // winning hand.  dealer over 21, player under or equal 21
    if (dealerTotal > 21 && playerTotal <= 21) {
        message.innerText = "Dealer:  You win!"
        console.log("Dealer Bust, you win.  dealer = " + dealerTotal + " player = " + playerTotal)
    }
     // winning hand.  player has more than dealer but no one has 21 or over
     if (playerTotal < 21 && dealerTotal < 21) {
        if (playerTotal > dealerTotal) {
            message.innerText = "Dealer:  You win!"
            console.log("Your hand beat the dlr.  dealer = " + dealerTotal + " player = " + playerTotal)
        }
    }

    // losing hand.  player over 21 (regardless of what the dealer has)
    if (playerTotal > 21) {
        message.innerText = "Dealer:  You lose..."
        console.log("msg: You bust, you lose " + playerTotal)
    }
    
    // losing hand.  dealer has 21 and player does not have 21
    if (dealerTotal == 21 && playerTotal !==21 ) {
        message.innerText = "Dealer:  You lose..."
        console.log("msg: lose dlr 21, plr not 21. dlr = " + dealerTotal + " player= " + playerTotal)
    }
    // losing hand.  dealer has larger hand (but not 21)
    if (dealerTotal < 21) {
        if (playerTotal < dealerTotal) {
            message .innerText= "Dealer: You lose..."
            console.log("Dealer wins with bigger hand.  Dlr = " + dealerTotal + " plyr = " + playerTotal)
        }
    }
    return
}

// This function will determine if the hand (player) is over 21 and has an ace in their hand. If they do, then the ace will be converted from 11 to 1
function playerAceMath(playerTotal, playerAces) {
    //console.log("playerTotal = " + playerTotal + "  Player Ace Count: " + playerAces)
    while (playerTotal > 21 && playerAces > 0) {
        playerTotal -= 10 // subtract the player total by 10
        playerAces -= 1  // remove the ace
    }
    console.log("Aces. New Player total = " + playerTotal)
    return playerTotal
}

// This function will determine if the hand (dealer) is over 21 and has an ace in their hand. If they do, then the ace will be converted from 11 to 1
function dealerAceMath(dealerTotal, dealerAces) {
    while (dealerTotal > 21 && dealerAces > 0) {
        dealerTotal -= 10 // subtract the player total by 10
        dealerAces -= 1  // remove the ace
    }
    //console.log("Dealer Ace Math.  New Dealer total = " + dealerTotal)
    return dealerTotal
}

function placeBet(wagerAmt) {
    console.log("wager")
    //check to see if the wager amount is higher than the account balance
    if (wagerAmt > accountBalance) {
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
        wagerAmount = wagerAmt;
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
        
        //update the UI to show the new wager total
        document.getElementById('wager-total').textContent = wagerTotal;
        console.log(`Bet placed: $${wagerAmount}`);
        console.log(`New bank account balance: $${accountBalance}`);
        console.log("Total Wagered:" + wagerTotal)
      }
}
