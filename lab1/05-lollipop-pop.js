export function draw() {
    //This is probably what you have from activity 4, but I have
    //made each translte between trees take two steps, one back
    //to the ground, and one to the right

    tree();

    //1️⃣ Delete or comment out the next line..
    //translate(0, 140, 0);   //Translate down to ground
    translate(120, 0, 0);   //Translate right to next tree

    tree();

    //2️⃣ Delete or comment out the next line..
    //translate(0, 140, 0);   //Translate down to ground
    translate(120, 0, 0);   //Translate right to next tree

    tree();
}

function tree() {
    //3️⃣ Uncomment this line, and the pop at the bottom
    push();
    translate(0, -50, 0);
    fill(150, 90, 20);
    cylinder(10, 100);
    translate(0, -90, 0);
    fill(50, 180, 50);
    sphere();
    //3️⃣ Uncomment this line
    pop();
}