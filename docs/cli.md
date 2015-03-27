#Slot CLI
Slot CLI — консольная утилита для создания и разработки приложений на фреймворке Slot.

##Как создать приложение
Перейдите в пустую папку и выполните:
```bash
$ slot init [тип приложения]
```

Доступные типы приложений:

Тип     | Описание
--------|-----------------
`basic` | Базовая заготовка для разработки на фреймворке Slot. Содержит минимальный набор файлов, сборку и структуру папок, необходимую для работы любого Slot-приложения. Выбирается по умолчанию.
`todo`  | Демо-приложение: классический TodoMVC, написанный на Slot.

##Структура папок
После выполнения `slot init` в текущей директории развернётся следующая структура папок:

Папка/файл        | Назначение
-----------------|----------
`components/`    | Папка для компонентов
`config/`        | Папка с конфигом приложения
`helpers/blocks` | Папка для блок-хелперов
`layout/`        | Папка с лэйаутом приложения
`modules/`       | Папка для модулей
`plugins/`       | Папка для плагинов
`public/`        | Папка со статикой. Её содержимое при сборке без изменений копируется в `build/public`. Например, файл `public/assets/background.png` будет доступен в приложении по урлу `/assets/background.png`.
`tasks/`         | Папка с gulp-тасками для сборки.
`vendor/`        | Папка для сторонних клиентских JS-библиотек, которые не входят в Browserify-бандл. Все файлы в этой папке и её подпапках, имеющие расширение `.js`, автоматически будут добавлены в сборку.
`app.js`         | Модуль, описывающий создание и первоначальную настройку слот-приложения как на сервере, так и на клиенте. Используется в `server.js` и `client.js`
`server.js`      | Серверное express-приложение, точка входа в Slot на стороне сервера
`client.js`      | Точка входа в Slot на стороне браузера. Инициализирует Slot-приложение по событию `document.ready`
`gulpfile.js`    | Основной файл сборки

##### Папка `config/`
Содержит файлы, описывающие конфиг приложения:

Файл             | Назначение
----------------|-----
`base.js`       | Базовый конфиг. Всегда подключается к сборке.
`production.js` | Конфиг для релиза. Подключается к приложению только в релизной сборке. Может переопределять значения, заданные в `base.js`

##### Папка `layout/`
Содержит лэйаут приложения. Лэйаут — это шаблон для главной HTML-страницы приложения. В неё помещается отрендеренный модулями HTML-контент, к ней же подключаются собранные для браузера JS-код и стили.

Файл             | Назначение
----------------|-----
`layout.html`   | Шаблон лэйаута
`layout.less`   | Общие для всего приложения стили (правила для `html` и `body`, CSS-ресеты и т. д.)

##Сборка приложений
Приложения поддерживают следующие команды сборки:

Команда&nbsp;сборки | Назначение
------------------|----------
`gulp dev`        | Сборка для разработки. Эта команда собирает приложение, запускает сервер на порту 3000, а также включает автоматическую пересборку при изменении файлов.
`gulp --release`  | Сборка для релиза. В этом режиме минифицируется JS и CSS-код.
`gulp clean`      | Очистка папки со сборкой.

Вы можете модифицировать и дополнять сборку для нужд своего приложения. Для сборки используются привычные всем [gulp](http://gulpjs.com/) и [browserify](http://browserify.org/). Задачи сборки описаны в папке `tasks/`.

##Добавление модуля в приложение
Модуль в приложение добавляется командой:
```bash
$ slot addmodule <название модуля>
```

Эта команда создаст в директории `modules/` подпапку для нового модуля и скопирует в неё заготовки файлов для шаблона, стилей и логики модуля.