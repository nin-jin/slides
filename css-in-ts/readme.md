# Продвинутый CSS-in-TS

Дмитрий Карловский @ PiterJS#46

Вы можете [открыть это в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/css-in-ts/)

# Компоненты

```tree
$my_profile $mol_book pages /
	<= Menu $mol_page
	<= Details $mol_page

$mol_page $mol_view sub /
	<= Head $mol_view sub /
		<= Title $mol_button
	<= Body $mol_scroll
	<= Foot $mol_view
```

```typescript
class $my_profile extends $mol_book {
	Menu(): $mol_page
	Details(): $mol_page
} )

class $mol_page extends $mol_view {
	Head(): $mol_view
	Title(): $mol_button
	Body(): $mol_scroll
	Foot(): $mol_view
} )
```

# Стилизация через CSS

```html
<mol_view
	mol_view
	mol_page_body
	my_profile_details_body
>
```

```
[my_profile_details_body] [mol_button] {
	border-radius: .5rem;
}

[my_profile_details_body] [mol_button]:focus {
	background: var(--mol_theme_hover)
}
```

# Какие хотим стили

```typescript
$mol_style_define( $my_profile , {
    Details: {
        Body: {
            $mol_button: {
                border: {
                    radius: rem(.5),
                },
                ':focus': {
                    background: $mol_theme.hover
                },
            },
        }
    },
} )
```

# Генерация CSS или сразу CSSOM

![](https://i.imgur.com/qoJQD62.png)

# CSS свойства

```typescript
type CSSStyleDeclaration = {
	display: string
	// 500 lines
}
```

```typescript
{
	display: 'black' // okay :^(
}
```

# csstype

```typescript
type DisplayProperty =
| Globals
| DisplayOutside
| DisplayInside
| DisplayInternal
| DisplayLegacy
| "contents" | "list-item" | "none"
| string
```

```typescript
type DisplayProperty = string
```

# csstype@3

```typescript
type Display =
| Globals
| DisplayOutside
| DisplayInside
| DisplayInternal
| DisplayLegacy
| "contents" | "list-item" | "none"
| (string & {})
```

```typescript
{
	display: 'black' // okay :^(
}
```

# Простые свойства

```typescript
type Common = 'inherit' | 'initial' | 'unset'

interface Properties {

	/**
	 * Whether an element is treated as a block or inline element
	 * and the layout used for its children, such as flow layout, grid or flex.
	 */
	display?: 'block' | 'inline' | 'none' | ... | Common
    
	// etc
}
```

# Группы свойств

```typescript
type Overflow = 'visible' | 'hidden' | ... | Common

overflow? : Overflow | {
	x? :  Overflow
	y? :  Overflow
	anchor? : 'auto' | 'none' | Common
}
```

```
overflow: 'hidden'

overflow: {
	x: 'auto' ,
	y: 'scrol',
	anchor: 'none',
}
```

# Иерархия типов TS

![](https://habrastorage.org/webt/-t/sp/4m/-tsp4mhhzvq2bdgu2flsbflmdrq.png)

# Тесты для типов
# Кастомные типы свойств
# Юниты и декораторы
# Функции
# Псевдоклассы и псевдоэлементы
# Аттрибуты
# Медиа запросы
# БЭМ-элементы
# Фильтрация по над и под типам
# Рекурсивные типы
# Типы-отображения
# Вложенные блоки
# Непосредственно вложенные блоки
# Поиск классов по типу
# Что получилось
# Планы

* Рантайм чтение стилей до рендеринга
* Типизация всех свойств
* Все функции
* Анимации
