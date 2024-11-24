/*----------------------------------------------------------*/
/**
 * @file js/index__test.js
 * @author mnaatjes
 * @namespace Test
 */

const canvas    = document.getElementById('viewport');
const ctx       = canvas.getContext('2d');

function drawEllipse(x, y, w, h) {
  ctx.beginPath();
  ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawObject(x, y, angle, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillRect(-size / 2, -size / 2, size, size);
  ctx.restore();
}

function animate(time) {
  const a = 100; // Semi-major axis
  const b = 50;  // Semi-minor axis
  const period = 5000; // Orbit period in milliseconds

  const angle   = (2 * Math.PI * time) / period;
  const x       = a * Math.cos(angle);
  const y       = b * Math.sin(angle);

  // Calculate tangent vector
  const dx = -a * Math.sin(angle);
  const dy = b * Math.cos(angle);

  // Calculate rotation angle
  const rotationAngle = Math.atan2(dy, dx);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEllipse(canvas.width / 2, canvas.height / 2, a, b);
  drawObject(x + canvas.width / 2, y + canvas.height / 2, rotationAngle, 20);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);