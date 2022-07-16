const API_KEY = "22011ad9970258f25ff1167ad859166a37782ff8de3b684f78edb72dc7de0fc7";


const tickersHandlers = new Map();

const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);

const AGGREGATE_INDEX = "5";

socket.addEventListener('message', e => {
    const { TYPE: type, FROMSYMBOL: currency, 
        PRICE: newPrice, PARAMETER: parameter, MESSAGE: message } = JSON.parse(e.data);

    if (type === "500" && message === "INVALID_SUB") {
        const currencyHasError = [...tickersHandlers.keys()]
            .filter(ticker => `5~CCCAGG~${ticker}~USD` === parameter);
        const handlers = tickersHandlers.get(currencyHasError[0]) ?? [];
        handlers.forEach(fn => fn(undefined, true));
        return;
    }

    if (type !== AGGREGATE_INDEX || newPrice === undefined) {
        return;
    }
    const handlers = tickersHandlers.get(currency) ?? [];
    handlers.forEach(fn => fn(newPrice, false));
});

function sendToWebSocket(message) {
    const stringifiedMessage = JSON.stringify(message);

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(stringifiedMessage);
        return;
    }

    socket.addEventListener(
        'open', 
        () => {
            socket.send(stringifiedMessage);
        }, 
        { once: true }
    );
}

function subscribeToTickerOnWebSocket(ticker) {
    sendToWebSocket({
        "action": "SubAdd",
        "subs": [`5~CCCAGG~${ticker}~USD`]        
    });
}

function unsubscribeFromTickerOnWebSocket(ticker) {
    sendToWebSocket({
        "action": "SubRemove",
        "subs": [`5~CCCAGG~${ticker}~USD`]
    });
}

export const subscribeToTicker = (ticker, callback) => {
    const subscribers = tickersHandlers.get(ticker) || [];
    tickersHandlers.set(ticker, [...subscribers, callback]);
    subscribeToTickerOnWebSocket(ticker);
}

export const unsubscribeFromTicker = (ticker) => {
    unsubscribeFromTickerOnWebSocket(ticker);
    tickersHandlers.delete(ticker);
    // const subscribers = tickersHandlers.get(ticker) || [];
    // tickersHandlers.set(ticker, subscribers.filter(fn => fn !== cb));
}


window.tickers = tickersHandlers;