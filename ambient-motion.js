const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(pointer: fine)");
const cursorLens = document.querySelector(".cursor-lens");
const neuralCanvas = document.getElementById("neuralGridCanvas");
const neuralGrid = document.querySelector(".neural-grid");
const cursorHome = cursorLens?.parentElement || null;

const GRID_SIZE = 72;
const PULSE_COUNT = 18;

let cursorAnimation = 0;
let gridAnimation = 0;
let cursorVisible = false;
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let lensX = targetX;
let lensY = targetY;
let canvasWidth = 0;
let canvasHeight = 0;
let dpr = 1;
let pulses = [];
let startTime = performance.now();

function isMotionEnabled() {
  return !reducedMotionQuery.matches;
}

function isCursorEnabled() {
  return isMotionEnabled() && finePointerQuery.matches && cursorLens;
}

function setCursorVisible(visible) {
  cursorVisible = visible && isCursorEnabled();
  cursorLens?.classList.toggle("is-visible", cursorVisible);
  document.body.classList.toggle("custom-cursor", cursorVisible);
}

function updateCursor() {
  if (!isCursorEnabled()) {
    setCursorVisible(false);
    cursorAnimation = 0;
    return;
  }

  lensX += (targetX - lensX) * 0.62;
  lensY += (targetY - lensY) * 0.62;
  cursorLens.style.transform = `translate3d(${lensX}px, ${lensY}px, 0) translate(-50%, -50%)`;
  cursorAnimation = requestAnimationFrame(updateCursor);
}

function startCursor() {
  if (isCursorEnabled() && !cursorAnimation) {
    cursorAnimation = requestAnimationFrame(updateCursor);
  }
}

function stopCursor() {
  if (cursorAnimation) {
    cancelAnimationFrame(cursorAnimation);
    cursorAnimation = 0;
  }

  setCursorVisible(false);
}

function createPulse(index) {
  const horizontal = index % 2 === 0;
  const lineCount = horizontal
    ? Math.ceil(window.innerHeight / GRID_SIZE) + 2
    : Math.ceil(window.innerWidth / GRID_SIZE) + 2;
  const line = Math.floor(Math.random() * lineCount);
  const speed = 18 + Math.random() * 24;
  const delay = Math.random() * 4200;

  return {
    horizontal,
    line,
    speed,
    delay,
    offset: Math.random(),
    length: 120 + Math.random() * 130,
    hue: index % 5 === 0 ? "warm" : index % 3 === 0 ? "lime" : "cyan",
  };
}

function resetAmbientElements() {
  pulses = Array.from({ length: PULSE_COUNT }, (_, index) => createPulse(index));
}

function resizeCanvas() {
  if (!neuralCanvas) return;

  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  neuralCanvas.width = Math.floor(canvasWidth * dpr);
  neuralCanvas.height = Math.floor(canvasHeight * dpr);
  neuralCanvas.style.width = `${canvasWidth}px`;
  neuralCanvas.style.height = `${canvasHeight}px`;
  resetAmbientElements();
}

function lineColor(type, alpha) {
  if (type === "lime") return `rgba(183, 255, 90, ${alpha})`;
  if (type === "warm") return `rgba(245, 196, 105, ${alpha})`;
  return `rgba(67, 223, 245, ${alpha})`;
}

function drawPulse(ctx, pulse, elapsed) {
  const axisLength = pulse.horizontal ? canvasWidth : canvasHeight;
  const crossLength = pulse.horizontal ? canvasHeight : canvasWidth;
  const cycleLength = axisLength + pulse.length * 2;
  const travel = ((elapsed * pulse.speed + pulse.offset * cycleLength - pulse.delay) % cycleLength + cycleLength) % cycleLength;
  const head = travel - pulse.length;
  const tail = head - pulse.length;
  const line = (pulse.line * GRID_SIZE) % (crossLength + GRID_SIZE);
  const cross = line - GRID_SIZE / 2;
  const start = Math.max(tail, -pulse.length);
  const end = Math.min(head, axisLength + pulse.length);

  if (end <= 0 || start >= axisLength) return;

  const gradient = pulse.horizontal
    ? ctx.createLinearGradient(start, cross, end, cross)
    : ctx.createLinearGradient(cross, start, cross, end);

  gradient.addColorStop(0, lineColor(pulse.hue, 0));
  gradient.addColorStop(0.52, lineColor(pulse.hue, 0.44));
  gradient.addColorStop(1, lineColor(pulse.hue, 0));

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 1.35;
  ctx.lineCap = "round";
  ctx.beginPath();

  if (pulse.horizontal) {
    ctx.moveTo(start, cross);
    ctx.lineTo(end, cross);
  } else {
    ctx.moveTo(cross, start);
    ctx.lineTo(cross, end);
  }

  ctx.stroke();
}

function drawGrid(time) {
  if (!neuralCanvas || !isMotionEnabled()) {
    gridAnimation = 0;
    return;
  }

  const ctx = neuralCanvas.getContext("2d");
  if (!ctx) return;

  const elapsed = (time - startTime) / 1000;

  ctx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);
  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.globalCompositeOperation = "lighter";

  pulses.forEach((pulse) => drawPulse(ctx, pulse, elapsed));

  ctx.restore();
  gridAnimation = requestAnimationFrame(drawGrid);
}

function startGrid() {
  if (!neuralCanvas || !neuralGrid) return;

  neuralGrid.classList.toggle("is-disabled", !isMotionEnabled());

  if (!isMotionEnabled()) {
    if (gridAnimation) cancelAnimationFrame(gridAnimation);
    gridAnimation = 0;
    return;
  }

  resizeCanvas();
  startTime = performance.now();

  if (!gridAnimation) {
    gridAnimation = requestAnimationFrame(drawGrid);
  }
}

function handleMotionChange() {
  if (isMotionEnabled()) {
    startCursor();
    startGrid();
  } else {
    stopCursor();
    startGrid();
  }
}

window.addEventListener("pointermove", (event) => {
  if (!isCursorEnabled() || event.pointerType !== "mouse") return;

  targetX = event.clientX;
  targetY = event.clientY;

  if (!cursorVisible) {
    lensX = targetX;
    lensY = targetY;
    setCursorVisible(true);
  }
}, { passive: true });

window.addEventListener("pointerleave", () => setCursorVisible(false));
window.addEventListener("blur", () => setCursorVisible(false));
window.addEventListener("resize", () => {
  if (isMotionEnabled()) resizeCanvas();
}, { passive: true });
document.addEventListener("fullscreenchange", () => {
  if (!cursorLens || !cursorHome) return;

  const fullscreenElement = document.fullscreenElement;

  if (fullscreenElement) {
    fullscreenElement.appendChild(cursorLens);
  } else {
    cursorHome.insertBefore(cursorLens, cursorHome.querySelector(".skip-link"));
  }
});

reducedMotionQuery.addEventListener("change", handleMotionChange);
finePointerQuery.addEventListener("change", handleMotionChange);

startCursor();
startGrid();
