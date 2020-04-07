# Продвинутый CSS-in-TS

> Дмитрий Карловский @ PiterJS#46

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
	x?:  Overflow | Common
	y?:  Overflow | Common
	anchor?: 'auto' | 'none' | Common
}
```

```
overflow: 'hidden'

overflow: {
	x: 'auto' ,
	y: 'scroll',
	anchor: 'none',
}
```

# Свойства размеров

```typescript
width?: Size
height?: Size

type Size =
| 'auto' | 'max-content' | 'min-content' | 'fit-content'
| Length | Common

type Length = 0 | Unit< 'rem' | ... | '%' > | Func<'calc'>
```

# Единицы измерения

```typescript
Unit< Lit extends string > {

	constructor(
		readonly val: number,
		readonly lit: Lit,
	) { }
	
	toString() {
		return this.val + this.lit
	}

}
```

```typescript
function rem( val : number ) {
	return new Unit( val , 'rem' )
}


{
	width: rem(1) // Unit<'rem'>
}
```

# Функции

# Сокращённые свойства

```typescript
margin?: Directions<Length>
padding?: Directions<Length>

type Directions< Value > =
| Value
| [ Value , Value ]
| {
	top?: Value ,
	right?: Value ,
	bottom?: Value ,
	left?: Value ,
}
```

```typescript
margin: rem(.5)

padding: [ 0 , rem(.5) ]

margin: {
	top: 0,
	right: rem(.5),
	bottom: rem(.5),
	left: rem(.5),
}
```

# Атрибуты

```typescript
attr *
	^
	mol_link_current <= current false

                    ||
		    \/

attr() {
	return {
		... super.attr(),
		mol_link_current: this.current(),
	}
}
```

```
{
	'@': {
		mol_link_current: {
			true: {
				zIndex: 1
			}
		}
	}
}
```

# Иерархия типов TS

![](https://habrastorage.org/webt/u2/42/wk/u242wkmqgwvud3ohaztjmvudrbe.png)

# Типотернарник

```typescript
type A = 5 extends number ? true : false // true

type B = number extends 5 ? true : false // false
```

# Типофункции

```typescript
type IsSubType< Low , High > = Low extends High ? true : false

type A = IsSubType< 5 , number > // true
type B = IsSubType< number , 5 > // false
```

# Наивное сравнение типов

```typescript
type Equals< A , B > =
	A extends B
		? B extends A
			? true
			: false
		: false

type A = Equals< 5 , number > // false =)
type B = Equals< Object , object > // true =(
type C = Equals< any , object > // boolean =\
```

# Железное сравнение типов

```typescript
type Equal< A , B > =
(
	<X>()=> X extends A ? 1 : 2
) extends (
	<X>()=> X extends B ? 1 : 2
)
? unknown
: never
```

# Тесты для типов

```typescript
type Assert<
	Actual,
	Expected extends Equals<
		Actual,
		Expected,
	>,
> = Actual
```

```typescript
// compile time error
type UnknownAny = Assert< unknown , any >

// boolean
type BooleanUnion = Assert<
	Equals< boolean , true | false >,
	unknown,
>
```

# Псевдоклассы и псевдоэлементы
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
