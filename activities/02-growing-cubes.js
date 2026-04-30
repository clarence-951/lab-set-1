// -------------------------------------------------------
//  Activity 02: Growing cubes with a for loop
//
//  Concepts covered:
//    - for loops
//    - translate() to position shapes
//    - push() / pop() to isolate transforms
// -------------------------------------------------------

export function draw() {

  for (let i = 0; i < 5; i++) {

    // Size grows with each step: 20, 40, 60, 80, 100
    let size = 20 + i * 20;

    // push() saves the current position.
    // pop() restores it when we're done with this cube.
    push();
      translate(i * 120 - 240, 0, 0);
      box(size);
    pop();

  }

}
