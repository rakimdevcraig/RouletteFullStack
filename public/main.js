
let nums = ['img/one.png','img/two.png','img/three.png','img/four.jpg','img/five.png'];
// get the numbers to spin
let src = document.getElementById('uno').src
let email = document.getElementById('userEmail').innerHTML

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

// need to tie all of the click event to function or variable not sure
// if user chooses number 1 as the image that will be stopped on
document.getElementById('uno').onclick = function userGuess (){
  let guess1 = document.getElementById('uno').getAttribute('src');
  console.log(guess1)
}

document.getElementById('dos').onclick = function userGuess (){
  let guess2 = document.getElementById('dos').getAttribute('src');
  console.log(guess2)
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

document.getElementById('stop').onclick = function (){
  endRotation()
  let roulette = document.getElementById('numimg').getAttribute('src');
  console.log(roulette)
  // runs the function end rotation when the button with the stop
  // element is clicked
  document.getElementById('bet').innerHTML = "0"
  winningCondition()
}

function winningCondition(){
  let roulette = document.getElementById('numimg').getAttribute('src');
  let guess1 = document.getElementById('uno').getAttribute('src');
  let guess2 = document.getElementById('dos').getAttribute('src');
  let guess3 = document.getElementById('tres').getAttribute('src');
  let guess4 = document.getElementById('cuatro').getAttribute('src');
  let guess5 = document.getElementById('cinco').getAttribute('src');
  let moneyBet = parseInt(document.getElementById('money').value)

  // let guess =
  if (roulette === guess1){
    displayCompleteMessage("You won");
    document.getElementById('winnings').innerHTML = moneyBet*2
    fetch('/wins', {
      // where i'm going in the server for this put
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      })
    })
    // } else if (roulette === guess2){
    //   console.log("you've won")
    // this is what i tried but it makes it so that if i end on 1 or 2 then i win even if i pick 1 as the first image
  } else {
    displayCompleteMessage("You lost");
    document.getElementById('winnings').innerHTML = "0"
  }
}
// test

function winningCondition2(){
  let roulette = document.getElementById('numimg').getAttribute('src');
  let guess2 = document.getElementById('dos').getAttribute('src');
if (roulette === guess2){
  displayCompleteMessage("You won");
  document.getElementById('winnings').innerHTML = moneyBet*2
} else {
  displayCompleteMessage("You lost");
  document.getElementById('winnings').innerHTML = "0"
}

}
// test

function displayCompleteMessage(msg){
  document.getElementsByClassName('result')[0].innerHTML = msg ;
}
