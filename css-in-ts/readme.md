# Продвинутый CSS-in-TS

| Дмитрий Карловский @ PiterJS#46 |
|---------------------------------|

Вы можете [открыть это в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/css-in-ts/)

# Подопытное приложение

![](https://habrastorage.org/webt/r8/fj/d8/r8fjd8aylsbmw3iasyox6j_tcn4.png)

# Генерация классов

```tree
$my_profile $mol_view sub /
	<= Menu $my_panel
	<= Details $my_panel

$my_panel $mol_view sub /
	<= Head $mol_view
	<= Body $mol_scroll
```

```typescript
class $my_profile extends $mol_view {
	Menu(): $my_panel
	Details(): $my_panel
} )

class $my_panel extends $mol_view {
	Head(): $mol_view
	Body(): $mol_scroll
} )
```

# Генерация DOM

```typescript
class $my_profile extends $mol_view {
	Menu(): $my_panel
	Details(): $my_panel
} )

class $my_panel extends $mol_view {
	Head(): $mol_view
	Body(): $mol_scroll
} )
```

```html
<mol_view
	mol_view
	my_panel_body
	my_profile_details_body
	>

	<mol_button_major
		mol_view
		mol_button
		mol_button_major
		my_profile_signup
		>
```

# Наложение стилей

```html
<mol_view
	mol_view
	my_panel_body
	my_profile_details_body
	>

	<mol_button_major
		mol_view
		mol_button
		mol_button_major
		my_profile_signup
		>
```

```
[my_profile_details_body] {
	overflow: 'overlay';
}

[my_profile_details_body] [mol_button] {
	border-radius: .5rem;
}
```

# Генерация стилей

```
[my_profile_details_body] {
	overflow: 'overlay';
}

[my_profile_details_body] [mol_button] {
	border-radius: .5rem;
}
```

```typescript
$mol_style_define( $my_profile , {
	Details: {
		Body: {
			overflow: 'overlay',
			$mol_button: {
				border: {
					radius: rem(.5),
				},
			},
		},
	},
} )
```

# CSSOM: проблема с редактированием через DevTools

![](https://i.imgur.com/qoJQD62.png)

# CSSStyleDeclaration: слабая типизация

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

# csstype: кривая типизация

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

# csstype@3: кривая типизация с подсказками

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
interface Properties {

	/**
	 * Whether an element is treated as a block or inline element
	 * and the layout used for its children, such as flow layout, grid or flex.
	 */
	display?: 'block' | 'inline' | 'none' | ... | Common
    
	// etc
}

type Common = 'inherit' | 'initial' | 'unset'

```

# Подсказки по свойствам

![](https://habrastorage.org/webt/ey/ng/ct/eyngctffx2xdtmh36wyix6m7wmi.png)

# Группы свойств

```typescript
interface Properties {
	overflow? : {
		x?:  Overflow | Common
		y?:  Overflow | Common
		anchor?: 'auto' | 'none' | Common
	}
}

type Overflow = 'visible' | 'hidden' | ... | Common
```

```
overflow: {
	x: 'auto' ,
	y: 'scroll',
	anchor: 'none',
}
```

# Свойства размеров

```typescript
interface Properties {
	width?: Size
	height?: Size
}

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

```typescript
Func<
	Name extends string,
	Value = unknown,
> {

	constructor(
		readonly name: Name,
		readonly val: Value,
	) { }
	
	toString() {
		return `${ this.name }(${ this.val })`
	}

}
```

```typescript
function calc( val : string ) {
	return new Func( 'calc' , val )
}


{
	// Func< 'calc' , string >
	width: calc( '1px + 1em' )
}
```

# Сокращённые свойства

```typescript
interface Properties {
	margin?: Directions<Length>
	padding?: Directions<Length>
}

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

# Цвета

```
type Color =
| keyof typeof $mol_colors
| 'transparent' | 'currentcolor'
| $mol_style_func< 'hsla' | 'rgba' | 'var' >


color?: Color | Common
```

```
rgba( 0 , 0 , 255 , 1 )
hsla( 0 , 50 , 50 , 1 )
```

# Списки

```typescript
background?: {
	image?: [ $mol_style_func<'url'> ][]
}
```

```typescript
background: {
	image: [
		[url('/image.svg')],
	],
},
```

# Списки структур

```typescript
box?: {

	shadow?: readonly {
		inset: boolean
		x: Length
		y: Length
		blur: Length
		spread: Length
		color: Color
	}[]

}
```

```typescript
box: {
	shadow: [
		{
			inset: true,
			x: 0,
			y: 0,
			blur: rem(.5),
			spread: 0,
			color: 'black',
		},
	],
},
```

# БЭМ-элементы

```typescript
interface $my_profile {
	Details(): $my_panel
} )

interface $my_panel {
	Body(): $mol_scroll
} )
```

```typescript
$mol_style_define( $my_profile , {
	padding: rem(1),
	
	Details: {
		margin: 'auto',
		
		Body: {
			overflow: 'scroll',
		},
	},
} )
```

# Поиск всех БЭМ-элементов

```typescript
class $my_profile extends $mol_view {
	title(): string
	Menu(): $my_panel
	Details(): $my_panel
} )
```

```typescript
type HaveOnlyElems = $mol_type_assert<

	$mol_type_pick<
		$my_profile,
		()=> $mol_view,
	>,
	
	{
		Menu(): $my_panel
		Details(): $my_panel
	}
	
>
```

# БЭМ-блоки

```typescript
interface $my_profile {
	Menu(): $my_panel
	Details(): $my_panel
} )

interface $mol_button {
} )
```

```typescript
$mol_style_define( $my_profile , {
	
	$mol_button: {
		color: 'red',
	},
	
	Details: {
		$mol_button: {
			color: 'blue',
		},
	},
} )
```

# Поиск всех подклассов

```typescript
namespace $ {
	export class $mol_view {}
	export class $my_panel {}
	export class $mol_tree {}
}
```

```typescript
type $mol_view_all = $mol_type_pick<
	typeof $,
	$mol_view,
>

type HaveOnlyViews = $mol_type_assert<
	$mol_view_all,
	{
		$mol_view: typeof $mol_view
		$my_panel: typeof $my_panel
	},
>
```

# Декларативные ограничения

```typescript
function $mol_style_define<
	View extends typeof $mol_view,
	Config extends Styles< View >
>(
	view : View,
	config : Config
)
```

```typescript
A > B
B > A

A > A
B > B

A > A > A
A > A > B
...
```

# Не понятные типошибки

![](https://habrastorage.org/webt/9g/ef/kj/9gefkjh4xxyb_ycxb4rcsf-poew.png)

# Императивные ограничения

```typescript
function $mol_style_define<
	View extends typeof $mol_view,
	Config extends StylesGuard<
		View,
		Config,
	>
>(
	view: View,
	config: Config
)
```

```typescript
$mol_style_define( $my_profile, {
	title: {
		color: 'red',
	},
} )

$mol_style_define<
	typeof $my_profile,
	{
		title: never,
	}
>
```

# Типошибки

```typescript
type $mol_type_error< Message , Info = {} > = Message & { $mol_type_error : Info }
```

# Пояснения по типошибкам

![](https://habrastorage.org/webt/4h/ox/4_/4hox4_d5xssyyjdz9n0vrhr7ncm.png)

# Атрибуты

```typescript
attr *
	^
	mol_link_current <= current false

                ⇩

attr() {
	return {
		... super.attr(),
		mol_link_current: this.current(),
	}
}
```

# Стили для атрибутов

```typescript
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

# Псевдоклассы и псевдоэлементы

```typescript
{
	':hover': {
		zIndex: 1
	}
}
```

# Медиа запросы

```typescript
{
	$mol_scroll: {
		'@media': {
			'print': {
				overflow: 'visible',
			},
		},
	},
}
```

# Непосредственно вложенные блоки

```typescript
{
	'>': {
	
		$mol_view: {
			margin: rem(1),
		},
		
		$mol_button: {
			margin: rem(0),
		},
		
	},
}
```

# Что получилось

- Каскадные переопределения стилей
- Тайпчек всех ключей и значений
- Подсказки по всем ключам и значениям
- Понятные сообщения об ошибках
- Описание всех свойств
- Удобство описания стилей

# Планы

- Рантайм чтение стилей до рендеринга
- Типизация всех свойств
- Все функции
- Анимации
- Типизированные выражения в calc

# Куда пойти

- Репо: [eigenmethod/mol/style](https://github.com/eigenmethod/mol/tree/master/style)
- Обсуждения: [mam_mol](https://teleg.run/mam_mol)
- Связь со мной: [nin_jin](https://teleg.run/nin_jin)
- Статьи: [habhub.hyoo.ru](https://habhub.hyoo.ru/)
- Твиттер: [_jin_nin_](https://twitter.com/_jin_nin_)
