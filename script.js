//add Bee movie, Shrek Script,
var text = {
  0: "A simple test",
  1: "I scream, you scream, we all scream for ice cream",
  2: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little.",
  3: "Once upon a time there was a lovely princess. But she had an enchantment upon her of a fearful sort which could only be broken by love's first kiss. She was locked away in a castle guarded by a terrible fire-breathing dragon. Many brave knights had attempted to free her from this dreadful prison, but non prevailed. She waited in the dragon's keep in the highest room of the tallest tower for her true love and true love's first kiss. (laughs) Like that's ever gonna happen. What a load of - (toilet flush)",
}
var testErors = {
  0: -1,
  1: -1,
  2: -1,
  3: -1,
}
var top3 = {
  0: "",
  1: "",
  2: "",
}
var testScores = {};

let textlength = Object.keys(text).length;
var testWrapper = document.querySelector(".test-wrapper");
var testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p");
var resetButton = document.querySelector("#reset");
var theTimer = document.querySelector(".timer");
var nextTest = document.querySelector("#next");
var scoreboard = document.querySelectorAll(".toggle");
var progressBar = document.querySelector("#progress");
var wpmHTML = document.querySelector("#wpm");
var errorHTML = document.querySelector("#error");
var start; 
var errors = 0;
var stopSetInterval;
var WPMInterval;
var index = 0;
var scoreIndex = 0;
var currentIndex = 0;
var wentBack = false;

var clearedByFinish = false;
(function() {
  originText.innerHTML = text[index];
}())


// Run a standard minute/second/hundredths timer:
// Add leading zero to numbers 9 or below (purely for aesthetics):
function timer() 
{ 
  var now = new Date().getTime(); 
  var t = now - start.getTime();
  //a lot of math, but it's just unit conversion. This site helped https://www.developerdrive.com/build-countdown-timer-pure-javascript/#:~:text=How%20to%20Build%20a%20Countdown%20Timer%20in%20Pure,the%20countdown%20timer%20any%20way%20you%20want.%20 using date.getTime() we have time in milliseconds. Then t % (unit) is the number of units in the time for example 0 seconds and 1 minute have the same number of seconds (0) so 0 % 60  === 60 % 60. t / unit returns how many units are in t. 100 seconds/ 1 minute would return number of minutes in 100 seconds Using floor, we extract the whole number of unit in T. Putting it together, take number units in time, then extract the number of the next unit. of course we need to convert things to milliseconds. So to get mins, find the number of hours and divide by minutes to get the number of minutes
  var mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  // To get seconds, find the number of minutes and divide by seconds to get the number of seconds
  var secs = Math.floor((t % (1000 * 60)) / 1000);
  // due to that I could find the hundreths get the number of milliseconds in seconds and divide by 10 to get the centiseconds(hundreths)
  var hundreths =  Math.floor((t % 1000)/10);
  theTimer.innerHTML = ("0"+mins).slice("-2")+":"+("0"+secs).slice("-2")+":"+("0"+hundreths).slice("-2")
}
function Timer(event)
{
  if(event.inputType == "insertText") 
  {
    start = new Date();
    stopSetInterval = setInterval(timer,10);
    testArea.removeEventListener("input",Timer);
  }
  
}
function WPM(event)
{
  if(event.inputType == "insertText"){
    WPMInterval = setInterval(wpm, 1010);
    testArea.removeEventListener("input", WPM);
  }
}
// for now disregard errors
function wpm()
{    
    let time = theTimer.innerHTML.split(":");
    let total_seconds = parseInt(time[0] * 60, 10) + parseInt(time[1], 10) + parseFloat(time[2] / 100);
    // one way to calculate WPM
    let wpm = Math.floor(testArea.value.length / 5 / (total_seconds / 60));
    wpmHTML.innerHTML ="WPM: " + wpm + " (words per min)";
  
}
// Match the text entered with the provided text on the page:
function textCheck(event){  
  if(event.inputType == "insertText" || event.inputType == "deleteContentBackward")
  { 
      let currentUserText = testArea.value;
      let currentTest = text[index];
      let userLength = currentUserText.length;
      let textLength = currentTest.length;
      let percentage = userLength/textLength;
      progressBar.value = (percentage > 1) ? 1 : percentage;
    // not done  
    if(currentTest !== currentUserText)
        {
          
           // check this keys
           if (event.inputType == "insertText")
             {
               // check the currentIndex to see if it is correct
               let currentLetterCorrect = currentTest[currentIndex] !== currentUserText[currentIndex];
               errors = currentLetterCorrect ? errors + 1 : errors;
               errorHTML.innerHTML = "Errors: " + errors;
               testWrapper.style.borderColor = currentLetterCorrect ? "red" : "green"; 
               currentIndex++;
               
             }
            // going back to fix a mistake
          else if (event.inputType == "deleteContentBackward")
            {
              currentIndex--;
              //wentBack = true;
            }
         
         }
      else
        {
          //the user is done and so do clean up
          currentIndex = 0;
          clearInterval(WPMInterval);
          clearInterval(stopSetInterval);
          storeTime(theTimer.innerHTML);
          updateScores();
          errorHTML.innerHTML = (errors == 0) ? "Nice job. No errors!!!!" : "Errors: " + errors;
          errorHTML.style.color = (errors==0) ? "green" : "red"; 
          testWrapper.style.borderColor = "blue";
          testArea.disabled="disabled";
          testArea.addEventListener("input",Timer);
          testArea.addEventListener("input", WPM);
          clearedByFinish = true;
          nextTest.style.display = "inherit";
        }
    }
  if(event.inputType == "insertFromPaste")
    {
      testArea.value = "";
      alert("NO!!!!!!!");
    }
}

function updateScores()
{
  document.querySelector("#scores").style.display = "inherit";
  if (top3[1] == "")
    {
      
      scoreboard[0].style.display = "inherit";    
      scoreboard[0].innerHTML = '<td>1st</td><td>'+top3[0]+'</td>';
      
    }
  else if (top3[2] == "")
    {
      scoreboard[0].style.display = "inherit"; 
      scoreboard[1].style.display = "inherit";    
      scoreboard[1].innerHTML = '<td>2nd</td><td>'+top3[1]+'</td>';
      scoreboard[0].innerHTML = '<td>1st</td><td>'+top3[0]+'</td>';
      
    }
  else {
      scoreboard[0].style.display = "inherit"; 
      scoreboard[1].style.display = "inherit"; 
      scoreboard[2].style.display = "inherit";
      scoreboard[2].innerHTML = '<td>3rd</td><td>'+top3[2]+'</td>';
      scoreboard[1].innerHTML = '<td>2nd</td><td>'+top3[1]+'</td>';
      scoreboard[0].innerHTML = '<td>1st</td><td>'+top3[0]+'</td>';
    
  }
}
function storeTime(time)
// stores the time and also keeps the ranking correct, with top3[0] being the fastest time
// very spaghetti-like, but it gets the job done
{
  //no scores exists
  if (top3[0] == "")
    {
      top3[0] = time;
    }
  //1 exists
  else if (top3[1] == "")
    {
      if (fasterTime(top3[0],time))
        {
          top3[1] = top3[0];
          top3[0] = time;
        }
      else
        {
          top3[1] = time;
        }
    }
  //2 exist
  else if (top3[2] == "")
    {
      if(fasterTime(top3[0],time))
        {
          top3[2] = top3[1];
          top3[1] = top3[0];
          top3[0] = time;
        }
        else if (fasterTime(top3[1],time))
          {
            top3[2] = top3[1];
            top3[1] = time;
          }
        else {
          top3[2] = time;
        }
    }
  //all scores exist
  else {
    if(fasterTime(top3[0],time))
        {
          top3[2] = top3[1];
          top3[1] = top3[0];
          top3[0] = time;
        }
        else if (fasterTime(top3[1],time))
          {
            top3[2] = top3[1];
            top3[1] = time;
          }
        else if (fasterTime(top3[2],time)) 
        {
          top3[2] = time;
        }
  }
}
function fasterTime(storedTime, newTime){
  //way to compare two times of our timer
  let storedT = storedTime.split(":");
  let newT = newTime.split(":");
  return (parseInt(newT[0] * 60, 10) + parseInt(newT[1], 10) + parseFloat(newT[2] / 100)) < (parseInt(storedT[0] * 60, 10) + parseInt(storedT[1], 10) + parseFloat(storedT[2] / 100)) 

  
}
// Start the timer:
testArea.addEventListener("input",Timer);
testArea.addEventListener("input", WPM);
// Reset everything:
function reset(event){
  //console.log(event)
   // alert is chosen so the user has time to compose;
  alert("Resetting things");
  if(!clearedByFinish)
    {
      clearInterval(stopSetInterval);
      clearInterval(WPMInterval);
      testArea.addEventListener("input",Timer);
      testArea.addEventListener("input", WPM);
      clearedByFinish = false;
    }
 
  theTimer.innerHTML = "00:00:00";
  wpmHTML.innerHTML = "WPM: ";
  errorHTML.innerHTML = "Errors: ";
  errorHTML.style.color = "red";
  progressBar.value = 0;
  testArea.value = "";
  testWrapper.style.borderColor="grey";
  errors = 0;
  //originText.innerHTML = text[index++ % textlength];
  if(testArea.hasAttribute("disabled"))
    {
      testArea.removeAttribute("disabled");
    }
}
function newTest(event)
{
  
  if(!testScores[index])
  {
    document.querySelector("#scores").style.display = "none";
    testScores[index] = {};
    for (var key in top3)
      {
        testScores[index][key] = top3[key]; 
        top3[key] = "";
        scoreboard[key].style.display = "none"; 
      }
  }
  index = (index + 1) % textlength
  originText.innerHTML = text[index];
  if(testScores[index]) {
    for (var key in top3)
    {
      top3[key] = testScores[index][key];
      updateScores();
    }
  }
  reset();
}
// Event listeners for keyboard input and the reset button:
resetButton.addEventListener("click", reset);
testArea.addEventListener("input", textCheck);
nextTest.addEventListener("click", newTest);