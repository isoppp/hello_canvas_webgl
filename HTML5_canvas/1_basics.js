var Debugger = {};
Debugger.log = function (mes) {
  try {
    console.log(mes);
  } catch (expection) {
    return;
  }
};

function canvasSupport() {
  return !!document.createElement('canvas').getContext;
}

function canvasApp() {
  if (!canvasSupport()) return;
  var canvasOne = document.getElementById('canvasOne');
  var context = canvasOne.getContext('2d');

  Debugger.log('drawing canvas');

  function drawScreen() {

    // background
    context.fillStyle = "#ffffaa";
    context.fillRect(0, 0, 500, 300);

    // text
    context.fillStyle = "#000000";
    context.font = "20px Sans-Serif";
    context.textBaseline = "top";
    context.fillText("Hello World!", 195, 80);

  //  box
    context.strokeStyle = "#000000";
    context.strokeRect(5,5,490,290);
  }

  drawScreen();
}

function eventWindowLoaded() {
  canvasApp();
}

window.onload = eventWindowLoaded;