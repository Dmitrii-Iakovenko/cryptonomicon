const API_KEY = "22011ad9970258f25ff1167ad859166a37782ff8de3b684f78edb72dc7de0fc7";

const tickersHandlers = new Map();


// TODO: refactor to use URLSearhParams
const loadTickers = () => {
    if (tickersHandlers.size === 0) {
        return;
    }

    fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${
            [...tickersHandlers.keys()]
            .join(",")
            }&tsyms=USD&api_key=${API_KEY}`
        )
        .then(response => response.json())
        .then(rawData => {
            const updatedPrices = Object.fromEntries(
                Object.entries(rawData).map(([key, value]) => [key, value.USD])
            );

            Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
                const handlers = tickersHandlers.get(currency) ?? [];
                handlers.forEach(fn => fn(newPrice));
            });
        });
};

export const subscribeToTicker = (ticker, callback) => {
    const subscribers = tickersHandlers.get(ticker) || [];
    tickersHandlers.set(ticker, [...subscribers, callback]);
}

export const unsubscribeFromTicker = (ticker) => {
    tickersHandlers.delete(ticker);
    // const subscribers = tickersHandlers.get(ticker) || [];
    // tickersHandlers.set(ticker, subscribers.filter(fn => fn !== cb));
}


setInterval(loadTickers, 5000);

window.tickers = tickersHandlers;