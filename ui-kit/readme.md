https://page.hyoo.ru/#!=xthcpx_wqmiba

# Проектирование гиперадаптивной UI-библиотеки

> Дмитрий Карловский [nin_jin](https://t.me/nin_jin)

![](fc.svg)

Это - текстовая расшифровка выступления на [FrontendConf'21](https://frontendconf.ru/moscow/2021/abstracts/7406). Вы можете [посмотреть видеозапись](https://youtu.be/JuBv44HHzOc?list=PLXyFFhv8ucKSC96WOd7Ju2HmEWTA3jPa5),  [открыть в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/ui-kit/), либо [читать как статью](https://github.com/nin-jin/slides/blob/master/ui-kit/readme.md)...

# Кто я такой

- 15 разработки фронтенда
- В Яндекс, 1С, Wrike, Deutche Bank, Газпром
- Автор фреймворка [mol](https://mol.hyoo.ru/)

# План

- Размеры
- Цвета
- Раскладка
- Навигация

# Зачем? 

- Разработать с дизайнером кубики Лего
- Пилить приложения уже без дизайнера
- Выглядеть должно опрятно и в едином стиле

# Что не так с дизайнером?

- Дизайнер рисует экранчик в 3 размерах
- Согласовывает его с заказчиком
- Разрабы в шоке - это так не заработает
- Дизайнер всё перерисовывает..

# Приручаем размеры

[![Mathematics Driven Design: размеры и отступы](https://habhub.hyoo.ru/#!author=nin-jin/repo=HabHub/article=37)](https://habhub.hyoo.ru/#!author=nin-jin/repo=HabHub/article=37)

## Базовый размер

> `1rem` (`16px`)

## Текст

![](design-font.svg)

## Ширина текста

> `60rem` (`960px`)

## Межстрочный интервал

Больше букв в строке - больше расстояние меж строк

![](design-line.svg)

## Визуальный ритм

> `.5rem` (`8px`)

## Дробные размеры

- Браузер рендерит пиксели
- Размеры округляются в разные стороны

## Учёт DPI

    devicePixelRatio

## Разрешение картинок

- Под размер экрана ❌
- Под плотность пикселей ❌
- Под скорость соединения ❌
- Минимум из возможных ✅

## А когда нужно гладенько?

> **Векторная графика**

## Увеличенный текст

![](design-header.svg)

## Уменьшенный текст

![](https://habrastorage.org/webt/tj/q6/5l/tjq65l3keao6l0-chvfzp93tdcg.gif)

## Текстовый блок

![](design-paragraph.svg)

## Блок

![](design-symmetry.svg)

## Блок из блоков

![](design-blocks.svg)

# Приручаем цвета

- Константы
- Темы
- Картинки

## Цветовые константы

Семантика рендеринга. Задаются как константы.

- **back** - Фоновый цвет
- **text** - Цвет текста, иконок
- **line** - Цвет разделительных линий
- **shade** - Цвет приглушения текста
- **hover** - Цвет выделения фона
- **control** - Цвет интерактивного текста

Все цвета зависят от фона.

## Каскадные темы

Цвет фона зависит от семантики блока. Для каждой темы определяются все константы. Для вложенных тем они могут переопределяться.

- **normal** - Заурядный блок (по умолчанию)
- **accent** - Блок, требующий внимания
- **field** - Поле ввода

## Корневая тема

Зависит от настроек пользователя.

- Модель освещения (светлая/тёмная)
- Тип дальтонизма
- Степень контраста
- Тип экрана

## Принудительная коррекция под тему

- Картинки
- Иконки
- Карты

## Принудительное освещение

```css
// Dark theme by default
:root {
    filter: invert(1) hue-rotate(180deg);
}

// Undo for images
img {
    filter: invert(1) hue-rotate(180deg);
}
```

## Хранение темы

- Настройки браузера
- Локальное хранилище
- Ссылка

# Приручаем раскладку

- Заполнение строк
- Представление таблиц

## Брейк-поинты?

- Игнорируют размер контейнера
- Игнорируют размер контента
- Сложны в поддержке

## Фиксированный размер

![](design-fixed.svg)

## Flex-переносы?

![](design-flex.svg)

## Grid-переносы?

![](design-grid.svg)

## Биноминальные переносы!

![](design-binom.svg)

## Выравнивание биноминальных переносов

- Чётное число бьём пополам
- Нечётное делим 1:2
- `flex-grow` = число элементов

## Пример биноминальных переносов

[![$mol_galery_demo](https://mol.hyoo.ru/#!section=components/demo=mol_gallery_demo)](https://mol.hyoo.ru/#!section=components/demo=mol_gallery_demo)

## Маленькие таблицы..

![](design-table-small.svg)

## Большие таблицы?

![](design-table-big.svg)

## Карточки?

![](design-cards.svg)

## Карточки с выравниванием!

![](design-table-cards.svg)

## Пример карточек с выравниванием

[![Приложение "Закупки"](https://mol.js.org/app/supplies/-/#!supply=75BCD15)](https://mol.js.org/app/supplies/-/#!supply=75BCD15)

# Приручаем экраны

- Эффективное заполнение больших экранов
- Единый UX для любых экранов
- Единый UX для любых способов ввода

## Что такое эффективное заполнение?

- Не захламление пустоты.
- Не скрытие релевантного.

## Сначала десктоп

![](https://habrastorage.org/webt/vo/d1/ae/vod1aerwc50vzhqkqcdr5eomnhg.png)

## Сначала мобилки

![](https://habrastorage.org/webt/5o/df/ox/5odfoxh56jtfufym2m_sh3lshfo.png)

## Где это я?

[![](https://i.imgur.com/YFJvRXK.png)](https://habr.com/ru/post/527574/)

## Размеры экранов

- Их не 2
- И даже не 3
- Их континуум!

## Буклетный дизайн

![](https://4.bp.blogspot.com/-JAYBEXzzVVo/XCcFBh1M5pI/AAAAAAAAAG4/vYOKHtoIkjgjsqNf9v0j3Sy9awpwe_iAgCLcBGAs/s1600/8.%2BBest%2BTrifold%2BBrochure%2BMockup%2BFree%2BDownload%2B2019.jpg)

## Возвращение горизонтального скролла

![](https://4.bp.blogspot.com/-LWPowjeArAM/XCcEtE1ftpI/AAAAAAAAAGY/qY-aiN7z8sY2-svA9QRWf1i8Hqc_AvQegCLcBGAs/s1600/3.%2BBest%2BTrifold%2BBrochure%2BMockup%2BFree%2BDownload%2B2019.jpg)

## Фу! Горизонтальный скролл!

- Выпирающий текст
- Кривое позиционирование

## Метафора погружения

![](https://habrastorage.org/webt/xg/lo/xx/xgloxxqlzrvwi7748088ggcyxqk.png)

## Вау! Горизонтальный скролл!

- Свайпы фактически горизонтально скроллят
- Ширина окна - максимум для страницы
- Автоматическое выравнивание
- Максимальная отзывчивость
- Крайне простая реализация

## Нюансы горизонтального скролла

- Частично выглядывающая страница интригует
- Промотка нескольких страниц за раз

## Пример с горизонтальным скроллом

[![Читалка статей](https://mol.hyoo.ru/#!section=articles/author=nin-jin/repo=HabHub/article=37)](https://mol.hyoo.ru/#!section=articles/author=nin-jin/repo=HabHub/article=37)

## Распасовка карт

![](https://2.bp.blogspot.com/-52rCts3qZ5E/XCcE4gDdJ7I/AAAAAAAAAGk/kPmTUIeyPZkzV2D3Ypz_26RuuEw4CHLGgCLcBGAs/s1600/5.%2BBest%2BTrifold%2BBrochure%2BMockup%2BFree%2BDownload%2B2019.jpg)

## Пример распасовки карт

![](https://zerkalica.github.io/tss/#report=FD4445D6/login=x/page=reports)

## Особенности распасовки карт

- Реализация сложнее
- Нужны свайпы
- Страницы не обрезаются
- Привычный UX

## Буклетная матрёшка

![](design-matreshka.svg)

# Итоги

- Font size `1rem` ✅
- Grid step `0.5rem` ✅
- Integral sizes ✅
- Fractal theming ✅
- Break points ❌
- Binominal wrap ✅
- Tables ❌
- Aligned cards ✅
- Mobile first ❌
- Booklet design ✅

# Продолжение банкета

- [slides.hyoo.ru](https://slides.hyoo.ru/) - выступления
- [Core Dump](https://www.youtube.com/channel/UC-qEImMrqSLZ9KLee1JTcuw) - видео о компьютерной науке
- [habhub.hyoo.ru](https://habhub.hyoo.ru/) - статьи
- [apps.hyoo.ru](https://apps.hyoo.ru/) - приложения
- [`_jin_nin_`](https://twitter.com/_jin_nin_) - твиты по делу

# Есть что добавить или поправить?

![](https://habrastorage.org/webt/y3/gb/is/y3gbisydqnoyr5qwwmscn0gwmqq.gif)

- Дмитрий, как обычно, разобрал все по-полочкам. Мне очень понравился получившиеся подходы и техники. Хорошая визуализация. Из минусов подачи - слишком сухо что-ли. Дмитрий сразу прыгает с места в карьер. Но наверное если бы обьяснял, то контента было бы раза в 2 меньше.
- К сожалению уснул на второй половине. Хотелось бы рассказ пободрее. Не увлекает.
- Пожалуйста, хоть чуть-чуть привлекайте дизайнеров для создания презентаций, очень тяжело смотреть потому что банально ничего не видно. Ну и немножечко нудно... Хотя тема и правда важная.
- Вот это обязательно посмотрю.
