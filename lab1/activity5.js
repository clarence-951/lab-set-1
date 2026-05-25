import * as activity from "./05-lollipop-pop.js";
import { drawAxes } from "@/utils/axes.js";
import { drawGrid } from "@/utils/grid.js";
import { drawWithPause } from "@/utils/animatedDraw.js";
import { demoMode } from "@/utils/demoMode";

export function setup() {
    camera(300, -200, 700);
}

export function draw(t) {
    orbitControl();
    background(30);
    ambientLight(80);
    directionalLight(255, 255, 255, 1, 1, -1);
    drawGrid();
    noStroke();
    drawWithPause(demoMode ? demo : activity.draw);
}

function tree() {
    translate(0, -50, 0);
    fill(150, 90, 20);
    cylinder(10, 100);
    translate(0, -90, 0);
    fill(50, 180, 50);
    sphere();
}

function demo() {
    tree();

    translate(120, 140, 0);

    tree();

    translate(120, 140, 0);

    tree();
}