//==============jQuery functions for simulation===============//
$(document).ready(function() {
  //Initialize all variables needed for calculations
  var rocket = $('#rocket'),
      gravity = -9.80665,
      abs_g = Math.abs(gravity),
      angle = 0,
      v = 0, //Initial Velocity
      t = 0,
      x = 0, // X Position
      y = 0; // Y Position

  // Function to Move the Ball with CSS positioning
  function moveRocket(x, y) {
    rocket.css({
      left: x,
      bottom: y
    });
  }

  // Function to Convert angle to Radians for JS
  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  // Function to Calculate Y
  function findY(gravity, angle, v, t) {
    var t_squared = Math.pow(t,2),
        sin_angle = Math.sin(toRadians(angle));
    return Math.round( (sin_angle*v*t) + ((0.5)*gravity*t_squared) );
  }

  // Function to Calculate X
  function findX(angle, v, t) {
    var cos_angle = Math.cos(toRadians(angle));
    return Math.round(cos_angle*v*t);
  }

  // Function to Calculate Max Time
  function maxTime(angle, v, gravity) {
    var sin_angle = Math.sin(toRadians(angle));
    return ((sin_angle*v)/abs_g)*2;
  }

  function simulate(v, angle) {
    // Reset Everything
    $('.line').remove();
    rocket.css({
      left: 0,
      right: 0
    });

    var max_time = maxTime(angle, v, gravity),
        max_time_100 = (max_time/100);

    function calculatePosition(i) {
      t = i*(max_time_100);
      console.log("After " + t + " seconds:");
      x = findX(angle, v, t);
      y = findY(gravity, angle, v, t);

      console.log(x);
      console.log(y);

      console.log("");

      $('#graph').append('<span class="line" style="left:' + x + 'px; bottom:' + y + 'px;"></span>');

      moveRocket(x, y);

      i++;
    }

    function setIntervalX(callback, delay, repetitions) {
      // Disable Button
      $('#simulate').prop('disabled', true);

      var x = 0;
      var intervalID = window.setInterval(function () {

        calculatePosition(x);

        if (++x === repetitions) {
          window.clearInterval(intervalID);

          // Re-enable Button
          $('#simulate').prop('disabled', false);
        }
      }, delay);
    }

    setIntervalX(function () {}, (max_time*10), 101);
  }
//===========Velocity Slide Bar=============//
   var slider = document.getElementById("myVelocity");
   var output = document.getElementById("v_output");
   output.innerHTML = slider.value;

   slider.oninput = function() {
   output.innerHTML = this.value;
   console.log(output.innerHTML);
 }
//===========Angle of Trajectory Slide Bar=============//
  var slider2 = document.getElementById("myAngle");
  var output2 = document.getElementById("ang_output");
  output2.innerHTML = slider2.value;

  slider2.oninput = function() {
    output2.innerHTML = this.value;
    console.log(output2.innerHTML);
  }


  $('#simulate').click(function(event) {
    event.preventDefault();

    var velocity_input = output.innerHTML;

    var angle_input = output2.innerHTML;

    simulate(velocity_input, angle_input);
  });
});
