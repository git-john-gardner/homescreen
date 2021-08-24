(function () {
    'use strict';

    const { sin, cos, PI } = Math;

    /**  
    * Create an array of n objects
    *
    * @param n the number of things to create
    * @param thing a function that takes an index and returns an object
    * @return an array of the n created objects
    */
    const createNThings = (n, thing) => {
        return new Array(n).fill(0).map((val, idx) => thing(idx));
    };

    /**
     * Get a point on a circle centered at [0, 0]
     * 
     * @param {number} turns angle in turns
     * @param {number} r radius of circle
     * @returns an [x, y] point on the circle centered at [0, 0]
     */
    const pointOnCircle = (turns, r = 1) => {
        return {
            x: r * sin(turns * 2 * PI),
            y: r * cos(turns * 2 * PI)
        }
    };

    const sketch = function (p) {

        function bubbles(t, N) {
            const scale = 1;
            const bubble = (i) => {
                const { x, y } = pointOnCircle(t + i / N, scale);
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
        };

        // full screening will change the size of the canvas
        p.windowResized = function () {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        p.draw = function () {
            p.background(255, 250, 255);
            p.noStroke();
            p.fill(50, 200);
            const t = p.frameCount / 600;
            bubbles(t, 5).forEach(b => {
                const { center: { x, y }, r } = b;
                p.ellipse(x, y, 2 * r);
            });
        };

    };

    new p5(sketch);

}());
