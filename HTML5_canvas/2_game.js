//======================================
// Utils
//======================================
var Debugger = {};
Debugger.log = function (mes) {
  try {
    // console.log(mes);
  } catch (expection) {
    return;
  }
};

function canvasSupport() {
  return !!document.createElement('canvas').getContext;
}


//======================================
// games
//======================================
(function () {

  var gameOver = false;
  var gameCount = 0;
  var title = 'Guess The Letter From a (lower) to z (higher)';
  var words = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];
  var answerIndex = Math.floor(Math.random() * words.length);
  var answerWord = words[answerIndex];
  var today = new Date();
  var higherOrLower = '';
  var inputHistory = [];


  function initGame() {
    gameCount = 0;
    inputHistory = [];
    gameOver = false;
    window.addEventListener('keydown', eventKeyPressed, true);
    drawScreen();
  }

  function eventKeyPressed(e) {
    if (gameOver) return;
    gameCount++;
    var pressedWord = String.fromCharCode(e.keyCode);
    pressedWord = pressedWord.toLowerCase();
    inputHistory.push(pressedWord);

    if (pressedWord == answerWord) {
      gameOver = true;
    } else {
      var pressedIndex = words.indexOf(pressedWord);
      Debugger.log(answerIndex);
      Debugger.log(pressedIndex);
      higherOrLower = pressedIndex > answerIndex ? 'Lower' : 'Higher';
    }
    drawScreen();
  }


  var canvasOne = document.getElementById('canvasOne');
  var context = canvasOne.getContext('2d');


  function drawScreen() {
    Debugger.log('drawing canvas');

    // background
    context.fillStyle = '#ffffaa';
    context.fillRect(0, 0, 500, 300);

    // Box
    context.strokeStyle = '#000000';
    context.strokeRect(5, 5, 490, 290);
    context.textBaseline = 'top';

    // Date
    context.fillStyle = '#000000';
    context.font = '10px Sans-Serif';
    context.fillText(today, 150, 10);

    // Message
    context.fillStyle = '#ff0000';
    context.font = '14px Sans-Serif';
    context.fillText(title, 100, 30);
    context.fillStyle = '#109910';
    context.font = '16px Sans-Serif';
    context.fillText('Guesses: ' + gameCount, 215, 50);

    // Higher or Lower
    context.fillStyle = '#000000';
    context.font = '16px Sans-Serif';
    context.fillText('Higher Or Lower: ' + higherOrLower, 150, 125);

    //  Letters Guessed
    context.fillStyle = '#ff0000';
    context.font = '16px Sans-Serif';
    context.fillText('Letters Guessed: ' + inputHistory.toString(), 10, 260);

    if (gameOver) {
      context.fillStyle = '#FF0000';
      context.font = '40px Sans-Serif';
      context.fillText('You Got It!', 150, 100);
    }
  }


  function eventWindowOnload() {
    //game init
    initGame();
    window.addEventListener('keydown', eventKeyPressed, true);

    // open another window
    function createImageDataPressed(e) {
      window.open(canvasOne.toDataURL(), 'canvasImage', 'left=0,top=0,width=' + canvasOne.width + ',hight=' + canvasOne.height + ',toolbar=0,resizable=0');
    }

    var button = document.getElementById("createImageData");
    button.addEventListener('click', createImageDataPressed, false);
  }

  window.onload = eventWindowOnload;
})();
