//A completely unncessary script

//Big E's flow
var penguin = {
  0: "Yeah, It’s the Emperor y’all, uh Don’t start with me I’ll bring an end to all Uh, Uh-huh, Uh, yeah, listen You better kneel to the Boss",
  1: "I ain’t come to play, I just come to slay Best believe today’s your lucky day, once I touch the stage Top spot forever, bruh these number never fluctuates Hottest thing alive when I shine I set the sun ablaze Make the Winter season feel like Summer days Forward ‘cause there ain’t no other way, no matter what awaits I am unafraid, I’ll never runaway Best to do it, done it, did it, flipped it ‘bout a hundred ways I’m just saying...",
  2: "Right?! I’m a winner bruh, you never equipped to win the fight Against the Emperor, listen up are you men or mice? I’m the pinnacle, quite formidable. Never seen the likes Of originals, making miracles, Y’all don’t see the light?! Y’all got your eyes closed. Off into my zone Fly like a meteor, I’m in the media, they want to be up in my throne Ride in the whip, yall gotta quit, got all of this on my own Tryin’ to hit me up on my phone, all that they get is the dial tone Take it all til there’s nothing’s left, that’s just how you get it right Yeah, they dying to be me, it’s no wonder that they can’t get a life Every time that they see me trying to eat off me like parasites No surprise. Only room at the top for one so step aside This is Big E, get me, these posers are merely lowercase Out of this world, at a loss for words, you don’t clearly know your place I put it down plain, I’m in the fast lane moving at a tortoise pace So unbothered I got a permanent poker face, enjoy the race",
  3: "I ain’t come to play, I just come to slay Best believe today’s your lucky day, once I touch the stage Still number one, bruh these numbers never fluctuate Put your drive to the test, see me, better pump your breaks Crew got more runners than the Summer games Forward ‘cause there ain’t no other way, no matter what it takes I am unafraid, I’ll never runaway Best to do it, done it, did it, flipped it ‘bout a hundred ways I’m just saying...",
  4: "Though! Yo! You dealing with a pro! Had to let’em know They get ate like Ocho Don’t make me embarrass you, keep that on the low low P.L. crew up in this piece and your crew is a no show Loco, testing me and li’l homie solo Legend in the streets, on the mic a virtuoso They say that they’re ready, for their sake, I really hope so Out here making history you better snap a photo Fakers out here hating on me they don’t want this work Trying to knock me off the throne but your boy been known to swerve Wanna off me just get on but these peons are absurd Ambitions of ascension but I keep their dreams deferred Wanna knock me off the top but I’m laughing while they’re reaching I will never stop shining down on them like beacons Grinding thru the weekend and I don’t need a reason Full throttle is my motto ‘til I’m riding off the deep end",
  5: "Doubt you want a problem, but keep on talking then it’s bout to be They said the sky’s the limit but they lied ‘cause ain’t no topping me You ain’t as live as me. How can there be a rivalry? Loneliest at the top you see I’m enjoying my privacy I am feeling so fresh worked to be the best Workin hard and playing hard and I don’t need no rest Livin' like a King nothing but winners on my team Going hard I know the cost, just blowing off some steam This is how I get it done just trying to have a little fun I walk through fire, make rivers run, I been the one, not two So listen up, my dude, every member of my crew Since little ones, weren’t putting up with simpletons or fools No giving up can’t lose won’t take what I can’t use Spread my wing and stretching out cuz I’m about to get loose. The Emperor will get on with anyone you choose Let’em tell it on the news. When it’s said and done I’m through!"
}
var sections = {
  1: 'Bridge1',
  2: 'Verse1',
  3: 'Bridge2',
  4: 'Verse2',
  5: 'Verse3'
}
//fun REGEXP shenanigans
//In glitch, you can't have a line break in a string, at least as far as I tested it
// but instead of me going through to make it look better, which would be tedious, I 
// let JavaScript REGEXP and STRING.split() do the work
var matcher = /(?<![tT]he)(?<=[a-z.?!])\s(?=[A-Z])(?!I\s[tsgkdc][oehna][uiteno]|Summer|Off|Only|Big|Never|E,|Ocho|King|How|When|Yo!|You\sd|They\sg|I’m\s[alret][\sabinh][dojurw])/;
//The full text looked clunky, so this holds seperate pieces of the above penguin array
var penguin_holder = {};
var index = 1;
var stopSetInterval;
var start;
let breakpoints = [18.1,43.7,93.2,118,168.01,218];
var testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text");
var extra = document.querySelector("#visual-text");
var theTimer = document.querySelector(".timer");
var yourScoreboard = document.querySelectorAll("tbody")[1];
var testWrapper = document.querySelector(".test-wrapper");
var errors = 0;
var currentUserText = "";
var currentVerse = "";
var yourScores = {};


//update the HTML to display text
function penguinLines(index,start, end,target)
{
  target.innerHTML="";
  for (var i=start; i < end; i++)
  {
    var element = document.createElement("template");
    element.innerHTML = (target==originText) ? '<p>'+penguin_holder[index][i]+'</p>' :
    ((index==2) ? '<p style="margin-top:0;margin-bottom:1.5em;">'+penguin_holder[index][i]+'</p>' : '<p style="margin-top:0;">'+penguin_holder[index][i]+'</p>');
    target.appendChild(element.content.firstChild);
  }
  
}
function begin() {
//play the audio
let bigE = document.querySelectorAll("img")[0]
bigE.className= "BigE"
let bgm = new Audio("https://cdn.glitch.com/0569e479-2ef8-4218-8629-458302c4ad4d%2F%5BArknights%20CN%5D%20Loyal%20To%20The%20Beat%20(April%20Fools%202021%20Emperor's%20Theme).mp3?v=1618812785220");
bgm.volume = 0.35; // adjust this as you need, i like 0.5  
bgm.play()
  for(var key in penguin)
  {
    yourScores[key] = "";
    penguin_holder[key] = penguin[key].split(matcher);
  }
  yourScores[0] = {"wpm": 0, "incorrect": 0, "time": "00:18:10", "percentage" : 1};
  start = new Date();
  stopSetInterval = setInterval(timer,10);
  //play all verses in sync on a delay
  setTimeout(intro,breakpoints[0]*1000);
  setTimeout(Bridge1,breakpoints[1]*1000);
  setTimeout(Verse1,breakpoints[2]*1000);
  setTimeout(Bridge2,breakpoints[3]*1000);
  setTimeout(Verse2,breakpoints[4]*1000);
  setTimeout(Verse3,breakpoints[5]*1000);
 
}
//I don't expect you to beat Big E, so here is a projected time
function adjusted(index)
{
  let previous = yourScores[index-1]["time"];
  let interval = breakpoints[index] - breakpoints[index - 1];
  let projectedTimeInSeconds = interval/(yourScores[index]["percentage"]);
  let adjustedTime = convertTime(projectedTimeInSeconds + timerConvert(previous));
  yourScores[index]["time"] = adjustedTime;
  return adjustedTime;
  
}
//change time in seconds to our Timer format
function convertTime(time)
{
  let timeInMilliSeconds = time * 1000;
  var hours = Math.floor((timeInMilliSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var mins = Math.floor((timeInMilliSeconds % (1000 * 60 * 60)) / (1000 * 60));
  var secs = Math.floor((timeInMilliSeconds % (1000 * 60)) / 1000);
  var hundreths =  Math.floor((timeInMilliSeconds % 1000)/10);
  return (hours==0) ? ("0"+mins).slice("-2")+":"+("0"+secs).slice("-2")+":"+("0"+hundreths).slice("-2") : ("0"+hours).slice("-2")+":"+("0"+mins).slice("-2")+":"+("0"+secs).slice("-2")+"."+("0"+hundreths).slice("-2");
}
//dislay the stats at the end
function displayScores()
{
  let penguinScoreboard = document.querySelector("#scores");
  let body = penguinScoreboard.querySelector("tbody");
  var template = document.createElement("template");
  for(var i=1; i<6; i++)
    {
        let wpm = Math.floor(60*(penguin[i].split(" ").length/(breakpoints[i] - breakpoints[i - 1])))
        template.innerHTML = '<tr><td>'+sections[i]+'</td><td>100%</td><td>0</td><td>'+convertTime(breakpoints[i])+'</td></tr>';
        body.appendChild(template.content.firstChild);
        let result = (timerConvert(yourScores[i]["time"]) > breakpoints[i]) ? yourScores[i]["time"] : adjusted(i);
        let string = '<tr><td>'+sections[i]+'</td><td>'+Math.floor(yourScores[i]["percentage"]*100)+'%</td><td>'+yourScores[i]["wpm"]+'</td><td>'+result+'</td></tr>';
        template.innerHTML = string; 
        yourScoreboard.appendChild(template.content.firstChild);
    }
  
  penguinScoreboard.style.display="inherit";
}

// clean up code to calculate some fun little stats
function cleanup(){
  if(testArea.hasAttribute("disabled"))
    {
      testArea.removeAttribute("disabled");
    }
  currentUserText = testArea.value;
  testWrapper.style.borderColor = "gray";
  if(currentVerse.length !== currentUserText.length)
    {
      storeTime(convertTime(breakpoints[index]));
      //avoid divide by 0 later and give you a benefit of the doubt
      yourScores[index]["percentage"] = (testArea.value.length != 0) ? testArea.value.length/currentVerse.length : 0.1;
      yourScores[index]["wpm"] = wpm();
    }
  yourScores[index]["incorrect"] = checkAgainstVerse(currentUserText, currentVerse);
  index++;
}
// Below are the various functions that handle the flow of the track
function Verse3()
{
  extra.style.display = "none";
  cleanup();
  clearInterval(stopSetInterval);
  displayScores();
  document.querySelector(".penguin").style.display = "inherit";
  document.querySelectorAll("table")[1].style.display = "inherit";
  testWrapper.style.display="none";
  originText.style.display="none";
}
function Verse2()
{
  extra.style.display = "none";
  cleanup();
  let halfway = penguin_holder[index].length/2;
  penguinLines(index, 0, halfway, extra);
  penguinLines(index, halfway, penguin_holder[index].length, originText);  
  extra.style.display = "inherit";
  currentVerse = penguin[index];
  testArea.value = "";
}
function Bridge2()
{
  extra.style.display = "inherit";
  cleanup();
  let halfway = penguin_holder[index].length/2;
  penguinLines(index, 0, halfway, extra);
  penguinLines(index, halfway, penguin_holder[index].length, originText);  
  currentVerse = penguin[index];
  testArea.value = "";
}
function Verse1()
{
  
  extra.style.display = "none";
  cleanup();
  penguinLines(index, 0, penguin_holder[index].length, originText);
  currentVerse = penguin[index];
  testArea.value = "";
}
function Bridge1()
{
  
  cleanup();
  let halfway = penguin_holder[index].length/2;
  penguinLines(index, 0, halfway, extra);
  penguinLines(index, halfway, penguin_holder[index].length, originText);  
  extra.style.display = "inherit";
  currentVerse = penguin[index];
  testArea.value = "";
}
function intro()
{
  penguinLines(index, 0, penguin_holder[index].length, originText);
  testArea.value = "";
  testArea.addEventListener("input",textCheck);
  currentVerse = penguin[index];
}


//tally the incorrect letters
function checkAgainstVerse(user, target)
{
  let currentIndex = 0; 
  var incorrectLetters = 0;
  for(var i=0; i < user.length; i++)
    {
      if(user[i] == "\n" &&  target[i] == " ")
        {
          continue;
        }
      else
        {
      incorrectLetters = (user[currentIndex] !== target[currentIndex]) ? incorrectLetters + 1 : incorrectLetters;
        }
    }
  return incorrectLetters;
}
// Like the assignment this cares for notifying the user if they are on the right track
// A simple color change shows if it is right, but red for wrong felt like too much
// So this check only shows if you, up to a certain point, typed it correctly;
function textCheck(event){
  
  if(event.inputType == "insertText" || event.inputType == "deleteContentBackward" || event.inputType == "insertLineBreak")
  { 
      if(currentVerse.length != testArea.value.length)
        {
          let rightnow = testArea.value.length - 1;
          let result = testArea.value[rightnow] == currentVerse[rightnow];
          if(testArea.value[rightnow] == "\n" || testArea.value[rightnow] == "'")
            result = true;
          if(!result)
            result = false;
          testWrapper.style.borderColor = result ? "dodgerblue": "gray";
        }
      else
        {
          storeTime(theTimer.innerHTML);
          testArea.disabled = "disabled";
        }
    }
  if(event.inputType == "insertFromPaste")
    {
      testArea.value = "";
      alert("Oops!!! Lost all progress");
    }
}
function timer() 
{ 
  var now = new Date().getTime(); 
  var t = now - start.getTime();
  //a lot of math, but it's just unit conversion
  var mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  var secs = Math.floor((t % (1000 * 60)) / 1000);
  var hundreths =  Math.floor((t % 1000)/10);
  theTimer.innerHTML = ("0"+mins).slice("-2")+":"+("0"+secs).slice("-2")+":"+("0"+hundreths).slice("-2");
}

// for now disregard errors
function wpm()
{    
    let time = theTimer.innerHTML.split(":");
    let total_seconds = parseInt(time[0] * 60, 10) + parseInt(time[1], 10) + parseFloat(time[2] / 100);
    let wpm = Math.floor(testArea.value.length / 5 / (total_seconds / 60));
    return wpm;
    
}
function storeTime(time)
// stores the time and also keeps the ranking correct, with top3[0] being the fastest time
{
  if(yourScores[index]["time"])
  {
    yourScores[index]["time"] = time;
  }
  else
    {
      var temp = {"wpm": 0, "incorrect": 0, "time": time, "percentage" : 1};
      yourScores[index] = temp;
    }
}
function timerConvert(time)
{
  let newT = time.split(":");
  return parseInt(newT[0] * 60, 10) + parseInt(newT[1], 10) + parseFloat(newT[2] / 100);
}

// other stuff
 //}
//           else
//           {
//             //user decides to fix this sentence
//             if(event.inputType == "insertText")
//               {
                
//                 wentBack = false;
//               }
//             // still going back
//             else if(event.inputType == "deleteContentBackward")
//               {
//                 currentIndex--;
//                 console.log(errors);
//                 console.log(currentIndex);
//               }
//           }