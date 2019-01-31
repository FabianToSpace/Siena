var currentmax = 0;
var debugInput = document.getElementById("debug");

function tilt(acceleration, gravity) {
  var xacc = acceleration[0];
  var yacc = acceleration[1];
  var zacc = acceleration[2];

  var xgrav = gravity[0];
  var ygrav = gravity[1];
  var zgrav = gravity[2];

  document.getElementById("orientationX").value = xacc;
  document.getElementById("orientationY").value = yacc;
  document.getElementById("orientationZ").value = zacc;

  document.getElementById("gravityX").value = xgrav;
  document.getElementById("gravityY").value = ygrav;
  document.getElementById("gravityZ").value = zgrav;

  var accelerationX = xgrav + xacc;
  var accelerationY = ygrav + yacc;
  var accelerationZ = zgrav + zacc;

  var totalAcceleration = Math.sqrt(
    (accelerationX * accelerationX +
      accelerationY * accelerationY +
      accelerationZ * accelerationZ) /
      10
  );

  if (totalAcceleration > currentmax) {
    currentmax = totalAcceleration;
  }

  if (totalAcceleration > 9.0) {
    debugInput.value = "Start Recognizing for 120 seconds";
    annyang.resume();

    window.setTimeout(function() {
      annyang.pause();
      debugInput.value = "Recognize stopped.";
    }, 120000);
  }
}

window.addEventListener(
  "devicemotion",
  function() {
    tilt(
      [event.acceleration.x, event.acceleration.y, event.acceleration.z],
      [
        event.accelerationIncludingGravity.x,
        event.accelerationIncludingGravity.y,
        event.accelerationIncludingGravity.z
      ]
    );
  },
  true
);

var annyang = window.annyang;
console.re.log(annyang);

var commands = {
  "hilfe (bitte)": function() {
    callHelp();
  }
};

annyang.addCommands(commands);
annyang.setLanguage("de-DE");
annyang.debug();
annyang.start();

var callHelp = function() {
  const xhr = new XMLHttpRequest();
  const url = "/api/falldetect";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify("Help requested"));

  debugInput.value = "Help requested";
};
