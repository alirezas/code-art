const padding = 10;
const gap = 10;
const vFractionCount = 3;
const hFractionCount = 4;

function setup() {
  createCanvas(800, 600);
  noLoop();
  const rectLines = [
    // top
    {
      x1: padding,
      y1: padding,
      x2: width - padding,
      y2: padding,
    },
    // right
    {
      x1: width - padding,
      y1: padding,
      x2: width - padding,
      y2: height - padding,
    },
    // bottom
    {
      x1: padding,
      y1: height - padding,
      x2: width - padding,
      y2: height - padding,
    },
    // left
    {
      x1: padding,
      y1: padding,
      x2: padding,
      y2: height - padding,
    },
  ];

  const cutterVLines = [];
  for (let i = 1; i <= vFractionCount; i++) {
    const [l1, l2] = vLineGenerator(width, height, gap, vFractionCount, i);
    cutterVLines.push(l1);
    cutterVLines.push(l2);
  }

  const cutterHLines = [];
  for (let i = 1; i <= hFractionCount; i++) {
    const [l1, l2] = hLineGenerator(width, height, gap, hFractionCount, i);
    cutterHLines.push(l1);
    cutterHLines.push(l2);
  }

  noFill();
  strokeWeight(4);
  for (let i = 0; i < hFractionCount + 1; i++) {
    for (let j = 0; j < vFractionCount + 1; j++) {
      stroke(random(255), random(255), random(255));
      const hIndex = i % (hFractionCount + 1);
      const vIndex = j % (vFractionCount + 1);

      const leftIndex = vIndex === 0 ? null : vIndex * 2 - 1;
      const topIndex = hIndex === 0 ? null : hIndex * 2 - 1;

      const t = topIndex ? cutterHLines[topIndex] : rectLines[0];
      const r =
        vIndex === vFractionCount ? rectLines[1] : cutterVLines[vIndex * 2];
      const b =
        hIndex === hFractionCount ? rectLines[2] : cutterHLines[hIndex * 2];
      const l = leftIndex ? cutterVLines[leftIndex] : rectLines[3];

      beginShape();
      vertex(findIntersection(t, l).x, findIntersection(t, l).y);
      vertex(findIntersection(l, b).x, findIntersection(l, b).y);
      vertex(findIntersection(b, r).x, findIntersection(b, r).y);
      vertex(findIntersection(r, t).x, findIntersection(r, t).y);
      vertex(findIntersection(t, l).x, findIntersection(t, l).y);
      endShape();
    }
  }
}

function vLineGenerator(width, height, gap, fractionCount, index) {
  let x1 = random(
    (width / fractionCount) * (index - 1),
    (width / fractionCount) * index
  );
  let xc1 = x1 + gap;
  while (xc1 >= width - padding) {
    x1 = random(
      (width / fractionCount) * (index - 1),
      (width / fractionCount) * index
    );
    xc1 = x1 + gap;
  }
  let x2 = random(
    (width / fractionCount) * (index - 1),
    (width / fractionCount) * index
  );
  let xc2 = x2 + gap;
  while (xc2 >= width - padding) {
    x2 = random(
      (width / fractionCount) * (index - 1),
      (width / fractionCount) * index
    );
    xc2 = x2 + gap;
  }

  return [
    {
      x1,
      y1: 0,
      x2,
      y2: height,
    },
    {
      x1: xc1,
      y1: 0,
      x2: xc2,
      y2: height,
    },
  ];
}

function hLineGenerator(width, height, gap, fractionCount, index) {
  let y1 = random(
    (height / fractionCount) * (index - 1),
    (height / fractionCount) * index
  );
  let yc1 = y1 + gap;
  while (yc1 >= height - padding) {
    y1 = random(
      (height / fractionCount) * (index - 1),
      (height / fractionCount) * index
    );
    yc1 = y1 + gap;
  }
  let y2 = random(
    (height / fractionCount) * (index - 1),
    (height / fractionCount) * index
  );
  let yc2 = y2 + gap;
  while (yc2 >= height - padding) {
    y2 = random(
      (height / fractionCount) * (index - 1),
      (height / fractionCount) * index
    );
    yc2 = y2 + gap;
  }

  return [
    {
      x1: 0,
      y1,
      x2: width,
      y2,
    },
    {
      x1: 0,
      y1: yc1,
      x2: width,
      y2: yc2,
    },
  ];
}

function findIntersection(line1, line2) {
  let x1 = line1.x1,
    y1 = line1.y1;
  let x2 = line1.x2,
    y2 = line1.y2;
  let x3 = line2.x1,
    y3 = line2.y1;
  let x4 = line2.x2,
    y4 = line2.y2;

  // Calculate the intersection point using determinants
  let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  let px =
    ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
    denominator;
  let py =
    ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
    denominator;

  return { x: px, y: py };
}
