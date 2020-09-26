let symmetry = 5;
let angle = 360/symmetry;
let saveBtn, clearBtn, colorPick, brushSizeSlider, sizeSlider;
let backColor;

function setup(){
    let myCanvas = createCanvas(windowWidth, windowHeight - 100);
    myCanvas.parent('#sketch');

    angleMode(DEGREES);

    //set background color
    backColor = color('#010326');
    background(backColor);

    colorPick = createColorPicker('#FFFFFF'); //line color picker

    brushSizeSlider = createButton('brush size');
    sizeSlider = createSlider(0.25, 20, 1, 0.5); //brush size slider, (min, max, value, step)

    //creating the save button for the file
    saveBtn = createButton('save');
    saveBtn.position(10,windowHeight - 50);
    saveBtn.mousePressed(saveFile);

    //creating the clear screen button
    clearBtn = createButton('clear');
    clearBtn.position(60,windowHeight - 50);
    clearBtn.mousePressed(clearScreen);

}

function draw(){
    translate(width / 2, height / 2); //draw in center of canvas

    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) { //only look inside the canvas area for mouse
        let mx = mouseX - width / 2;
        let my = mouseY - height / 2;
        let pmx = pmouseX - width / 2; // mouse x position in previous frame
        let pmy = pmouseY - height / 2; // mouse y position in previous frame

        if (mouseIsPressed) {
            for (let i = 0; i < symmetry; i++) {
                rotate(angle);

                let sc = colorPick.color();
                sc.setAlpha(60);
                stroke(sc);

                let sw = sizeSlider.value();
                strokeWeight(sw);

                // where the magic happens
                line(mx, my, pmx, pmy); //line(x1, y1, x2, y2)

                //start a NEW drawing state
                push();
                scale(1, -1); //mirror on y-axis
                line(mx, my, pmx, pmy); //draw new line that is mirrored along the drawing line

                pop(); //restore the previous drawing style settings for beginning of loop
            }
        }
    }
}

// resize window function
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// save file function
function saveFile() {
    save('kaleidoscope.jpg');
}

// clear screen
function clearScreen() {
    background('#010326');
}
