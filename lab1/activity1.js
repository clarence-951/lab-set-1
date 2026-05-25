import * as activity from "./01-single-cube";
export * from "./01-single-cube";
import { drawAxes } from "@/utils/axes.js";
import { drawGrid } from "@/utils/grid.js";
import { demoMode } from "@/utils/demoMode.js";

export function setup() {
    camera(300, -300, 700);
}

export function draw(t) {
    orbitControl();
    background(30);
    ambientLight(80);
    directionalLight(255, 255, 255, 1, 1, -1);
    drawAxes();
    drawGrid();
    stroke(0);
    if (demoMode)
        demo();
    else
        activity.draw();
}

function demo() {
    box();
}
