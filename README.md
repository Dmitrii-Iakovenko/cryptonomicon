
# Учебный проект по изучению Vue

Link: https://youtu.be/0MEpPU3rWCk

---
## Preparing for the Workplace
* Установить VSCode 
* Установить Git
* Установить npm

---
## Создание проекта с GitHub
```bush
git clone https://github.com/Dmitrii-Iakovenko/cryptonomicon
cd cryptonomicon
npm install
npm run dev
```

---
## Создание проекта с нуля
```bush
npm create vite@latest cryptonomicon -- --template vue
cd cryptonomicon
npm install 
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install -D @tailwindcss/forms
npm run dev
```


---
## Настройка VSCode (установить плагины):
* Volar - рекомендуемый плагин для Vue3 и Vite
* Vetur - не ставим, это для Vue2
* Git Graph 
* ESLint - подсвечивает возможные ошибки
* Prettier - автоформатирование (не ставим, всё ломает)
* Vetur - подсвечивает синтаксис
* Cobalt2 Theme Official - тёмная тема
* Markdown All in One
* Tailwind CSS IntelliSense


---
## HomeWork-02:

[video](https://youtu.be/DBTNTNIPrx8)

### Задание:
```
1) если тикер не удалось добавить - чтобы выводилась красным bg-white => bg-red-100
   валидность тикера проверять по 500 ошибке в websocket
   добавляем монетку, как пришло 500 - красим в красный цвет
   BTCD - для примера
2) для тикеров не имеющих примого курса, например, BTCD-USD
   высчитывать курс из цепочки BTCD-BTC-USD
   для фронта это должно быть прозрачно
   если кросс курса с BTC нет - то 500 ошибка и красное
3) возможность работать на нескольких вкладках (Shared Worker)
```

### Материалы к 3 заданию:
* https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker
* https://habr.com/ru/post/261307/
* https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
* https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API


---
## Полезные ссылки
* Исходный код урока - https://gitlab.com/vuejs-club/youtube-course/cryptonomicon/-/tree/lesson1
* API для получения ключа: https://www.cryptocompare.com/


## Горячие кнопки в VSCode
Ctrl+Shift+P -> format document -> Prettier