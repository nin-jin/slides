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
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
	<!-- <title>Circle</title> -->
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
---
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
[серверы]

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

## Модель TOML

- Boolean
- Integer
- Float
- String
- Datetime
- Array
- Dictionary

## Модель Tree

- Data Node
- Struct Node

# Минификация

- Читаемое форматирование много весит
- Компактное форматирование плохо читается

## Минификация JSON

```json
{
	"users" : [
		{
			"name" : "Alice" ,
			"age" : 20
		}
	]
}
```

```json
// -30% size -100% readability
{"users":[{"name":"Alice",age:20}]}
```

## Минификация XML

```xml
<users>
	<user>
		<name>Alice</name>
		<age>20</age>
	</user>
</users>
```

```xml
<!-- -13% size -100% readability -->
<users><user><name>Alice</name><age>20</age></user></users>
```

## Статистика по минификации

|                  | XML  | JSON     | YAML | INI  | Tree     
|------------------|------|----------|------|------|----------
| Читаемый         | 196% | 140%     | 124% | 108% | **100%** 
| Минифицированный | 172% | **100%** | -    | -    | -        

Скачать [файлы](https://github.com/nin-jin/tree.d/tree/master/formats).

# Экранирование

- Нужно отличать конструкции формата от собственно данных
- Желательно не терять в наглядности данных

## Экранирование в XML

```
foo > 0 & foo < 10
```

```xml
<code>foo &gt; 0 &amp; foo &lt; 10</code>
```

```xml
<![CDATA[foo > 0 & foo < 10]]>
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

# Холивары

- Табы или пробемы?
- 2 или 4 символа?
- возврат каретки?
- выравнивание?
- правила линтера?
- правила форматтера?

# Сложность синтаксиса

| Формат | Число паттернов |
|--------|-----------------|
| XML    | 90              |
| JSON   | 30              |
| YAML   | 210             |
| TOML   | 90              |
| Tree   | 10              |

# JSON AST



# Подробности по реализации

- координаты ошибки
- 