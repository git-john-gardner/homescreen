import { createNThings, pointOnCircle } from './helpers.js'

const sketch = function (p) {

    function bubbles(t, N) {
        const scale = 1;
        const bubble = (i) => {
            const { x, y } = pointOnCircle(t + i / N, scale)
            return {
                // center: createVector(mouseX, mouseY), 
                center: p.createVector(
                    p.noise(x, y, i) * p.width,
                    p.noise(i, x, y) * p.height
                ),
                r: 20 + 70 * p.noise(i, t)
            };
        };

        return createNThings(N, bubble)
    }

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    }

    // full screening will change the size of the canvas
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = function () {
        p.background(255, 250, 255);
        p.noStroke()
        p.fill(50, 200)
        const t = p.frameCount / 600
        bubbles(t, 5).forEach(b => {
            const { center: { x, y }, r } = b
            p.ellipse(x, y, 2 * r)
        })
    }

}

const myp5 = new p5(sketch)