import { evenlySpaced } from "./helpers";
import { sketch } from "./sketch"
import { fetchPrices, pounds } from "./money";

const startClock = (div) => {
    const format = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format
    const now = new Date();
    div.innerText = format(now);
    setTimeout(() => startClock(div), 1000)
}

const myp5 = new p5(sketch, "sketch")
startClock(document.getElementById("clock"))

const coins = "ethereum cardano bitcoin"
fetchPrices(coins.split(" ")).then(data => {
    const prices = Object.entries(data).map(e => [e[0], pounds(e[1].gbp)])
    prices.sort()
    document.getElementById("crypto").innerHTML = `<pre>${evenlySpaced(prices)}</pre>`
})