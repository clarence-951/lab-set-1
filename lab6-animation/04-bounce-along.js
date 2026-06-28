// -------------------------------------------------------
//  Falling Ball
//
//  We are going to make the ball bounce AND move along the x-axis
//
// -------------------------------------------------------


let positionY = -4;
let velocityY = 0;
const gravity = 9.8;

let positionX = 5;
let velocityX = -.75;

function draw(time, deltaTime) {


    translate(0, position, 0);
    fill(50, 255, 50);
    sphere(.1);
}