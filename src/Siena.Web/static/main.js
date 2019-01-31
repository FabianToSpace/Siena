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

    startArtyom();

    window.setTimeout(function() {
      stopArtyom();
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

const artyom = new Artyom();

var commands = {
  indexes: ["hilfe"], // These spoken words will trigger the execution of the command
  action: function() {
    // Action to be executed when a index match with spoken word
    callHelp();
  }
};

artyom.addCommands(commands);

var startArtyom = function() {
  artyom.initialize({
    lang: "de-DE",
    debug: true, // Show what recognizes in the Console
    listen: true, // Start listening after this
    speed: 1, // Talk a little bit slow
    mode: "normal" // This parameter is not required as it will be normal by default
  });
};

var stopArtyom = function() {
  artyom.fatality();
};

var callHelp = function() {
  artyom.say("Geht es dir gut?");

  const xhr = new XMLHttpRequest();
  const url = "/api/falldetect";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify("Help requested"));

  debugInput.value = "Help requested";
};

startArtyom();
stopArtyom();
