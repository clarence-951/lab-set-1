import p5 from "p5";
import * as axes from "./utils/axes.js";
import { drawGrid } from "./utils/grid.js";
//import * as activity from "./activityChooser.js";

const activity = (await import("./activityChooser.js")).default;

console.log("AAA", activity);
// -------------------------------------------------------
//  The runner — students don't need to touch any of this.
//  It handles setup, lighting, camera, and the draw loop.
//  Activities just export setup, draw, or main.
// -------------------------------------------------------


document.querySelectorAll('input[name="mode"]').forEach(radio => {
  radio.addEventListener('change', (event) => {
    console.log('Selected:', event.target.value);
  });
});


function preload() {
  axes.preload();
  if (activity.preload)
    activity.preload();
}


async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  if (activity.setup)
    activity.setup();

  if (activity.main)
    await activity.main();

}


const start = Date.now();

async function draw() {
  try {
   activity.draw((Date.now() - start) / 1000);
  } catch (e){
    noLoop();
    throw e;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.sleep = function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.preload = preload;
window.setup = setup;
if (activity.draw)
  window.draw = draw;
window.windowResized = windowResized;
new p5();
angleMode(DEGREES);