//==============jQuery functions for simulation===============//
$(document).ready(function() {
  var rocket = $('#rocket'),
      gravity = -9.80665,
      abs_g = Math.abs(gravity), //absolute value to convert gravity
      projectile_ang = 0, //initialize angle of projection
      v = 0, //initialize velocity
      t = 0, //t for time
      x = 0, // horizontal axis position
      y = 0; // verticle axis position

  // Move rocket
  function moveRocket(x, y) {
    rocket.css({
      left: x,
      bottom: y
    });
  }

  // Radians for JavaScript
  function toRadians (projectile_ang) {
    return projectile_ang * (Math.PI / 180);
  }

  // Function to Calculate Y
  function calc_Y(gravity, projectile_ang, v, t) {
    var t_squared = Math.pow(t,2),
        sin_projectile_ang = Math.sin(toRadians(projectile_ang));
    return Math.round( (sin_projectile_ang*v*t) + ((0.5)*gravity*t_squared) );
  }

  // Function to Calculate X
  function calc_X(projectile_ang, v, t) {
    var cos_projectile_ang = Math.cos(toRadians(projectile_ang));
    return Math.round(cos_projectile_ang*v*t);
  }

  // Function to Calculate Max Time
  function maxTime(projectile_ang, v, gravity) {
    var sin_projectile_ang = Math.sin(toRadians(projectile_ang));
    return ((sin_projectile_ang*v)/abs_g)*2;
  }

  function simulate(v, projectile_ang) {
    // Reset Everything
    $('.line').remove();
    rocket.css({
      left: 0,
      right: 0
    });

    var max_time = maxTime(projectile_ang, v, gravity),
        max_time_100 = (max_time/100);

    function calculatePosition(i) {
      t = i*(max_time_100);
      console.log("After " + t + " seconds:");
      x = calc_X(projectile_ang, v, t);
      y = calc_Y(gravity, projectile_ang, v, t);

      console.log(x);
      console.log(y);

      console.log("");

      $('#map').append('<span class="line" style="left:' + x + 'px; bottom:' + y + 'px;"></span>');

      moveRocket(x, y);

      i++;
    }

    function increment_X(callback, delay, repetitions) {
      // Disable Button
      $('#simulate').prop('disabled', true);

      var x = 0;
      var increment = window.setInterval(function () {

        calculatePosition(x);

        if (++x === repetitions) {
          window.clearInterval(increment);

          // Re-enable Button
          $('#simulate').prop('disabled', false);
        }
      }, delay);
    }

    increment_X(function () {}, (max_time*10), 101);
  }
//===========Velocity Slide Bar=============//
   var slider = document.getElementById("myVelocity");
   var output = document.getElementById("v_output");
   output.innerHTML = slider.value;

   slider.oninput = function() {
   output.innerHTML = this.value;
   console.log(output.innerHTML);
 }
//===========projectile_ang of Trajectory Slide Bar=============//
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

    var projectile_ang_input = output2.innerHTML;

    simulate(velocity_input, projectile_ang_input);
  });
});
