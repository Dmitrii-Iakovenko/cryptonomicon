const API_KEY = "22011ad9970258f25ff1167ad859166a37782ff8de3b684f78edb72dc7de0fc7";

// TODO: refactor to use URLSearhParams
export const loadTicker = tickers =>
    fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(",")}&api_key=${API_KEY}`
    ).then(response => response.json());

