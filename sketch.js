// import { createNThings } from './helpers.js'

function bubbles(t, N) {
    t = t % 1
    const scale = 0.5;
    const bubble = (i) => {
        const pointoncircle = [scale * sin((t + i / N) * 2 * PI), scale * cos((t + i / N) * 2 * PI)]
        return {
            // center: createVector(mouseX, mouseY), 
            center: createVector(noise(...pointoncircle, i + i / N) * width, noise(i + i / N, ...pointoncircle) * height),
            r: 20 + 70 * noise(i)
        };
    };

    return createNThings(N, bubble)
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

// full screening will change the size of the canvas
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255, 250, 255);
    noStroke()
    fill(50, 200)
    const t = frameCount / 400
    bubbles(t, 5).forEach(b => {
        const { center: { x, y }, r } = b
        ellipse(x, y, 2 * r)
    })
}