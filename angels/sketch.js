const canvasSketch = require('canvas-sketch');
const p5 = require('p5');

new p5()

const settings = {
  p5: true,
  animation: true,
  dimensions: 'a4',
  units: 'px',
  attributes: {
    antialias: true
  }
};

const sketch = ({width, height}) => {
  const offset = 60;
  const padding = 60;
  let xoff = 0.0;
  let yoff = 0.0;
  background('#fff');

  const columnCount = (width - offset) / padding - 1;
  const rowCount = (height - offset * 2) / padding;

  return ({ context, width, height }) => {
    background('#fff');
    for (let i = 0; i < columnCount; i++) {
      xoff = xoff + 0.1;
      for (let j = 0; j < rowCount; j++) {
        stroke('purple'); // Change the color
        strokeWeight(1);
        yoff = yoff + 0.001;
        translate(offset + padding * i, offset + padding * j)
        rotate(PI / noise(xoff, yoff))
        line(0, 0, 50, 0);
        resetMatrix();
      }
    }
  };
};

canvasSketch(sketch, settings);
