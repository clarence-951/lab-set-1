// vec3.js

const isScalar = (s) => typeof s === 'number' && isFinite(s);
const isVec = (v) => v != null && isScalar(v.x) && isScalar(v.y) && isScalar(v.z);

const assertScalar = (s) => {
    if (!isScalar(s)) throw new TypeError(`Expected scalar, got ${JSON.stringify(s)}`);
};
const assertVec = (v) => {
    if (!isVec(v)) throw new TypeError(`Expected Vec3, got ${JSON.stringify(v)}`);
};
const assertNonZeroScalar = (s) => {
    assertScalar(s);
    if (s === 0) throw new RangeError('Division by zero');
};


export class Vec3 {
    constructor(x, y, z) {
        assertScalar(x);
        assertScalar(y);
        assertScalar(z);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Component-wise addition
    plus(v) {
        assertVec(v);
        return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    // Component-wise subtraction
    minus(v) {
        assertVec(v);
        return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    // Scalar multiplication
    times(s) {
        assertScalar(s);
        return new Vec3(this.x * s, this.y * s, this.z * s);
    }

    // Scalar division
    div(s) {
        assertNonZeroScalar(s);
        return new Vec3(this.x / s, this.y / s, this.z / s);
    }

    // Dot product — returns a scalar
    dot(v) {
        assertVec(v);
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    // Cross product — returns a vector perpendicular to both
    cross(v) {
        assertVec(v);
        return new Vec3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    // Euclidean length
    mag() {
        return Math.sqrt(this.dot(this));
    }

    // Unit vector in the same direction — throws if the vector has no length
    normalized() {
        const m = this.mag();
        if (m === 0) throw new RangeError('Cannot normalize a zero-length vector');
        return this.div(m);
    }

    // Convenience for passing to P5 functions: translate(...position.toArray())
    toArray() {
        return [this.x, this.y, this.z];
    }
}

// Named export for modules that import explicitly
export const vector = (x, y, z) => new Vec3(x, y, z);

// Global injection — mirrors how P5 populates window.createVector etc.
// Import this module once in your scaffolding and student code gets vector() for free.
if (typeof window !== 'undefined') {
    window.vector = vector;
}