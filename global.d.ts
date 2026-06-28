/// <reference types="p5" />

// Force inclusion of p5's WEBGL/3D APIs into global mode
import 'p5/global';

declare global {
  const WEBGL: any;
  function sleep(milliSeconds: number): void;

  class Vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    plus(v: Vec3): Vec3;
    minus(v: Vec3): Vec3;
    times(s: number): Vec3;
    div(s: number): Vec3;
    dot(v: Vec3): number;
    cross(v: Vec3): Vec3;
    mag(): number;
    normalized(): Vec3;
    toArray(): [number, number, number];
  }

  function vector(x: number, y: number, z: number): Vec3;
}