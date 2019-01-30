var currentmax = 0;

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
    // document.getElementById("debug").value = currentmax;
  }

  if (totalAcceleration > 9.0) {
    // document.getElementById("FALL").value = totalAcceleration;

    const xhr = new XMLHttpRequest();
    const url = "/api/falldetect";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
      // Call a function when the state changes.
      document.getElementById("debug").value = this.readyState;
    };

    xhr.send(JSON.stringify(totalAcceleration));
  }
}

var debug = document.getElementById("debug");

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
