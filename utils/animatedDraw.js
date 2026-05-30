import StackTracey from 'stacktracey';
import * as Buffer from 'buffer';
import * as WI from './workspaceIntegration';
import { drawAxes } from './axes';
import {label3D } from './textLabel';
window.Buffer = Buffer.Buffer;

document.querySelector('#animatedDrawControls').style.display = 'block';

const pauseException = { "pauseException": true };
let frameCount = 0;
let frameLimit = 0;
let checkpointCount = 0;
let checkpointLimit = 0;

let currentSourceLineSpan = document.querySelector('#currentSourceLine');

let animateSpeedInput = document.querySelector('#animateSpeed');
const savedSpeed = localStorage.getItem('animateSpeed') || 1;
animateSpeedInput.value = savedSpeed;
animateSpeedInput.addEventListener('change', async (event) => {
    localStorage.setItem('animateSpeed', event.target.value);
});

let stepButton = document.querySelector('#animateStep');
stepButton.addEventListener('click', function stepClick() {
    checkpointLimit++;
    console.log("CP Lim", checkpointLimit, "CP Count", checkpointCount);
});

animateSpeedInput.addEventListener('mousedown', e => e.stopPropagation());
animateSpeedInput.addEventListener('mouseup', e => e.stopPropagation());
animateSpeedInput.addEventListener('mousemove', e => e.stopPropagation());

function checkpoint() {
    checkpointCount++;
}

function pause(frames = 1) {
    let speed = parseInt(animateSpeedInput.value);
    if (speed == 0) {
        if (checkpointCount < checkpointLimit) {
            speed = 5;
        } 
    } else {
        checkpointLimit = checkpointCount;
    }
    for (let i = 0; i < frames; i++) {
        frameCount++;
        if (frameCount >= frameLimit) {
            frameCount = 0;
            checkpointCount = 0;
            frameLimit += speed;
            pauseException.stack = new StackTracey();
            throw pauseException;
        }
    }
}

function smoothstep(t) {
    let s = t * t * (3 - 2 * t);
    return Math.pow(s, 2);  // increase exponent for stronger ease
}

let funcNames = ["translate", "rotateX", "rotateY", "rotateZ", "cylinder", "sphere", "scale", "push", "pop", "fill"];
let oldFuncs = {};
function wrap() {
    for (let name of funcNames) {
        let oldFunc = window[name];
        oldFuncs[name] = oldFunc;
        switch (name) {
            case "translate":
            case "rotateX":
            case "rotateY":
            case "rotateZ":
                window[name] = function (...p) {
                    let s = 75;
                    for (let i = 0; i < s; i++) {
                        let t = smoothstep((i + 1) / s);
                        let prev = smoothstep(i / s);
                        let delta = t - prev;          // just this step's contribution
                        oldFunc(...p.map(v => v * delta));
                        pause(1);
                    }
                    checkpoint();
                }
                break;

            case "scale":
                window[name] = function (...p) {
                    let s = 50;
                    for (let i = 0; i < s; i++) {
                        let t = smoothstep((i + 1) / s);
                        oldFuncs.push();
                        oldFunc(...p.map(v => 1 + (v - 1) * t));
                        pause(1);
                        oldFuncs.pop();
                    }
                    oldFunc(...p);
                    checkpoint();
                }
                break;

            case "push":
                window[name] = function () {
                    oldFunc();
                    stack.push([..._renderer.uModelMatrix.mat4]);
                    pause(10);
                    checkpoint();
                }
                break;
            case "pop":
                window[name] = function () {
                    for (let i = 0; i < 50; i++) {
                        pause(1);
                    }
                    oldFunc();
                    stack.pop();
                    pause(10);
                    checkpoint();
                }
                break;
            default:
                window[name] = function (...args) {
                    pause(20);
                    oldFunc(...args);
                    pause(40);
                    checkpoint();
                }
                break;
        }

    }
}

function unwrap() {
    for (const [name, f] of Object.entries(oldFuncs)) {
        window[name] = f;
    }
    oldFuncs = {};
}

let stack = [];
let lastHighlight = "";
export function drawWithPause(drawFunc) {
    if (animateSpeedInput.value == animateSpeedInput.max) {
        drawFunc();
        return;
    }
    try {
        wrap();
        stack = [];
        frameCount = 0;
        drawFunc();
        pause(100);
        frameLimit = 0;
        checkpointLimit = 0;
        currentSourceLineSpan.innerText = "";
        unwrap();
    } catch (e) {
        unwrap();
        drawAxes();
        while (stack.length) {
            resetMatrix();
            applyMatrix(...stack.pop());
            drawAxes(alpha = 64);
        }
        if (e == pauseException) {
            for (let frame of e.stack.items) {
                if (frame.fileRelative.match(/lab[0-9]+\/[0-9]+/)) {
                    //console.log(frame.file, frame.line)
                    frame = e.stack.withSource(frame);
                    let newHighlight = `${frame.fileRelative}: ${frame.line}`;
                    if (newHighlight != lastHighlight) {
                        currentSourceLineSpan.innerText = frame.sourceLine;
                        let s = e.stack.items.filter(f => f.fileRelative.startsWith(frame.fileRelative));
                        s = s.map(f => ({ file: frame.fileRelative, line: f.line }));
                        WI.highlight(s);
                        lastHighlight = newHighlight;
                    }
                    break;
                }
            }
            return;
        } else {
            throw e;
        }
    } finally {

    }
}