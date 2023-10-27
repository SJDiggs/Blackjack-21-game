This file will be used for notation and planning the games user, business and techincal requirements and approach

Genneral rules:
- Turn based logic --> player response, dealer response
- Player will win $50 if they win the round
- Player must click "Stay" to end their turn

(Player)
    (Ante Amount)
        - The player must enter a bet (ante) of either $20 $50 or $100 to play the game by selecting the corresponding button.
        - The player can bet up to their maximum account balance
        - An error message ("Dealer: Thats more than you have!  Place a lower bet, or click Deal") will appear in the message center if the player presses an amount button which either when accumulated or is naturally greater than their bank account.  

    (Inital Dealing of the Players Hand)
        - The player will click the deal button to initiate the dealing of their hand
        - The player will be presented with 2 random cards faced up, side by side in a row (card1 on left, card2 on right)
        - At the sametime the Dealer Hand will show with one card facing up and one card facing down at the top of the screen
        - A message ("Dealer: Your turn...") will appear in the message center

    (Hitting)
        - Only allowed if the players cards do not equal 21 
        - Player will press the 'Hit Me' button and another faced-up card will appear to the immediate left of left most player card.
        - There will be a maximum of 4 'Hit Me's, allowed. ***TDS: Need to calculate for all aces (1 + 1 + 1 + 1)

    (Staying)
        - Player can press "Stay" button to receive no additional cards for the remainder of the round (game)
        - Turn goes back to computer


    (Account Balance)
        - Player will start with a $100 balance in their account
        - Balance Decreases:  The amount the player Antes will be deducted from the balance (ex: player before balance = $100, player Ante = $50, current balance = $50)
        - Balance Increases:  This will only happen if the player wins the round... Balance = current balance + ante amount + $50

    (Leaving the game)
        - Player can click "Leave" button on their turn, this will end the game
        - Player automatically leaves the game if the account balance = 0
        - A message will appear "Dealer: Thanks for player, see you soon!"



(note ace rule - need to calculate the value of the cards to determine if the ace is worth 1 or 10 (if ace-card + non-ace-card(s) > 21 then ace-card = 1))
