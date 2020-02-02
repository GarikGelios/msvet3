# msvet3

## Глобальное окружение

- Windiws 10 Pro
- Node.JS v10.16.3
- Генератор приложений Express ``npm install express-generator -g``


## Система контроля версий

- создал репо на GitHub
- клонировал репо на локаль, использовал SourthTree ``git@github.com:GarikGelios/msvet3.git``
- создал файл .gitignore
```
# Исключил директории:
/node_modules/*
node_modules/*
/.idea/*
.idea/*
tmp/

# и файлы
node_modules
.env
.htaccess
access.md
```

## Проектное окружения

- сгенерировали приложение ``express --view=ejs --css=sass``
- установили зависимости ``npm install``
- запустили сервер ``SET DEBUG=msvet3:* & npm start`` ← запускал отдельно иначе ошибка амперсанда
- локально запустилось, всё работает по localhost:3000 , остановили сервер ctrl+C
- для автоперезагрузки сервера во время разработки, установил демона ``npm install --save-dev nodemon``
- в package.json добавили команду "devstart": "nodemon ./bin/www"
- запустили сервер с демоном ``SET DEBUG=msvet3:* & npm run devstart`` ← запускал отдельно иначе ошибка амперсанда

- установил для разработки фреймворк ``npm install bootstrap -D``
- подключил стили фреймворка в файл style.sass ``@import "node_modules/bootstrap/scss/bootstrap.scss";``
- установил Jquery ``npm install jquery``
- добавляем пути js из папки node_modules в файл app.js
```
app.use('/libs', express.static(__dirname + '/node_modules')); // редирект для js модулей
```
- подключаем скрипты Bootstrap и JQuery
```
<script src="/libs/jquery/dist/jquery.min.js"></script>
<script src="/libs/bootstrap/dist/js/bootstrap.min.js"></script>
```

## Макет
- colors: https://colorscheme.ru/#2r21TinnZw0w0 #88B04B *PANTONE Color of the Year 2017*
- icons: FortAwesome``npm install --save @fortawesome/fontawesome-free``


