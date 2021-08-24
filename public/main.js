(function () {
    'use strict';

    const { sin, cos, PI, max, min } = Math;

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

    /**
     * Get a clean string representation of a table
     * 
     * @param table array of columns to space
     * @param sep column separator
     * @returns a string of the table properly spaced
     * 
     * @example
     * evenlySpaced([['hello', 1], ['world!', 23]])
     * >>> 'hello  :  1
     *      world! : 23' 
     */
    const evenlySpaced = (table, sep = " : ") => {
        if (table.length === 0) return

        // convert contents to strings
        table = table.map(row => row.map(String));

        let maxes = table[0].map(col => 0);
        table.forEach(row => {
            row.forEach((col, idx) => {
                maxes[idx] = max(col.length, maxes[idx]);
            });
        });

        return table.map(
            row => row.map(
                (col, idx) => col.padStart(maxes[idx])
            ).join(sep)
        ).join("\n")
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
            p.fill(50, 150);
            const t = p.frameCount / 1000;
            bubbles(t, 10).forEach(b => {
                const { center: { x, y }, r } = b;
                p.ellipse(x, y, 2 * r);
            });
        };

    };

    /**
     * Format number as pounds sterling
     */
    const pounds = new Intl.NumberFormat(
        'en-GB',
        { style: 'currency', currency: 'GBP' }
    ).format;

    /**
     * Query CoinGecko for the prices of crypto tokens
     * 
     * @async
     * @param {string[]} coins names of coins
     * @param {string} currency 
     * @returns {Promise} a promise containing the data
     */
    const fetchPrices = async (coins, currency = "gbp") => {
        const url = "https://api.coingecko.com/api/v3/simple/price"
            + `?ids=${coins.join("%2C")}&vs_currencies=${currency}`;
        const response = await fetch(url);
        return await response.json()
    };

    const startClock = (div) => {
        const format = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format;
        const now = new Date();
        div.innerText = format(now);
        setTimeout(() => startClock(div), 1000);
    };

    new p5(sketch, "sketch");
    startClock(document.getElementById("clock"));

    const coins = "ethereum cardano bitcoin";
    fetchPrices(coins.split(" ")).then(data => {
        const prices = Object.entries(data).map(e => [e[0], pounds(e[1].gbp)]);
        prices.sort();
        document.getElementById("crypto").innerHTML = `<pre>${evenlySpaced(prices)}</pre>`;
    });

}());
