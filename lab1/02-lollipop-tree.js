/// <reference types="p5/global" />

import { drawAxes } from "../utils/axes";

export function draw() {
    //TODO Remove Code

    //1️⃣ Look up the translate function, and translate UP 50 units
    translate(0, -50, 0);
    //2️⃣ Draw a cylinder with radius 10 and height 100
    fill(150, 90, 20);
    cylinder(10, 100);
    //3️⃣ Translate again, UP 90 units
    translate(0, -90, 0);
    //4️⃣ use the sphere function to draw a sphere
    fill(50, 180, 50);
    sphere();
    //5️⃣ Now look up the fill function, and make the trunk brown, and the sphere green.
}