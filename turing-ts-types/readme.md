# Программирование на TypeScript типах

| Дмитрий Карловский @ PiterJS#? |
|--------------------------------|

Вы можете [открыть это в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/turing-ts-types/)

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

# Брендированные литеральные типы
