
# Учебный проект по изучению Vue

Link: https://youtu.be/0MEpPU3rWCk

## Preparing for the Workplace
* Установить VSCode 
* Установить Git
* Установить npm


## Создание проекта с GitHub
git clone https://github.com/Dmitrii-Iakovenko/cryptonomicon
cd cryptonomicon
npm install
npm run dev


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



## Настройка VSCode (установить плагины):
* Git Graph
* ESLint - подсвечивает возможные ошибки
* Prettier - автоформатирование
* Vetur - подсвечивает синтаксис
* Cobalt2 Theme Official - тёмная тема
* Markdown All in One
* Tailwind CSS IntelliSense
* Vue Language Features (Volar) - рекомендует сама VSCode - **не ставим**, у него глючная подсветка svg



## Полезные ссылки
* Исходный код урока - https://gitlab.com/vuejs-club/youtube-course/cryptonomicon/-/tree/lesson1
* API для получения ключа: https://www.cryptocompare.com/


## Горячие кнопки в VSCode
Ctrl+Shift+P -> format document -> Prettier