import p5 from "p5";

// -------------------------------------------------------
//  EXAMPLE: Growing cubes — step by step
//
//  This version draws one cube at a time, pausing between
//  each one so you can watch the loop execute slowly.
//
//  sleep(ms) pauses for that many milliseconds before
//  continuing to the next line. Try changing the value!
//
//  You can also set a breakpoint inside the for loop in
//  VSCode and step through it one cube at a time.
// -------------------------------------------------------

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  camera(300, -300, 600,  // eye position (x, y, z)
       0, 0, 0,         // look at (origin)
       0, 1, 0);        // up direction
       
  background(30);
  ambientLight(80);
  directionalLight(255, 255, 255, 1, -1, -1);

  for (let i = 0; i < 5; i++) {

    let size = 20 + i * 10; // 20, 40, 60, 80, 100

    push();
      translate(i * 120 - 240, 0, 0);
      box(size);
    pop();

    await sleep(600); // ← pause here so you can see each cube appear
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // No draw() loop — we call main() once and let it run step by step
  main();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

window.setup = setup;
window.windowResized = windowResized;
new p5();
