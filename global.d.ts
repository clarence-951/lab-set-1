/// <reference types="p5" />

// Force inclusion of p5's WEBGL/3D APIs into global mode
import 'p5/global';

declare global {
  const WEBGL: any;
}