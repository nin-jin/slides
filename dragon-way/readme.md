# Путь дракона

![](https://habrastorage.org/webt/v9/if/u1/v9ifu1re6nmugskw7ehh2ypyawi.png)

Открыть [в виде презентации](https://nin-jin.github.io/slides/dragon-way/).

## Знакомимся

Расскажите о себе:

- Кто на чём пишет приложения?
- Насколько доволен инструментом?
- Что хотелось бы улучшить?

А пока я о себе:

- Дмитрий Карловский
- [Яндекс](https://yandex.ru/), [1С](https://1c.ru/), [Wrike](https://www.wrike.com/)
- [Deutche Bank](https://www.db.com/russia/index_ru.htm), [Газпром](https://www.gazprom.ru/contacts/warning/)
- 15 лет в JS ➡ [$mol](https://mol.hyoo.ru/)
- [Core Dump о компьютерной науке](https://www.youtube.com/channel/UC-qEImMrqSLZ9KLee1JTcuw)
- [Организую митапы PiterJS](https://piterjs.org/)
- [Более 10 публичных выступлений](https://slides.hyoo.ru/)
- [Более 30 статей](https://habhub.hyoo.ru/)
- [Более 30 приложений](https://apps.hyoo.ru/)

## Первые шаги

- Разворачивание рабочего окружения **MAM**
- Знакомство с основными идеями **$mol**
- Создание простого приложения на **$mol_view**

### Визеозаписть урока

[![Рабочее окружение MAM и первое небесполезное приложение на $mol](https://www.youtube.com/embed/Ow2u3v-BR6E)](https://youtu.be/Ow2u3v-BR6E)

### Преимущества

- Быстрые приложения
- Быстрая разработка
- Минимум телодвижений
- Расширение кругозора

- [$mol - лучшее средство от геморроя ](https://github.com/nin-jin/slides/blob/master/mol)

### Базовые знания

- [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Dev Tools](https://developer.chrome.com/docs/devtools/)
- [HMTL](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

### Необходимый софт

- [NodeJS](https://nodejs.org/en/download/)
- [VSCode](https://code.visualstudio.com/download)
- [GIT](https://git-scm.com/downloads)

### Необходимые плагины

- [EditorConfig.EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [nin-jin.vscode-language-tree](https://marketplace.visualstudio.com/items?itemName=nin-jin.vscode-language-tree)

### Рабочее окружение

```
git clone https://github.com/hyoo-ru/mam.git
cd mam
npm install
npm start
```

### Новый неймспейс

```
mkdir my
```

### Новый проект

```
mkdir my/wiki
```

### Сборка проекта

```
npm start my/wiki
```

```
ls my/wiki/- 
```

### Точка входа: my/wiki/index.html

```html
<!doctype html>
<html style=" height: 100% ">

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
	</head>

	<body style=" width: 100%; height: 100%; margin: 0 ">
		<div mol_view_root="$my_wiki"></div>
		<script src="web.js"></script>
	</body>

</html>
```

### Композиция: my/wiki/wiki.view.tree

```tree
$my_wiki $mol_page
	title \My Wiki
	body /
		<= Text $mol_textarea
			hint \What do you think?
			value?val <=> text?val \
```

[localhost:9080/my/wiki/-/test.html](http://localhost:9080/my/wiki/-/test.html)

### Поведение: my/wiki/wiki.view.ts

```typescript
namespace $.$$ {
	
	export class $my_wiki extends $.$my_wiki {
		
		text( next?: string ) {
			return this.$.$mol_state_local.value( 'text', next ) ?? ''
		}
		
	}
	
}
```

### Стилизация: my/wiki/wiki.view.css.ts

```
namespace $ {
	
	$mol_style_define( $my_wiki, {
		
		Body: {
			padding: $mol_gap.block,
		},
		
	} )
	
}
```

### Поддержка оффлайна: my/wiki/wiki.meta.tree

```tree
include \/mol/offline/install
```

### Настройка гита: my/wiki/.gitattributes

```
*	-text
```

### Игнорирование сгенерированного: my/wiki/.gitignore

```
-*
```

### Деплой на GitHub Pages: my/wiki/.github/workflows/deploy.yml

```yaml
name: Deploy
on:
  workflow_dispatch:
  push:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: hyoo-ru/mam_build@master2
      with:
        token: ${{ secrets.GH_PAT }}
        package: 'my/wiki'
    - uses: alex-page/blazing-fast-gh-pages-deploy@v1.1.0
      if: github.ref == 'refs/heads/master'
      with:
        repo-token: ${{ secrets.GH_PAT }}
        site-directory: 'my/wiki/-'
```

### Выкладка на гитхаб

```
cd my/wiki
git init
git add *
git commit -a -m "Single page with local storage synchronization"
git remote add origin git@github.com:hyoo-ru/dragon-way.git
git push -u origin master
```

- [github.com/hyoo-ru/dragon-way](https://github.com/hyoo-ru/dragon-way)
- [hyoo-ru.github.io/dragon-way](https://hyoo-ru.github.io/dragon-way)

## Коммуникации

- Мемоизирующие и проксирующие свойства
- Простые и множественные свойства
- Асинхронное взаимодействие
- Индикаторы загрузки и ошибки
- Работа с REST API
- Работа с Local First и безконфликтной синхронизацией

### Догоняем

[github.com/hyoo-ru/mam](https://github.com/hyoo-ru/mam)

```
git clone -b first-steps https://github.com/hyoo-ru/dragon-way.git my/wiki
```

### Взаимодействие с каналами

```typescript
user.name()         // Затягивание
user.name( 'Jin' )  // Проталкивание
```

### Типы каналов

```typescript
user.name()                  // Сольное затягивание
user.name( 'Jin' )           // Сольное проталкивание

user.field( 'name' )         // Мультиплексное затягивание
user.field( 'name', 'Jin' )  // Мультиплексное проталкивание
```

### Ключи мультиплексирования

```typescript
tree.opened( [ 1, 2, 3, 1 ], true )           // JSON по значению

render.layout( document.body, new Vertical )  // Объект по ссылке
```

### Мемоизация свойств

```typescript
@ $mol_mem
name( next = 'Anonymous' ) {
	return next
}

@ $mol_mem_key
field( name: string, next = '' ) {
	return next
}
```

### Делегирование свойств

```typescript
name( next?: string ) {
	return this.model().field( 'name', next ) ?? 'Anonymous'
}
```

### Виды сообщений

```typescript
return { "name": "jin" }                    // Данные

throw new Error( "Wrong name" )             // Исключительная ошибка

throw new Promise( requestAnimationFrame )  // Исключительное обещание
```

### Асинхронные запросы

```typescript
@ $mol_mem
text() {
	const uri = `https://api.github.com/repos/nin-jin/HabHub/issues/7`
	const resp = this.$.$mol_fetch.json( uri )
	return Response( resp )
}
```

### Типобезопасная валидация внешних данных

[http.hyoo.ru](https://http.hyoo.ru/#!uri=https%3A%2F%2Fapi.github.com%2Frepos%2Fnin-jin%2FHabHub%2Fissues%2F7)

```typescript
const Response = $mol_data_record({
	title: $mol_data_string,
	body: $mol_data_string,
})
```

### Владение объектами

```typescript
@ $mol_mem
Store() {
	return new this.$.$mol_store_shared()
}

@ $mol_mem_key
Note( id: string ) {
	return new this.$.$my_wiki_note()
}
```

```tree
Store $mol_store_shared
Note!id $my_wiki_note
```

### Модель предметной области: my/wiki/note/note.ts

```typescript
export class $my_wiki_note extends $mol_store<{
	details: string
	changed_moment: string
}> {
	
	details( next?: string ) {
		if( next !== undefined ) this.changed_moment( new $mol_time_moment )
		return this.value( 'details', next ) ?? ''
	}
	
	details_selection( next?: number[] ) {
		return this.selection( 'details', next )
	}
	
	changed_moment( next?: $mol_time_moment ) {
		const str = this.value( 'changed_moment', next && next.toString() )
		return str ? new $mol_time_moment( str ) : null
	}
	
}
```

### Соединение моделей в my/wiki/wiki.view.ts

```typescript
@ $mol_mem_key
Note( id: string ) {
	return this.Store().sub( 'note=' + id, super.Note( id ) )
}
```

### Привязка к адресу в my/wiki/wiki.view.ts

```typescript
note_id() {
	return this.$.$mol_state_arg.value( 'note' ) ?? ''
}

Note_current() {
	return this.Note( this.note_id() )
}

title() {
	return this.note_id().replace( /_/g, ' ' ) || super.title()
}
```

### Провязывание Model и Presenter в my/wiki/wiki.view.ts

```typescript
details( next?: string ) {
	return this.Note_current().details( next )
}

details_selection( next?: number[] ) {
	return this.Note_current().details_selection( next )
}

changed_moment( next?: $mol_time_moment ) {
	return this.Note_current().changed_moment( next ) ?? new $mol_time_moment
}
```

### Провязывание Presenter и View в my/wiki/wiki.view.tree

```tree
tools /
	<= Changed_moment $mol_date
		value_moment <= changed_moment $mol_time_moment
body /
	<= Details $mol_textarea
		hint \Details
		value?val <=> details?val \
		selection?val <=> details_selection?val /number
```

### Проверяем

> [hyoo-ru.github.io/dragon-way/](https://hyoo-ru.github.io/dragon-way/)

## Контакты

- [mam_mol](https://t.me/mam_mol) - вопросы по теме
- [nin_jin](https://t.me/nin_jin) - связь с автором
