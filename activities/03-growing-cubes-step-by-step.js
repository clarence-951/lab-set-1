// -------------------------------------------------------
//  Activity 03: Growing cubes — step by step
//
//  This version draws one cube at a time with a pause
//  between each one so you can watch the loop run.
//
//  Because it uses main() instead of draw(), it runs
//  once from top to bottom like a normal program.
//
//  Try setting a breakpoint inside the for loop in VSCode
//  and stepping through it one cube at a time.
// -------------------------------------------------------

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function main() {

  for (let i = 0; i < 5; i++) {

    let size = 20 + i * 20;

    push();
      translate(i * 120 - 240, 0, 0);
      box(size);
    pop();

    await sleep(600); // pause 600ms before drawing the next cube

  }

}
