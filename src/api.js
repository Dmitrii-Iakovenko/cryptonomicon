const API_KEY = "22011ad9970258f25ff1167ad859166a37782ff8de3b684f78edb72dc7de0fc7";

// TODO: refactor to use URLSearhParams
export const loadTickers = tickers =>
    fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers.join(",")}&tsyms=USD&api_key=${API_KEY}`
        )
        .then(response => response.json())
        .then(rawData => 
            Object.fromEntries(
                Object.entries(rawData).map(([key, value]) => [key, value.USD])
            )
        );

