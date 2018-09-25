// SETUP
var canvas = document.getElementById("content");
var c = canvas.getContext("2d");
var canvasSize = 600;
var center = canvasSize / 2;
var stars = [];
var starRadius = 1;
var numOfStars = 100;
var speed = 5;
// STAR CLASS
var Star = /** @class */ (function() {
  function Star() {
    this.x = Math.floor(Math.random() * canvasSize);
    this.y = Math.floor(Math.random() * canvasSize);
    this.z = Math.floor(Math.random() * canvasSize);
    this.pz = this.z;
  }
  Star.prototype.move = function() {
    canvas.onmousemove = function(e) {
      speed = (e.pageX - this.offsetLeft) * 0.8;
    };
    this.z = this.z - speed / 25;
    if (this.z <= 0) {
      this.z = canvasSize;
      this.x = Math.floor(Math.random() * canvasSize);
      this.y = Math.floor(Math.random() * canvasSize);
    }
  };
  Star.prototype.show = function() {
    var sx, sy, sz;
    sx = (this.x - center) * (canvasSize / this.z) + center;
    sy = (this.y - center) * (canvasSize / this.z) + center;
    sz = starRadius * (canvasSize / this.z);
    if (speed < 400) {
      c.fillStyle = "white";
      c.beginPath();
      c.arc(sx, sy, sz, canvasSize / (speed * 200), Math.PI * 2);
      c.fill();
    } else {
      var px = (this.x - center) * (canvasSize / this.pz) + center;
      var py = (this.y - center) * (canvasSize / this.pz) + center;
      c.strokeStyle = "white";
      c.beginPath();
      c.moveTo(px, py);
      c.lineTo(sx, sy);
      c.stroke();
    }
  };
  return Star;
})();
// DRAW
function draw() {
  c.fillStyle = "black";
  c.fillRect(0, 0, 600, 600);
  for (var i_1 = 0; i_1 < numOfStars; i_1++) {
    stars[i_1].show();
    stars[i_1].move();
  }
}
function update() {
  draw();
  window.requestAnimationFrame(update);
}
for (var i = 0; i < numOfStars; i++) {
  stars[i] = new Star();
}
update();
