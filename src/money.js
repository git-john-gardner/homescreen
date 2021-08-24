/**
 * Format number as pounds sterling
 */
const pounds = new Intl.NumberFormat(
    'en-GB',
    { style: 'currency', currency: 'GBP' }
).format

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
        + `?ids=${coins.join("%2C")}&vs_currencies=${currency}`
    const response = await fetch(url)
    return await response.json()
}

export { pounds, fetchPrices }