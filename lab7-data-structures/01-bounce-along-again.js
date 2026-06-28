// -------------------------------------------------------
//  Bouncing Ball...
//
// -------------------------------------------------------


let position = vector(5, -4, 0);

let velocity = vector(-.75, 0, 0);

let gravity = vector(0, 9.8, 0);


export function draw(t, dt) {

    position = position.plus(velocity.times(dt));
    velocity = velocity.plus(gravity.times(dt));

    if (position.y >= 0) {
        position.y = 0;
        velocity.y = -velocity.y;
        velocity.y = velocity.y * 0.8;
    }

    translate(position.x, position.y, position.z);

    fill(50, 255, 50);
    sphere(.1);
}