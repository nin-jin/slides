# Tree - единый AST чтобы править всеми

```
Спикер \Дмитрий Карловский
Место \Undefined Meetup #1
Время 2019-09-17
```

# План

- Проанализировать популярные текстовые форматы данных 💩
- С нуля разработать новый формат без недостатков 👽
- Показать примеры применения нового формата 👾

# Форматы

| **Формат**
|-----------
| XML
| JSON
| YAML
| TOML
| Tree

## Пример XML

```xml
<!DOCTYPE svg
	PUBLIC "-//W3C//DTD SVG 1.1//EN"
	"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"
>
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
	<circle r="30" cx="50" cy="50" fill="orange" />
</svg>
```

## Пример JSON

```json
{
	"name": "example",
	"version": "1.0.0",
	"description": "example package",
	"main": "index.js",
	"repository": "https://example.org",
	"author": "aninymous",
	"license": "MIT"
}
```

## Пример YAML

```yaml
Date: 2001-11-23 15:03:17 -5
User: ed
Fatal:
  Unknown variable "bar"
Where:
  file: TopClass.py
  line: 23
  code: |
    x = MoreObject("345\n")
```

## Пример TOML

```toml
[servers]

[servers.alpha]
ip = "10.0.0.1"
dc = "eqdc10"

[servers.beta]
ip = "10.0.0.2"
dc = "eqdc10"
```

## Пример Tree

```tree
spoiler
```

# Модели данных

- Какие данные мы можем записать и прочитать без бубна? 🥁
- Как записывать данные не вписывающиеся в модель? 👠

## Модель XML

- NodeList
- Element Node (`<br/>`)
- Attribute Node (`tabindex="1"`)
- Text Node (`Hello, World!`)
- CDATA Node (`<![CDATA[ ... ]]>`)
- Processing Instruction Node (`<? ... ?>`)
- Comment Node (`<!-- ... -->`)
- Document Node
- Document Type Node (`<!DOCTYPE html>`)

## Модель JSON

- Null
- Boolean
- Number
- String
- Array
- Dictionary

## Модель YAML

- Null
- Boolean
- Number
- String
- DateTime
- Array
- Dictionary
- Alias
- Reference
- Document

## Модель TOML

- Boolean
- Integer
- Float
- String
- Datetime
- Array
- Dictionary

## Модель Tree

- Struct Node
- Data Node

## Расширяемость модели

|               | XML  | JSON | YAML | TOML | Tree
|---------------|------|------|------|------|-----
| Расширяемость | ✅  | ❌   | ✅  | ❌   | ✅

# Удобочитаемость

- При написании ✍🏽
- При ревью кода 📖
- При разрешении конфликтов 🤝🏽
- При отладке 🔧
- При изучении 🔬

# Удобочитаемость XML

```xml
Привет, Алиса!
Как дела?
Не могла бы ты принести мне кофе?

<message>
    <greeting>
		Привет, <a href="http://example.org/user/alice">Алиса</a>!
	</greeting>
    <body>
		Как дела?<br/>
		Не могла бы ты принести мне кофе?
	</body>
</message>
```

# Удобочитаемость JSON

```
{ "greetings": "Привет, Алиса!\nКак дела?\nНе могла бы ты принести мне кофе?\n" }
```

# Экранирование

- Нужно отличать конструкции формата от собственно данных 😵
- Желательно не терять в наглядности данных 🤓
- Желательно не переусложнять редктирование 🤬

## Экранирование в XML

```xml
foo > 0 & foo < 10


<code>foo &gt; 0 &amp; foo &lt; 10</code>
```

## Экранирование в JSON

```
/"[\s\S]*"/
```

```json
"\"[\\s\\S]*\""
```

## Экранирование в YAML

- 5 типов строк 😣
- 4 модификатора обработки пробелов 😥

## Экранирование в Tree

	Нет 😲

# Минификация

- Читаемое форматирование много весит 🐘
- Компактное форматирование плохо читается 💀

## Минификация XML

```xml
<users>
	<user>
		<name>Alice</name>
		<age>20</age>
	</user>
</users>


<!-- 13% less -->
<users><user><name>Alice</name><age>20</age></user></users>
```

## Минификация JSON

```json
{
	"users": [
		{
			"name": "Alice",
			"age": 20
		}
	]
}


// 30% less
{"users":[{"name":"Alice","age":20}]}
```

## Статистика по минификации

|                  | XML  | JSON     | YAML | TOML | Tree     
|------------------|------|----------|------|------|----------
| Читаемый         | 195% | 140%     | 125% | 110% | **100%** 
| Минифицированный | 170% | **100%** | -    | -    | -        

Скачать [файлы](https://github.com/nin-jin/tree.d/tree/master/formats).

# Холивары

- Табы или пробелы? 🤼‍♂️
- 2 или 4 символа? 🤼‍♀️
- возврат каретки? ⚡
- выравнивание? 🤺
- правила линтера/форматтера? 🔥
- когда запускать линтер/форматтер? 🚧

# Сложность синтаксиса

|                 | XML | JSON | YAML | TOML | Tree
|-----------------|-----|------|------|------|-------
| Число паттернов | 90  | 30   | 210  | 90   | **10**

# Скорость обработки

```
serialization:    foo\bar    =>  "foo\\bar"

parsing:         "foo\\bar"  =>   foo\bar
```

# Координаты ошибки

|         | XML | JSON | YAML | TOML | Tree
|---------|-----|------|------|------|-----
| Адрес   | ✅  | ❌  | ❌   | ❌  | ✅
| Позиция | ❌  | ❌  | ❌   | ❌  | ✅

# Поточная обработка

|                      | XML | JSON | YAML | TOML | Tree
|----------------------|-----|------|------|------|-----
| Поточная обработка   | ❌  | ❌  | ✅   | ✅  | ✅

# Формат Tree

- Простота синтаксиса ✌
- Никакого экранирования 🤘
- Бинарная безопасность 👌
- Никаких вольностей 🤙
- Никакой минификации 👍
- Минимальный размер 👐
- Гарантированная читаемость 🖖
- Поточная обработка 💪
- Точные координаты ☝

## Просто tree-узел 

```tree
house
```

## Список tree-узлов

```tree
house
	roof
	wall
	door
	window
	floor
```

## Глубокая tree-иерархия

```tree
house
	roof
	wall
		door
		window
			glass
	floor
```

## Когда ребёнок остаётся один в дереве

```tree
street
	house
		wall
			door
			window
```

```tree
street house wall
	window
	door
```

## Сырые данные

```tree
\Любые данные \(^_^)/
```

## Многострочные данные

```tree
\
	\Тут 🐱‍💻
	\   очень 🐱‍👓
	\        много 🐱‍👤
	\             котиков 🐱‍🏍
```

## Разные типы узлов

```tree
user
	name \Jin
	age \35
	hobby
		\kendo 🐱‍👤
		\dance 🕺🏽
		\role play 🎭
```

# Языки основанные на форматах

| Формат         | **Языки**
|----------------|-------------------------
| XML            | XHTML, SVG, XSLT, ...  
| JSON           | JSON Schema, json:api, ...
| YAML           | yaml.org/type 
| TOML           | -
| Tree           | grammar.tree, xml.tree, json.tree, view.tree, ...

## Язык grammar.tree

```tree
tree .is .optional .list_of line

line .is .sequence
	.optional indent
	.optional nodes
	new_line

nodes .is .sequence
	.optional .list_of struct
	.optional data
	.with_delimiter space

struct .is .list_of .byte
	.except special
```

```tree
data .is .sequence
	data_prefix
	.optional .list_of .byte
		.except new_line

special .is .any_of
	new_line
	data_prefix
	indent
	space

new_line .is .byte \0A
indent .is .list_of .byte \09
data_prefix .is .byte \5C
space .is .list_of .byte \20
```

## Язык grammar.tree vs EBNF

```tree
tree .is .optional .list_of line

line .is .sequence
	.optional indent
	.optional nodes
	new_line

nodes .is .sequence
	.optional .list_of struct
	.optional data
	.with_delimiter space
```

```abnf
tree = { line };

line = [ indent ],
	[ nodes ],
	new_line;

nodes = data |
	struct,
	{ space , struct },
	[ space , data ];
```

## Язык xml.tree vs XML

```tree
! doctype html
html
	meta @ charset \utf-8
	link
		@ href \web.css
		@ rel \stylesheet
	script @ src \web.js
	body
		div @ mol_view_root \$my_app
```

```xml
<!doctype html>
<html>

	<meta charset="utf-8" />
	<link href="web.css" rel="stylesheet" />
	<script src="web.js"></script>

	<body>
		<div mol_view_root="$my_app"></div>
	</body>

</html>
```

## Язык json.tree vs JSON

```tree
* user *
	name \Jin
	age 35
	hobby /
		\kendo 🐱‍👤
		\dance 🕺🏽
		\role play 🎭
```

```json
{
	"user": {
		"name": "Jin",
		"age": 35,
		"hobby" : [
			"kendo 🐱‍👤",
			"dance 🕺🏽",
			"role play 🎭"
		]
	}
}
```

## Язык view.tree vs TypeScript

```tree
$my_details $mol_view
	sub /
		<= Pager $mol_paginator
			value?val <=> page?val 0
```

```js
class $my_details extends $mol_view {

	sub() { return [ this.Pager() ] }

	@ $mol_mem Pager() {
		const Pager = new $mol_paginator
		Pager.value = val => this.page( val )
		return Pager
	}

	@ $mol_mem page( val = 0 ) {
		return val
	}

}
```

# API

| Формат         | Языки                      | **API**
|----------------|----------------------------|------------
| XML            | XHTML, SVG, XSLT, ...      | DOM, SAX
| JSON           | JSON Schema, json:api, ... | -
| YAML           | yaml.org/type              | -
| TOML           | -                          | -
| Tree           | xml.tree, json.tree, ...   | AST

## JSON AST

```
{
  "user": {}
}
```

```
{
  "type" : "Object",
  "children" : [
    {
      "type" : "Property",
      "key" : {
        "type": "Identifier",
        "value": "user",
        "raw": "\"user\""
      }
      "value": {
        "type": "Object",
	"children": []
      }
    }
  ]
}
```

## AST Tree

```tree
user
	name \Jin
	age 35
	hobby
		\kendo 🐱‍👤
		\dance 🕺🏽
		\role play 🎭
```

```tree
user
	name \Jin
	age 35
	hobby
		\kendo 🐱‍👤
		\dance 🕺🏽
		\role play 🎭
```

## Свойства узла Tree

```typescript
interface $mol_tree {
	
	type : string
	data : string
	sub : $mol_tree[]

	baseUri : string   // https:/\/example.org
	row : number       // 30
	col : number       // 5

	value : string
	uri : string       // https://example.org#30:5 
	
}
```

# String <=> Tree <=> JSON

```
interface $mol_tree {

	static fromString( str : string , baseUri? : string ) : $mol_tree
	static fromJSON( str : string , baseUri? : string ) : $mol_tree
	
	constructor( fields : Partial< $mol_tree > )

	toString() : string
	toJSON() : string

}
```

# Поддержка редакторами

- [VSCode](https://github.com/nin-jin/vscode-language-tree)
- [Atom](https://github.com/nin-jin/atom-language-tree)
- [Sublime](https://github.com/yurybikuzin/Smol-sublime)
- [SynWrite](http://www.uvviewsoft.com/synwrite/)

# Поддержка языками

- [TypeScript](https://github.com/eigenmethod/mol/tree/master/tree)
- [D](https://github.com/nin-jin/tree.d)

# Итоги

|                           | XML  | JSON     | YAML | TOML | Tree     
|---------------------------|------|----------|------|------|----------
| Размер                    | 195% | 140%     | 125% | 110% | **100%** 
| Число паттернов           | 90   | 30       | 210  | 90   | **10**
| Удобочитаемость           | ❌  | ❌       | ✅  | ✅   | ✅
| Не нужно экранирование    | ❌  | ❌       | ❌  | ❌   | ✅
| Точные координаты ошибки  | ❌  | ❌       | ❌  | ❌   | ✅
| Поточная обработка        | ❌  | ❌       | ✅  | ✅   | ✅
| Расширяемая модель данных | ✅  | ❌       | ✅  | ❌   | ✅
| Широкая распросранённость | ✅  | ✅       | ❌  | ❌   | ❌

# Идеи

- Tree представление иных форматов при редактировании
- Tree как формат логирования
- Tree как формат общения консольных утилит
- Tree представление LISP-подобного языка
- Tree как универсальный AST

## access.log.tree - логи доступа

```
193.34.12.132 - - [2011-10-20T12:46:08+04:00] "GET /index.html HTTP/1.1" 200 4435

```

```tree
access
	ip \193.34.12.132
	time \2011-10-20T12:46:08+04:00
	request \GET /index.html HTTP/1.1
	response \200
	size \4435
```

## tree-tools - убийца PowerShell

```
> cat access.log.tree | table ip time request

193.34.12.132	2011-10-20T12:46:08+04:00	GET /index.html HTTP/1.1
193.34.12.132	2011-10-20T12:46:10+04:00	GET /index.css HTTP/1.1
193.34.12.132	2011-10-20T12:46:20+04:00	GET /index.js HTTP/1.1


> cat access.log.tree | filter time >= 2019-09 | table ip request

193.34.12.132	GET /index.html HTTP/1.1
193.34.12.132	GET /index.css HTTP/1.1
193.34.12.132	GET /index.js HTTP/1.1
```

## jack.tree - LISP без скобочек

```lisp
(cdr (butlast '(1 2 3 4)))
```

```tree
cut-head cut-tail tree
	1
	2
	3
	4
```

## Единый AST чтобы правиль всеми

![Стандарты](https://nin-jin.github.io/slides/tree/standarts.png)

# Куда пойти, куда податься

- Эти слайды: [nin-jin/slides/tree](https://github.com/nin-jin/slides/tree/master/tree)
- Всё о Tree: [nin-jin/tree.d](https://github.com/nin-jin/tree.d)
- Чат о языках: [lang_idioms](https://teleg.run/lang_idioms)
