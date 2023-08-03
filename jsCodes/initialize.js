var camera;

$(document).ready(function () {
    var canvas = document.getElementById("myCanvas");
    var categories=[];
    var gameObjects=[];
    var elementPerRound = 20;
    SorterGame = new  SorterGame(canvas, gameObjects, categories, elementPerRound);
    loadIntro();
    eventListeners(SorterGame);
    $('[data-toggle="tooltip"]').tooltip();

    camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({image: videoElement});

      },
      width: 1280,
      height: 720
    });
    //** changed! */
    //camera.start();

    /*SorterGame.loadGameFile (preloadedJSON);
    SorterGame.start();*/

	checkUrl();
});

 //hand detection setup

 const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

function checkUrl (){
    var filename = window.location.href.split( '?' );
    if (filename.length >1) {
      openOnlineExample (filename[1])
    }
}

function eventListeners (game){
  var stopButton = document.getElementById("stopButton");
  var playButton = document.getElementById ("playButton");
  var editButton = document.getElementById ("editButton");
  var downloadButton = document.getElementById ("downloadButton");
  var designButton = document.getElementById ("designButton");
  var startButton = document.getElementById("startButton");
  var homeButton = document.getElementById("homeButton");
    startButton.addEventListener("click", function (){
      //  game.end();
        game.start();                //initialize lists of elements

    })

   stopButton.addEventListener("click", function (){   game.end();   })
   playButton.addEventListener("click", function (){   game.saveGame(); game.loadPlayMode();   })
   editButton.addEventListener("click", function (){   game.loadDesignMode();   })
   designButton.addEventListener("click", function (){   game.loadDesignMode();   })
   downloadButton.addEventListener("click", function (){   game.createFile();   })
   homeButton.addEventListener("click", function (){   loadIntro();   })
  document.getElementById('loadGame').addEventListener('change', readFile, false);
}

function closeModal (){
  $("#gameOverModal").hide();
}

/* changed! moved these functions here from sortermain.js */
function getRandNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function getRandNumberMinMax(min, max) {
  return (Math.random() * (max-min))+min;
}

//from stackoverflow
function average(array){
  const sum = array.reduce((a, b) => a + b, 0);
  return  avg = (sum / array.length) || 0;
}

//it's from stackoverflow
function getStandardDeviation (array) {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}
