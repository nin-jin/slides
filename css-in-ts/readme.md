# Продвинутый CSS-in-TS

| Дмитрий Карловский @ PiterJS#46 |
|---------------------------------|

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
		readonly name : Name,
		readonly val : Value,
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
	width: calc( '1px + 1em' ) // Func<'calc',string>
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

# БЭМ элементы

```typescript
interface $my_profile {
	Details(): $mol_page
} )

interface $mol_page {
	Body(): $mol_scroll
} )
```

```typescript
{
	padding: rem(1),
	
	$mol_button: {
		border: 'none',
	},
	
	Details: {
		margin: 'auto',
		
		Body: {
			overflow: 'scroll',
		},
	},
}
```

# Иерархия типов TS

![](https://habrastorage.org/webt/jg/fv/nq/jgfvnq3cka9i4sgxslxoomo7el4.png)

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
type Equal< A , B > =
	A extends B
		? B extends A
			? true
			: false
		: false

type A = Equal< 5 , number > // false =)
type B = Equal< Object , object > // true =(
type C = Equal< any , object > // boolean =\
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
	Expected extends Equal<
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
	Equal< boolean , true | false >,
	unknown,
>
```

# Типы-отображения

```typescript
type KeysAsValues< Obj > = {
	[ Key in keyof Obj ]: Key
}
```

```typescript
type StrangeThing = Assert<

	KeysAsValues<{
		foo: 1
		bar: 2
	}>,

	{
		foo: 'foo'
		bar: 'bar'
	},

>
```

# Туда и обратно

```typescript
type KeyOf1< Obj > = {
	[ Key in keyof Obj ]: Key
}[ keyof Obj ]

type KeyOf2< Obj > = keyof Obj
```

```typescript
type StrangeThing = Assert<

	KeyOf1<{
		foo: 1
		bar: 2
	}>,

	KeyOf2<{
		foo: 1
		bar: 2
	}>,
	
>
```

# Поиск ключей по типу значения

```typescript
type Keys< Obj , Upper > =
{
	[ Key in keyof Obj ]

	: unknown extends Obj[ Key ]
	? never

	: Obj[ Key ] extends never
	? never

	: Obj[ Key ] extends Upper
	? Key

	: never
}[ keyof Obj ]
```

```typescript
type Trash = {
	foo: ()=> void
	bar: new()=> {}
	lol: 5
}

type MethodNames = Assert<
	Keys< Trash , Function >,
	'foo' | 'bar',
>
```

# Фильтрация объекта по типу свойств

```typescript
type MyPick< Obj , Type > = Pick<
	Obj,
	keys< Obj , Type >
>

type MyOmit< Obj , Type > = Omit<
	Obj,
	keys< Obj , Type >
>
```

```typescript
type Trash = {
	foo: ()=> void
	bar: new()=> {}
	lol: 5
}

type Methods = Assert<
	MyPick< Trash , Function >,
	{
		foo: ()=> void
		bar: new()=> {}
	}
>
```

# Поиск всех подклассов

```typescript
namespace $ {
	export class $mol_view {}
	export class $my_app extends $mol_view {}
	export class $mol_time_moment {}
}

const AllViews = MyPick< typeof $ , $mol_view >

Assert< AllViews , {
	$mol_view : typeof $mol_view
	$my_app : typeof $my_app
} >
```

# Рекурсивные типы

```typescript
type Styles< View > =
& Properties
& {
	[ Key in Keys< View , ()=> $mol_view > ]:
		Styles< ReturnType< View[ Key ] > >
}
& {
	[ Key in keyof AllViews ]:
		Styles< InstanceType< AllViews[ Key ] > >
}
```

```
function defineStyle<
	View extends typeof $mol_view,
	Config extends Styles< View >
>(
	view : View,
	config : Config
)
```

# Типогуарды

```typescript
type StylesGuard< View , Config > =
& Properties
& {
	[ Key in keyof Config ]

	: key extends keyof Properties
	? unknown

	: key extends keyof AllViews
	? StylesGuard<
		Extract<
			ResultType< AllViews[ Key ] > ,
			$mol_view,
		>,
		Config[ Key ]
	>

}
```

```
function defineStyle<
	View extends typeof $mol_view,
	Config extends StylesGuard< View , Config >
>(
	view : View,
	config : Config
)
```

# Типошибки

```
: key extends keyof View
? View[ key ] extends ( id? : any )=> infer Sub
	? Sub extends $mol_view
		? StylesGuard< Sub , Config[ key ] >
		: Error<[ 'Wrong Property' , key ]>
	: Error<[ 'Property is not Element' , key ]>

: Error<[ 'Unknown Property' , key ]>


type Error< Message > = 'Error' & { $mol_type_error : Message }
```

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

* Тайпчек всех ключей и значений
* Подсказки по всем ключам и значениям
* Описание всех свойств
* Удобство описания стилей
* Каскадные переопределения стилей

# Планы

* Рантайм чтение стилей до рендеринга
* Типизация всех свойств
* Все функции
* Анимации
* Типизированные выражения в calc
