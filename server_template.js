let frames = [
<<frames>>
];

let filename = "<<filename>>";
let frame_idx = 0;
let counter = 0;
let running = true;

function getName()
{
    return "<<name>>";
}

function onConnect()
{
}

function onUpdate() {
  clearScreen();
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 56; x++) {
      fillArea('█', frames[frame_idx][y][x], x, y, 1, 1);
    }
  }
  if (running) {
    if (counter == 0) {
      frame_idx++;
    }
    counter = (counter + 1) % 30;
  }
  if (!running) {
    // Draw pause button
    fillArea('█', 17, 0, 0, 1, 3);
    fillArea('█', 17, 2, 0, 1, 3);
  }
  drawText(filename, 17, 0, 19);
}

function onInput(key)
{
  if (key === 32 /* space */) {
    // Pause the video
    running = !running;
    counter = 0;
  }
  if (key === 20 /* right */ || key === 108 /*l*/) {
    // Advance a frame
    frame_idx = (frame_idx+1)%frames.length;
    counter = 0;
  }
  if (key === 19 /* left */ || key === 106 /*j*/) {
    // Go back a frame
    frame_idx -= 1;
    if (frame_idx < 0) {
      frame_idx = frames.length-1;
    }
    counter = 0;
  }
}
