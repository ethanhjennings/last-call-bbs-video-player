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
  drawText(filename, 17, 0, 19);
}

function onUpdate()
{
  // Draw in chunks of 28 pixels at a time so that they have time to display
  for (let i = 0; i < 28; i++) {
    drawText('█', frames[frame_idx][y][x], x, y);
    x++;
  }

  // Advance rows and frames as needed
  if (x >= 56) {
    x = 0;
    y += 1;
    if (y >= 20) {
      y = 0;
      if (running) {
      frame_idx += 1;
        if (frame_idx > frames.length) {
          // Loop video at the end
          frame_idx = 0;
        }
      }
    }
  }

  if (!running) {
    // Pause button
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
  if (key === 20 /* right */ || (key === 32 && running) /* video resumed */) {
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
