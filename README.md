Доступ в приложение:
Логин — kode@kode.ru
Пароль — Enk0deng
OTP в консоли

<h2> 1. Декомпозиция: </h2>
Я ставил себе последовательные задачи на день, в самом низу представлены итоги за день, здесь попробую кратно подитожить 
1) Написание общего хука для запросов на сервер
2) Получение /cards с сервера и вывод на страницу
3) Создание базовых селектов(изначально просто вывод списка types и subtypes на страницу)
4) Запросы с определенными параметрами при клике на элементы селектов
5) Создание пагинации и ограниченный вывод данных на страницу
6) Добавления фильтра для селектов(инпут, вводя данные в который, будут фильтроваться элементы списка, удовлетворяющие запросу)
7) Авторизация(создание формы, получение данных с формы, отправка на сервер)
8) Т.к. сервера нет, написал имитацию запросов на сервер
9) Написал ОТП. Так же с имитацией запроса, без валидации, сам отп отображаю в консоли
10) Создание контекста пользователя для доступа к пользователю из любой части приложения
11) Сохранение токена пользователя в localstorage
12) Правильная настрока роутинга
13) Создание дополнительных не обязательных компонентов, по типу лоадера
Это примерный список, при личной встрече могу более подробно описать ход мыслей при написании определенного компонента

<h2> 2. Трудности </h2>
Были небольшие трудности с роутами, решились они просто, возникли из-за незнания, но почитав форумы разобрался с ней за 30 минут
Самая большая трудность возникла из-за селектов. Очень не хотел писать логику селектов внутри страницы, хотел ее вынести наружу. 
Но по итогу логика селектов и логика карточек тестно связана и удобнее всего это было реализовать на одной странице. 
Тут гуглить не получалось, я изначально закладывал другую логику в селекты, поэтому пришлось переписать. Не исключаю, что первое решение было в корне не верным и не гибким
Некоторые неудобства с api, лично для себя хотел реализовать ветку эволюции покемонов, но api отдает имя, а не id

<h2> 3. Что сделано из задач со звёздочкой </h2>
 Компонент «Селект категорий» написан самостоятельно.  +
 Пагинация карточек.  +
 Любые анимации интерфейса - (не успел, посчитал не критично важным) -
 Быстрый просмотр покемона в модальном окне по клику на карточку (просто не успел) -
 Сохранение сессии авторизованного пользователя после закрытия вкладки браузера. Например, через local storage браузера +
 Адаптивный дизайн (Ui весь на bootstrap, свои стили дописывал через style={{}} в самих компонентах довольно редко) +


Задачи по дням (все время указано очень примерно, делал задание в перерывах между текущей работой и в свободное время):

День 1:
Создал базовый скелет приложения, написал кастомных хук useFetch для запросов на сервер, получил посты, примитивно отобразил на главной странице. Время примерно 2 часа

День 2:
Создал селекты, детальную страницу карточки, отобразил все без верстки. Немного потерял время на выводе данных из селектов на страницу и построении правильных get запросов, есть повторяющийся код, который необходимо убрать. Селекты необходимо допилить, чтобы была возможность сортировки по type + subtype, пока идет отдельно. На все потратил часа 4

День 3:
Немного изменена работа хука useFetch, создана пагинация, ее необходимо будет доработать, вариант не окончательный. На все примерно часа 3
(upd) Пагинация доработана за час

День 4:
Исправлена ошибка в компоненте пагинации, добавлен базовый ui, добавлен фильтр для селектов

День 5:
Написан черновой компонент авторизации
Проведен небольшой рефакторинг некоторых компонентов
Изменен ui всех компонентов для показа loading
Доработан ui детальной карточки

Столкнулся с трудностью реализации двух идей

1. Реализация перехода из детальной карточки на страницу покемона из которого произошла эволюция
   Сложность реализации состоит в том, что api возвращает имя покемона, а не id. Карточек с одинаковым именем бывает много.
   Реализовать не получится
2. Выбор в селектах одновременно типа и подтипа. Текущая логика компонента написана так, что это исключается. Придется переписывать, если останется время и будет идея

Все это примерно за 4-5 часов

День 6:
Переделана авторизация, добавил имитацию запроса на сервер
Изменены условия для роутов, вставил проверку авторизации пользователя на другие страницы, вместо общей проверки на роутах для редиректов
Добавлена OTP авторизация, так же с имитацией запроса на сервер

Столкнулся с проблемой правильного построения роутов при определенных условиях. CurrentUserContext возвращает true только при дополнительном перерендере, что не дает сделать нормальный редирект сразу же, сейчас есть костыль, который делает доп редирект со страницы логина обратно на основную

Потратил на это примерно 3 часа

День 7:
Полностью переделаны селекты для корректной работы с фильтрацие по типу + подтипу, логика селекта перекочевала из отдельного компонента на main страницу, связано это с тем, что на main я получаю данные текущего селекта(выбранного) и сохраняю его в state для последующих манипуляций.
На данном этапе необходимо реализовать подсветку текущего селекта и исправить небольшую ошибку в инпуте при фильтрации(если свернуть селект и развернуть обратно, state не обнуляется и остаются те данные, которые соответствовали фильтру)
На все примерно часов 5

День 8:
Мелкие исправления, создан приват роут, создана кнопка back, компонент 404, компонент лоадера, изменен ui

