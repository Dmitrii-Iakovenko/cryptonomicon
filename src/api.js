const API_KEY = "22011ad9970258f25ff1167ad859166a37782ff8de3b684f78edb72dc7de0fc7";


const tickersHandlers = new Map();

const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);

const AGGREGATE_INDEX = "5";

socket.addEventListener('message', e => {
    // const messageContent = JSON.parse(e.data);
    const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice } = JSON.parse(e.data);
    if (type !== AGGREGATE_INDEX) {
        return;
    }
    const handlers = tickersHandlers.get(currency) ?? [];
    handlers.forEach(fn => fn(newPrice));
});

// Заменили получение цен по API по таймеру на обновление через WebSocket
// TODO: refactor to use URLSearhParams
// const loadTickers = () => {
//     if (tickersHandlers.size === 0) {
//         return;
//     }

//     fetch(
//         `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${
//             [...tickersHandlers.keys()]
//             .join(",")
//             }&tsyms=USD&api_key=${API_KEY}`
//         )
//         .then(response => response.json())
//         .then(rawData => {
//             const updatedPrices = Object.fromEntries(
//                 Object.entries(rawData).map(([key, value]) => [key, value.USD])
//             );

//             Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
//                 const handlers = tickersHandlers.get(currency) ?? [];
//                 handlers.forEach(fn => fn(newPrice));
//             });
//         });
// };
// 
// setInterval(loadTickers, 5000);



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