
let nums = ['img/one.png','img/two.png','img/three.png','img/four.jpg','img/five.png'];
let gamesPlayed = 0
let wins = 0
let losses = 0

// handles the user placing a bet
document.getElementById('enter').onclick = function placeBet (){
  let moneyBet = parseInt(document.getElementById('money').value)
  console.log(moneyBet)
  document.getElementById('bet').innerHTML = moneyBet;
  if(moneyBet === 0){
    alert('Place a bet')
  } else{
  }
}

let guess = null; // start the guess at null, it will get set to something when they click on an image
// if user clicks the number 1 that will register as their guess
document.getElementById('uno').onclick = function userGuess (){
 guess = document.getElementById('uno').getAttribute('src');
  document.getElementById('numberChosen').innerHTML = "You Chose number 1 now spin and try to stop it on 1 to win your prize!"
}
document.getElementById('dos').onclick = function userGuess (){
 guess = document.getElementById('dos').getAttribute('src');
 document.getElementById('numberChosen').innerHTML = "You Chose number 2 now spin and try to stop it on 12 to win your prize!"
}
document.getElementById('tres').onclick = function userGuess (){
 guess = document.getElementById('tres').getAttribute('src');
 document.getElementById('numberChosen').innerHTML = "You Chose number 3 now spin and try to stop it on 3 to win your prize!"
}
document.getElementById('cuatro').onclick = function userGuess (){
 guess = document.getElementById('cuatro').getAttribute('src');
 document.getElementById('numberChosen').innerHTML = "You Chose number 4 now spin and try to stop it on 4 to win your prize!"
}
document.getElementById('cinco').onclick = function userGuess (){
 guess = document.getElementById('cinco').getAttribute('src');
 document.getElementById('numberChosen').innerHTML = "You Chose number 5 now spin and try to stop it on 5 to win your prize!"
}
document.getElementById('seis').onclick = function userGuess (){
 guess = document.getElementById('seis').getAttribute('src');
 document.getElementById('numberChosen').innerHTML = "You Chose number 6 now spin and try to stop it on 6 to win your prize!"
}


function spin (){
  let randomImage1 = nums[Math.floor(Math.random() * nums.length)];
  // multiplies nums which is the images by math.random so it generates a random image
  document.getElementById('numimg').setAttribute('src',randomImage1);
  // setting the image that is being displayed in the #numimg to randomimage1
  // which is being set randomly

}


function beginRotation1(){
  intervalOne = setInterval(spin,900);
  // sets the interval for how fast each spin image is going to iterate
}

document.getElementById('start').onclick = function rotation (){
  // when the button that has an element of start is click run begin rotation1
  beginRotation1()
}

function endRotation(){
  intervalTwo = clearInterval(intervalOne);
  // clears the interval that we set so the image stops
}

document.getElementById('stop').addEventListener('click',function (){
  endRotation()
  // runs the function end rotation when the button with the stop
  // element is clicked
  let roulette = document.getElementById('numimg').getAttribute('src');
  console.log(roulette)
  gamesPlayed++
  // everytime the stop button is clicked a game has finished so we add to the games played counter
  document.getElementById('gamesPlayed').innerHTML = gamesPlayed

  document.getElementById('bet').innerHTML = "0"

  winningCondition()
})

function winningCondition(){
  let roulette = document.getElementById('numimg').getAttribute('src');
  let moneyBet = parseInt(document.getElementById('money').value)
  // if the image src that you stopped on matches the img src that you initially chose then you win
  if (roulette === guess){
    displayCompleteMessage("You won");
    document.getElementById('winnings').innerHTML = moneyBet*2
    fetch('casino', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'result': true,
        'wins': wins
      })
    })
    // everytime you win it gets added to the counter
    wins++
    document.getElementById('wins').innerHTML = wins
    //
  } else {
    displayCompleteMessage("You lost");
    fetch('casino', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'result': false,
        'losses': losses
      })
    })
    losses++
    document.getElementById('losses').innerHTML = losses
  }
}

function displayCompleteMessage(msg){
  document.getElementsByClassName('result')[0].innerHTML = msg ;
}
