# Blackjack

The goal of Blackjack is to beat the dealer by having the higher total hand without going over 21.  Face-Cards (King, Queen, and  Jacks) are worth 10 points, Aces are worth either 11 or 1 (depending on the total value of your hand - if you have over 21 and an ace the ace will be reduced to 1), and all non-face cards are worth their corresponding value.  This game uses one, 52 card deck.

There is also a wager system in in place which allows you to place a bet by selecting bets and multiples of $20, $50, or $100 up to the total amount in your account (you start with $500 in your account).

The payout for a winning hand is 3 times your wager (if you bet $50, you will win $150)

# Screenshots
 - Landing Page
 ![](./imgs/screenshots/BlackJack%20Initial%20Screen.png)

 - Winning!
 ![](./imgs/screenshots/BlackJack_Win.png)

 - Not Winning :-/
 ![](./imgs/screenshots/BlackJack_Lose.png)

 - A Tie...
 ![](./imgs/screenshots/BlackJack_Tie.png)

# Technologies
    * Javascript
    * HTML
    * CSS

# Game Play

    * Upon launching you will be presented with the Blackjack table overlay, which consists of the main table (empty) and a user panel.
    * To begin a round, first enter your wager by selecting one or several of the $20, $50, or $100 chips located in the interactive user panel located in the bottom of the screen.  Note, you cannot wager more than you have in your account.
    * Next, click on the "Deal" button to receive your cards, and to view the dealers "hidden" card and their revealed card.
    * Depending on your hand select either "Hit" to add another card to your hand, or "Stay" to end your turn and let the dealer take their turn.
    * After receiving/viewing the results you can chose to either play again by clicking "Deal" or leave the game by clicking the "Leave" button.
    * Chose to play again by clicking the Deal button, receiving your cards and then entering your wager.
    * You can play until your bank account is fully depleted, you have less than $20 (the minimum ante to play) or by clicking the Leave button.

# Future Enhancements

    * Timer delay for dealer hits
    * CSS visuals to make the UI look more authentic
    * Messaging system updates
    * Responsive 
    * Don't show cards immediately on subsequent deals


    - Launch game:
        [PlayMe](https://sjdiggs.github.io/Blackjack-21-game/)
    
    - github repo:
        https://github.com/SJDiggs/Blackjack-21-game
