# Tree - единый AST чтобы править всеми

> Дмитрий Карловский @ Гдето#когдато

# План

- Проанализировать популярные форматы
- Разработать новый формат без недостатков вышеназванных
- Показать примеры променения нового формата

# Форматы

- XML
- JSON
- YAML
- TOML
- **Tree**

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

- Какие данные мы можем записать и прочитать без бубна?
- Как записывать данные не вписывающиеся в модель?

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

# Экранирование

- Нужно отличать конструкции формата от собственно данных
- Желательно не терять в наглядности данных

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

- 5 типов строк
- 4 модификатора обработки пробелов

## Экранирование в Tree

	Нет

# Минификация

- Читаемое форматирование много весит
- Компактное форматирование плохо читается

## Минификация XML

```xml
<users>
	<user>
		<name>Alice</name>
		<age>20</age>
	</user>
</users>


<!-- -13% size -100% readability -->
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


// -30% size -100% readability
{"users":[{"name":"Alice",age:20}]}
```

## Статистика по минификации

|                  | XML  | JSON     | YAML | TOML | Tree     
|------------------|------|----------|------|------|----------
| Читаемый         | 196% | 140%     | 124% | 110% | **100%** 
| Минифицированный | 172% | **100%** | -    | -    | -        

Скачать [файлы](https://github.com/nin-jin/tree.d/tree/master/formats).

# Холивары

- Табы или пробемы?
- 2 или 4 символа?
- возврат каретки?
- выравнивание?
- правила линтера/форматтера?
- когда запускать линтер/форматтер?

# Сложность синтаксиса

|                 | XML | JSON | YAML | TOML | Tree
|-----------------|-----|------|------|------|-----
| Число паттернов | 90  | 30   | 210  | 90   | **10**

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

- Простота синтаксиса
- Никакого экранирования
- Бинарная безопасность
- Никаких вольностей
- Никакой минификации
- Минимальный размер
- Гарантированная читаемость
- Поточная обработка
- Точные координаты

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
	\Тут
	\   очень
	\        много
	\             букв
```

## Разные типы узлов

```tree
user
	name \Jin
	age \35
	hobby
		\kendo
		\latina dance
		\role play
```

# Tree языки

- grammar.tree
- xml.tree
- json.tree
- view.tree

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
	.with-delimiter space

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

## EBNF vs grammar.tree

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

## Язык xml.tree

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

## Язык json.tree

```json
{
	"user": {
		"name": "Jin",
		"age": 35,
		"hobby" : [
			"kendo",
			"latina dance",
			"role play"
		]
	}
}
```

```tree
user *
	name \Jin
	age 35
	hobby /
		\kendo
		\latina dance
		\role play
```

# Итоги

|                           | XML  | JSON     | YAML | TOML | Tree     
|---------------------------|------|----------|------|------|----------
| Человекопонятность        | ❌  | 140%     | ✅   | ✅  | ✅
| Размер                    | 196% | 140%     | 124% | 110% | **100%** 
| Число паттернов           | 90   | 30       | 210  | 90   | **10**
| Точные координаты ошибки  | ❌  | ❌       | ❌  | ❌   | ✅
| Поточная обработка        | ❌  | ❌       | ✅  | ✅   | ✅
| Расширяемая модель данных | ✅  | ❌       | ✅  | ❌   | ✅
