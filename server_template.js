let frames = [
<<frames>>
];

let filename = "<<filename>>";
let frame_idx = 5;
let x = 0;
let y = 0;
let running = true;

function getName()
{
    return "<<name>>";
}

function onConnect()
{
}

function onUpdate()
{
  for (let i = 0; i < 28; i++) {
    drawText('█', frames[frame_idx][y][x], x, y);
    x++;
    if (x >= 56) {
      x = 0;
      y += 1;
      if (y >= 20) {
        y = 0;
        if (running) {
        frame_idx += 1;
          if (frame_idx > frames.length) {
            frame_idx = 0; // loop video back around
          }
        }
      }
    }
  }
  if (!running) {
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
  }
  if (key === 20 /* right */ || (key === 32 && running)) {
    // Advance a frame
    frame_idx = (frame_idx+1)%frames.length;
    y = 0;
    x = 0;
  }
  if (key === 19 /* left */) {
    // Go back a frame
    frame_idx = (frame_idx-1)%frames.length;
    y = 0;
    x = 0;
  }
}
