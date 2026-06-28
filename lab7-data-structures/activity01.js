import {vector} from "@/utils/vec3.js";
import * as activity from "./01-bounce-along-again.js";
import { drawGrid } from "@/utils/grid.js";
import { drawWithPause } from "@/utils/animatedDraw.js";
import { demoMode } from "@/utils/demoMode";
import showTime from "@/utils/timer";

export function setup() {
    camera(300, -200, 700);
}

export function draw(t, dt) {
    scale(100);
    showTime(t);
    orbitControl();
    background(30);
    ambientLight(80);
    directionalLight(255, 255, 255, 1, 1, -1);
    drawGrid(10, 10);
    noStroke();
    window.sin = Math.sin;
    if (demoMode) {
        demo(t, dt);
    } else {
        activity.draw(t, dt);
    }
}


let positionY = -4;
let velocityY = 0;
let gravity = 9.8;

let positionX = 5;
let velocityX = -.75;

function demo(t, dt) {
    positionY = positionY + velocityY * dt;
    velocityY = velocityY + gravity * dt;

    positionX = positionX + velocityX * dt;

    if (positionY >= 0) {
        positionY = 0;
        velocityY = -velocityY;
        velocityY = velocityY * 0.8; // 0.8 = coefficient of restitution
    }

    translate(positionX, positionY, 0);
    fill(50, 255, 50);
    sphere(.1);
}