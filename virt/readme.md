# Автоматическая виртуализация рендеринга произвольной вёрстки

Здравствуйте, меня зовут дмитрий Карловский и я.. прибыл к вам из недалёкого будущего. Недалёкого, потому что там уже всё и все тормозят. Писец подкрался к нам незаметно: сначала перестали расти моности компьютеров, потом пропускная способность сетей. А пользователи... они продолжали генерировать контент как не в себя. В итоге, за считанные годы UX интерфейсов деградировал настолько, что ими стало настолько пользоваться и многие пользователи поспешили перейти на облачный стриминг своих браузеров, которые работают на суперкомпьютерах, принадлежащих корпорациям, которые не дают людям устанавливать в них блокировщики рекламы. Поэтому я пришёл к вам именно сейчас, в этот момент, когда ещё можно всё исправить, пока не стало слишком поздно. 


[Дмитрий Карловский @ HolyJS'20 Moscow](https://holyjs-moscow.ru/)

Вы можете либо [посмотреть видео запись](), либо [открыть в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/virt/), либо [читать как статью](https://github.com/nin-jin/slides/blob/master/virt/readme.md)...

# О чём это всё

![Wrike](https://d3tvpxjako9ywy.cloudfront.net/blog/content/uploads/2015/01/Team-OKR-Subtasks.jpg?av=30ebc34a665ef077d4467ecdb93325b1)

Я делал иерархические списки задач на 40К штук, редактор документов на 200 страниц, и даже запилил фреймворк, где виртуализация происходит автоматически. Короче, съел я на той теме собаку, кошку, хорька, енота и даже морскую свинку. Так что далее я расскажу как эффективно предоставлять пользователю огромные объёмы данных, почему вообще возникает такая необходимость, какие технологии нам с этим могут помочь, и почему Реакт не способен избавить нас от головной боли.

# Типичный цикл разработки

- Написали код
- Проверили в типличных условиях
- Пришли пользователи и всё заспамили

# Наивный рендеринг: Скорость загрузки и Отзывчивость

![](https://habrastorage.org/webt/x4/hn/3z/x4hn3zghvh8h83x60z4fegd9nj0.png)

# Наивный рендеринг: Потребление памяти

![](https://habrastorage.org/webt/rp/bd/e9/rpbde9k6ewvsphe9x1umf8_ovh8.png)

# Наивный рендеринг: Риск неработоспособности

- не влезли по памяти - приложение закрывается
- обрыв соединения - страница обрывается
- браузер может заглючить на больших объёмах

# Наивный рендеринг: Резюме

- Медленная загрузка
- Плохая отзывчивость
- Высокое потребление памяти
- Риск неработоспособности

# Подопытный: ченьжлог на GitLab

![](https://i.imgur.com/zrawDWA.png)

Открыть [GitLab](https://gitlab.com/gitlab-org/gitlab-foss/-/commit/9517d0eb2ca8bde02d7fae2173e0a43b67b2b9f5#27e06e15cfe9583d733619cf7d72629b777f7757_26212_26221)

# Перенос рендеринга HTML на сервер

![](https://i.imgur.com/Kq38m4l.png)

# Страдания Ильи Климова во GitLab-у

[![https://www.youtube.com/embed/3tdfBMRq34o](https://www.youtube.com/embed/3tdfBMRq34o)](https://www.youtube.com/embed/3tdfBMRq34o)

# Оптимизации вёрстки

*быстрее, но асимптотика не меняется*

```
<div class="amount">
    <h3 class="heading ...">
        <span>
            <span class="amount__major">1 233</span>
            <div class="amount__minor-container">
                <span class="amount__separator">,</span>
                <span class="amount__minor">43</span>
            </div>
            <span class="amount__currency"> ₽</span>
        </span>
    </h3>
</div>
```

```
<h3 class="amount">
    <span class="amount__major">1 233</span>
    <span class="amount__minor">,43 ₽</span>
</h3>
```

[$mol: 4 года спустя](https://habhub.hyoo.ru/#gist=https%3A%2F%2Fapi.github.com%2Frepos%2Fnin-jin%2FHabHub%2Fissues%2F23)

# Прикладная оптимизация: Пагинация

![](https://habrastorage.org/webt/e7/ps/nn/e7psnnp4ciudh1wb8egw-0zapxq.png)

# Достоинства пагинации

- Много кликать ❌
- Ожидание загрузки каждой страницы ❌
- Теряется контекст ❌
- Элементы скачут между страницами ❌
- Вероятность пропустить элемент ❌
- Применимо лишь для плоских списков ❌
- Большой элемент возвращает тормоза ❌
- Работает быстрее, чем всё скопом рендерить ✅

[Популярные антипаттерны: паджинация](https://habhub.hyoo.ru/#gist=https%3A%2F%2Fapi.github.com%2Frepos%2Fnin-jin%2FHabHub%2Fissues%2F13)

# Прикладная оптимизация: Экспандеры

[![https://nin-jin.github.io/my_gitlab/#collapse](https://nin-jin.github.io/my_gitlab/#collapse)](https://nin-jin.github.io/my_gitlab/#collapse)

# Достоинства экспандеров

- Очень много кликать ❌
- Применимо не только для плоских списков ✅
- Ожидание загрузки каждой ветки ❌
- Если не закрывать, то снова тормоза ❌
- Открывается быстро ✅

# Прикладная оптимизация: Бесконечный скролл

![](https://habrastorage.org/webt/7n/eq/s1/7neqs12fscopypxiafivw950key.png)

# Достоинства бесконечного скролла

- Применимо лишь для плоских списков ❌
- Ожидание загрузки каждой ветки ❌
- Увеличение тормозов по мере прокрутки ❌
- Быстрое появление ✅

# Прикладная оптимизация: Виртуальный скролл

[![https://bvaughn.github.io/react-virtualized/#/components/WindowScroller](https://bvaughn.github.io/react-virtualized/#/components/WindowScroller)](https://bvaughn.github.io/react-virtualized/#/components/WindowScroller)

# Достоинства виртуального скролла

- Применимо лишь для плоских списков ❌
- Размеры элементов должны быть предсказуемы ❌
- Работает быстро ✅

# Прикладная оптимизация: Резюме

- Ухудшение пользовательского опыта ❌
- Не решают проблему полностью ❌
- Ограниченная применимость ❌
- Нужно не забыть ❌
- Нужно продавить ❌
- Нужно реализовать ❌
- Нужно оттестировать ❌
- Нужно поддерживать ❌

# Оптимизация инструментов: Тайм слайсинг

[Квантовая механика вычислений в JS](https://github.com/nin-jin/slides/blob/master/fibers)

![https://pbs.twimg.com/media/DZAJN9yVoAAi3LW.jpg](https://pbs.twimg.com/media/DZAJN9yVoAAi3LW.jpg)

# Достоинства тайм слайсинга

- Хорошая отзывчивость ✅
- Замедленность работы ❌
- Эмуляция файберов в JS ❌

# Оптимизация инструментов: Прогрессивный рендеринг

[![https://catberry.github.io/](https://catberry.github.io/)](https://catberry.github.io/)

# Достоинства прогрессивного рендеринга

- Хорошая отзывчивость в процессе появления ✅
- Эмуляция файберов в JS ❌
- На больших объёмах всё встаёт колом ❌

# Оптимизация инструментов: Ленивый рендеринг

[![https://nin-jin.github.io/my_gitlab/#lazy](https://nin-jin.github.io/my_gitlab/#lazy)](https://nin-jin.github.io/my_gitlab/#lazy)

# Достоинства ленивого рендеринга

- Размеры элементов должны быть предсказуемы ❌
- Увеличение тормозов по мере прокрутки ❌
- Быстрое появление ✅

# Оптимизация инструментов: Виртуальный рендеринг

[![https://nin-jin.github.io/my_gitlab/](https://nin-jin.github.io/my_gitlab/)](https://nin-jin.github.io/my_gitlab/)

# Достоинства виртуального рендеринга

- Размеры элементов должны быть предсказуемы ❌
- Работает быстро ✅

# Оптимизация инструментов: Резюме

- Поддерживает полтора фреймворка ❌
- Работает само по себе ✅

# Оптимизации: Резюме

| Оптимизация    | Стоит того?
|----------------|---
| Вёрстка        | ❌
| Прикладной код | ❌
| Инструментарий | ✅

# Оптимизация браузера: content-visibility

```css
content-visibility: auto;
contain-intrinsic-size: 1000px;
```

# Проблема: Оценка размеров

- Точная
- Усреднённая
- Последняя
- Минимальная
- Максимальная

# Типы компонент: Атомарный

![](atomic.png)

# Типы компонент: Стек наложения

![](stack.png)

# Типы компонент: Вертикальный список

![](column.png)

# Типы компонент: Горизонтальный список

![](row.png)

# Типы компонент: Горизонтальный список с переносами

![](wrap.png)

# Типы компонент: Грид

- Вертикальный список из горизонтальных списков
- Или наоборот

# Типы компонент: Резюме

- Атомарный
- Стек наложения
- Вертикальный список
- Горизонтальный список

# Логика: ООП против ФП

- Объект: одно состояние - много действий
- Функция: много состояний - одно действие

# Логика: Ортогональные методы

- Узнать минимальные размеры
- Частично отрендерить содержимое
- Проверить соответствие поисковому запросу

# Логика: Рендеринг

- Измеряем положение
- Опрашиваем минимальные размеры
- Измеряем сколько куда нужно дорендерить
- Добавляем/удаляем элементы
- Для вложенных компонент повторяем рекурсивно

# Логика: Поиск

```
*find_path(
	check: ( view : View )=> boolean,
	path = [] as View[],
): Generator< View[] > {

	path = [ ... path, this ]
	
	if( check( view ) ) return yield path

	for( const item of this.kids ) {
		yield* item.find_path( check, path )
	}

}
```

- Рекурсивно спускаемся по компонентам.
- Отбираем соответствующие запросу.
- Рисуем интерфейс перехода между найденным.

# Логика: Прокрутка к компоненту

```
scroll_to_view( view: View ) {

	const path = this.find_path( v => v === view ).next().value

	this.force_render( new Set( path ) )

	defer( ()=> {
		view.dom_node.scrollIntoView({
			block: 'center',
			inline: 'center',
		})
	})

}
```

# Логика: Форсирование рендеринга видимого

```
force_render( path : Set< View > ): number {

	const items = this.kids // in `Column` changed to `this.rows`
	
	const index = items.findIndex( item => path.has( item ) )

	if( index >= 0 ) {
		// in Column add: `this.visible_range = [ index, index + 1 ]`
		items[ index ].force_render( path )
	}

	return index
}
```

# Пролема: Скачки при скроллинге

- снизу менять DOM - полный штиль
- сверху менять DOM - дискотека авария

# Scroll Anchoring: Предотвращает скачки

![codepen](https://codepen.io/chriscoyier/embed/oWgENp?theme-id=dark&default-tab=result)

# Scroll Anchoring: Выбор точки привязки

![](anchor.png)

# Scroll Anchoring: Подавление привязки

- top, left, right, bottom
- margin, padding
- Any width or height-related properties
- transform
- overflow-anchor: none

# Виртуализация: Прокрутка вниз

![](overlap-top.png)

# Виртуализация: Прокрутка вверх

![](overlap-bottom.png)

# Виртуализация: Расширение

![](inside.png)

# Виртуализация: Скачок вниз

![](after.png)

# Виртуализация: Скачок вверх

![](before.png)

# Scroll Anchoring: Поддержка

| Браузер | overflow-anchor
|---------|---
| Chrome  | ✅
| Firefox | ✅
| Safari  | ❌

# Scroll Anchoring: Запасный выход

```
const anchoring_support = CSS.supports( 'overflow-anchor:auto' )


if( anchoring_support ) {
    virtual render
} else {
    lazy render
}
```

# Проблема: Когда обновляться?

- onScroll
- IntersectionObserver
- requestAnimationFrame

# Обновление на onScroll

```
for( const scroll of all_scrolls ) {

    scroll.addEventListener( 'scroll', event => {
        // few times per frame
    } )

}
```

# Обновление на IntersectionObserver

```
const observer = new IntersectionObserver(

    event => {
        // calls on change of visibility percentage
        // don't calls when visibility percentage doesn't changed
    },
    
    { root: document.body  }
    
)

observer.observe( watched_element )
```

# Обновление на requestAnimationFrame

```
function tick() {

    requestAnimationFrame( tick )
    
    for( const element of watched_elements ) {
        element.getBoundingClientRect()
    }
 
    render()   
}
```

# Проблема: Долгая раскладка

![HabrComment](https://nin-jin.github.io/habrcomment/#article=423889)

# Минимизация расчётов лейаута

```
contain: content // for scroller
```

# Аппаратное ускорение скролла

```
transform: translateZ(0) // for all scroller content
```

# Финальная версия

[![https://nin-jin.github.io/my_gitlab](https://nin-jin.github.io/my_gitlab)](https://nin-jin.github.io/my_gitlab)

# Приколы со фреймами

[![https://nin-jin.github.io/habrcomment/#article=423889](https://nin-jin.github.io/habrcomment/#article=423889)](https://nin-jin.github.io/habrcomment/#article=423889)

# Решаемые проблемы виртуализации

- Оценка будущих размеров
- Скачки контента
- Тормоза при скроллинге
- Прокрутка к элементу
- Поиск по странице

# Фундаментальные особенности

- Скачки скроллбара при неточной оценке размеров
- Scroll Anchoring может не работать в некоторых контекстах.
- Копирование выделенного текста.

# Бенчмарки: Скорость открытия и Отзывчивость

![](https://habrastorage.org/webt/qf/h7/g9/qfh7g9fze_nlbveaxf9t2dfwh7i.png)

Сверху статья на Хабре. Мобильная версия. Меньше 200 комментариев без самой статьи рендерятся на VueJS. Снизу примерно то же самое на $mol. Отображается и статья, и комментарии.

# Бенчмарки: Отзывчивость

Остальные бенчмарки: [dbmon](https://mathieuancelin.github.io/js-repaint-perfs/).

[![https://mol.js.org/perf/dbmon/-/](https://mol.js.org/perf/dbmon/-/)](https://mol.js.org/perf/dbmon/-/)

# Бенчмарки: Потребление памяти

| Вариант                           | Память JS                                             | Память вкладки
|-----------------------------------|-------------------------------------------------------|------------
| [VueJS: 170 комментариев](https://m.habr.com/post/522578)                                 | 50 MB     | 270 MB
| [$mol: статья + 170 комментариев](https://nin-jin.github.io/habrcomment/#article=522578/) | 8 MB      | 50 MB
| [$mol: статья + 2500 комментариев](https://nin-jin.github.io/habrcomment/#article=423889) | 40 MB     | 190 MB

# Бонус: Бесконечная виртуализация

![](https://mol.js.org/app/demo/-/#demo=mol_infinite_demo)

# Ссылочки

- [nin-jin/my_gitlab](http://nin-jin.github.io/my_gitlab)
- [nin-jin/slides/virt](https://github.com/nin-jin/slides/tree/master/virt) - эти слайды
- [Вырезаем SSR и ускоряем Хабр в 10 раз](https://habhub.hyoo.ru/#gist=https%3A%2F%2Fapi.github.com%2Frepos%2Fnin-jin%2FHabHub%2Fissues%2F34) - статья о виртуализации в $mol

# Обратная связь

![](https://habrastorage.org/webt/-c/vu/6i/-cvu6iyueghl7bh37sld_nstysw.jpeg)
