import p5 from "p5";
import { drawAxes } from "./utils/axes.js";
// -------------------------------------------------------
//  Change this line to switch activities.
//  Everything else in this file stays the same.
// -------------------------------------------------------
import * as activity from "./activities/00-example.js";
//import * as activity from "./activities/01-single-cube.js";
// import * as activity from "./activities/02-growing-cubes.js";
//import * as activity from "./activities/03-growing-cubes-step-by-step.js";


// -------------------------------------------------------
//  The runner — students don't need to touch any of this.
//  It handles setup, lighting, camera, and the draw loop.
//  Activities just export setup, draw, or main.
// -------------------------------------------------------

let font;
 
function preload() {
  font = loadFont("https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf");
}
 

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  background(30);
  ambientLight(80);
  directionalLight(255, 255, 255, 1, -1, -1);

  if (activity.setup) activity.setup();
  if (activity.main) activity.main();
}

const start = Date.now();

function draw() {
    orbitControl();
    
  background(30);
  ambientLight(80);
  directionalLight(255, 255, 255, 1, -1, -1);
  drawAxes(font);
  debugMode(GRID, 500, 10, 0, 0, 0);



  activity.draw( (Date.now() - start) / 1000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

window.preload = preload;
window.setup = setup;
if ( activity.draw )
  window.draw = draw;
window.windowResized = windowResized;
new p5();
angleMode(DEGREES);