// -------------------------------------------------------
//  Falling Ball
//
//  HOLY CRAP THERE IS CALCULUS HIDDEN IN THIS THING
//
// -------------------------------------------------------


//Position of ball, in meters. Remember negative is UP
//The ball is 2 meters above the plane
let position = -2;  

//Velocity of ball. How fast it moves per second
//It is moving UP at 4 meters per second
let velocity = -4;
                  
//Gravity. Every second the velocity changes by this much
//Every second things fall this much faster...
const gravity = 9.8;

export function draw(time, deltaTime) {
    //time is the number of SECONDS that have elapsed since the program STARTED.

    //deltaTime is the time in SECONDS that have elapsed since the last FRAME, the last time Draw was called.
    //Probably about 1/60th of a second. DELTA is a general term for CHANGE.

    //1. Update the position based on the velocity

    //2. Update the velocity based on gravity.


    translate(0, position, 0);
    fill(50, 255, 50);
    sphere(.1);
}