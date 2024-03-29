# movies-explorer-frontend

## Приложение "Моя коллекция фильмов"

Одностраничное браузерное приложение на `ReactJS` для сервиса, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

Проект является выпускной работой на факультете `Веб-разработки` ЯПрактикума, и как результат `100 баллов из 100` после 3ей проверки.

Репозиторий [backend-api](https://github.com/CyrilLaz/movies-explorer-api).

---

### Страницы:

- `'/'` - страница «О проекте», представляющая проект и его автора;
- `'/movies'` - страница поиска фильмов в базе фильмов с возможностью сохранения отдельных тайтлов у себя в коллекции;
- `'/saved-movies'` - страница демонстрирующая тайтлы в коллекции у пользователя, с возможностью поиска по коллекции;
- `'/profile'` - страница, где пользователь может поменять свои данные `email` & `name`, и осуществить выход из учетной записи;
- `'/signup'` - страницы регистрации с полями для ввода имени, почты и пароля;
- `'/signin'` - страницы авторизациис полями для ввода почты и пароля.
----

### Особенности приложения:

- адаптивная верстка для экранов `1280px - 320px`;
- на ширине экрана `<= 800px` навигация по приложению осуществляется через выезжающее меню;
- для вывода ошибок при работе с API сверстано модальное окно.
- скролл-бар скрыт, для перемещения на верх страницы есть функциональная кнопка перемещения;
- на странице поиска подача результата поиска осуществляется постепенно по нажатию кнопки `Еще`. Параметры подачи зависят от размера окна. Для этого функционала сделан отдельный хук;
- результат поиска, как и параметр показа короткометражек сохраняется в `localStore`. При перезагрузке и возвращении на страницу отображается результат прошлого поиска;
- сохранение фильма в коллекцию происходит при нажатии на кнопку сердца на странице поиска, повторное нажатие удаляет из коллекции.

### Особенности разработки:

- вспоминаю забытые темы html и css;
- учусь с нуля разрабатывать приложение на `ReactJS`;
- знакомлюсь с особенностями обновленного для меня `react-router-dom v6` (нам давалась 4я версия);
- успешно запутываю пропсы между компонентами;
- создаю хуки направо-налево.

---

### Файловая структура:
Компоненты проекта находятся в папке `components`. Для каждого из компонентов создана отдельная директория с файлами JSX и CSS.\
Имеется папка `hooks` для кастомных хуков и `constants`, где хранятся данные приложения. Изображения для верстки находятся в `images`.

### Развернуть?
- `npm run start` - запускает локальную версию приложения;
- `npm run build` - компилирует сборку для отправки на сервер;

---

### Чего можно замутить еще...
- убрать возможность дублировать запрос на сохранение и удаление фильма при отправке запроса.

### [макет в ОБЛАКЕ](https://disk.yandex.ru/d/MFfNa1KunMQ8-w)
### [ссылка на приложение](https://movie.klazar.online/)
