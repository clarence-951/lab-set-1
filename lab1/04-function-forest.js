export function draw() {
    //2️⃣ Copy your code from Activity 3, but replace each block
    //of code that draws a tree with one line that calls the tree function
    tree();

    // Translate 120 units Right and 140 down
    translate(120, 140, 0);

    //Copy and paste your tree code again
    tree();

    //Translate 120 units Right and 140 down
    translate(120, 140, 0);

    //Copy and paste your tree code again
    tree();
}

function tree() {
    //1️⃣ Copy and paste your 6 lines of tree code from Activity 3.
    //(Just the code to draw ONE tree)
    translate(0, -50, 0);
    fill(150, 90, 20);
    cylinder(10, 100);
    translate(0, -90, 0);
    fill(50, 180, 50);
    sphere();
}