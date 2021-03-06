# Что не так с сорсмапами и как с ними не связываться?

Здравствуйте, меня зовут Дмитрий Карловский и у меня... посттравматическое стрессовое расстройство после генерации сорсмапов. И сегодня с вашей помощью мы будем это лечить путём максимального погружения в травмирующие события.

![](https://habrastorage.org/webt/40/hj/vn/40hjvn5a3pm-0xlwdxf4kcorrhs.jpeg)

Это - слайды с выступления на [HolyJS'21](https://holyjs-piter.ru/). Вы можете [посмотреть видео записть](https://www.youtube.com/watch?v=rQEqXIo4PVM), [прочитать как статью](https://github.com/nin-jin/slides/tree/master/sourcemap), либо [открыть в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/sourcemap/).

## Как я до этого докатился?

Сперва история болезни:

- [Формат tree](https://github.com/nin-jin/slides/tree/master/tree)
- [Язык view.tree](https://github.com/hyoo-ru/mam_mol/tree/master/view#viewtree)
- [Фреймворк $mol](https://github.com/nin-jin/slides/tree/master/mol)

Однажды я разработал простой формат Tree для представления Абстрактных Синтаксических Деревьев в наиболее наглядной форме. На базе этого формата я реализовал уже несколько языков. Один из них - язык `view.tree` - предназначен для декларативного описания компонент и композиции их друг с другом. И именно на этом языке описаны все стандартные  визуальные компоненты фреймворка $mol. Это позволяет писать короткий и наглядный код, делающий при этом много чего полезного.

## Зачем DSL? Бойлерплейт!

Сейчас вы видите законченное приложение на $mol:

```tree
$my_app $my_page
    title @ \Are you ready for SPAM?
    body /
        <= Agree $my_checkbox
            checked?val <=> agree?val true
```

Оно состоит из панельки, внутри которой расположен чекбокс. И вместе они связаны двусторонней сязью по заданным свойствам. В 5 строчках кода тут есть даже поддержка локализации. Эквивалентный код на JavaScript занимает в 5 раз больше места:

```javascript
class $my_app extends $my_page {
    title() {
        return this.$.$my_text( '$my_app_title' )
    }
    body() {
        return [ this.Agree() ]
    }
    Agree() {
        const obj = new this.$.$my_checkbox()
        obj.checked = val => this.agree( val )
        return obj
    }
    agree( val = true ) {
        return val
    }
}
$my_mem( $my_app.prototype, "agree" )
$my_mem( $my_app.prototype, "Agree" )
```

Этот код, хоть и на более привычном многим языке, куда более сложный в понимании. Кроме того он совсем потерял иерархию, чтобы добиться того же уровня гибкости. Плоский класс хорош тем, что от него можно отнаследоваться и переопределить любой аспект поведения компонента.

Таким образом одна из основных причин использование DSL - это возможность писать простой и лаконичный код, который легко изучить, в котором сложно накосячить, и который легко поддерживать.

## Зачем DSL? Пользовательские скрипты!

Друга причина внедрения DSL - это потребность давать самим пользователям расширять логику вашего приложения, используя скрипты. Например, возьмём простой скрипт аавтоматизации работы со списком задач:

```javascript
@assignee = $me
@component = \Frontend
@estimate ?= 1D
@deadline = $prev.@deadline + @estimate
```

Тут мы говорим: назначь меня ответственным на все задачи; укажи, что они все относятся к фронтенду; если эстимейт не задан, то пропиши 1 день; и выстрои их дедлайны по очереди с учётом получившихся эстимейтов.

## JS в песочнице? Это законно?!7

[sandbox.js.hyoo.ru](https://sandbox.js.hyoo.ru)

![sandbox.js.hyoo.ru](https://sandbox.js.hyoo.ru)

## JS в песочнице? Не, это не для средних умов..

![](https://habrastorage.org/webt/ao/yq/5p/aoyq5pthfqsvo7mhyarqrsse3ug.png)

## Зачем DSL? Разные таргеты!

- JS
- WASM
- GPU
- JVM
- CIL

## А разные таргеты зачем? Одна модель, чтобы править всеми!

```tree
Task
    title String
    estimate Duration
```

```javascript
class Task extends Model {
    title() {
        return this.json().title
    }
    estimate() {
        return new Duration( this.json().estimate )
    }
}
$my_mem( Task.prototype, "estimate" )


CREATE CLASS Task extends Model;
CREATE PROPERTY title string;
CREATE PROPERTY estimate string;
```

## Зачем DSL? Фатальный недостаток же!

![](https://habrastorage.org/webt/bf/r_/dx/bfr_dxmy-xwvpql8fxv3x1c2vha.jpeg)

## Зачем всё это? Транспиляция и проверки!

- Babel и прочие **транспайлеры**.
- Uglify и прочие **минификаторы**.
- TypeScript, AssemblyScript и прочие **языки программирования**.
- TypeScript, FlowJS, Hegel и прочие **тайпчекеры**.
- SCSS, Less, Stylus PostCSS и прочие **CSS генераторы**.
- SVGO, CSSO и прочие **оптимизаторы**.
- JSX, Pug, Handlebars и прочие **шаблонизаторы**.
- MD, TeX и прочие **языки разметки**.
- ESLint и прочие **линтеры**.
- Pretier и прочие **форматтеры**.

## Так какие проблемы? Это не то, что я написал!

```markdown
Hello, **World**!
```

```javascript
function make_dom( parent ) {
    {
        const child = document.createTextNode( "Hello, " )
        parent.appendChild( child )
    }
    {
        const child = document.createElement( "strong" )
        void ( parent => {
            const child = document.createTextNode( "World" )
            parent.appendChild( child )
        } )( child )
        parent.appendChild( child )
    }
    { 
        const child = document.createTextNode( "!" )
        parent.appendChild( child )
    }
}
```

## Так какие проблемы? Да тут чёрт ногу сломит!

```markdown
Hello, **World**!
```

```javascript
function make_dom(e){{const t=document.createTextNode("Hello, ");
e.appendChild(t)}{const t=document.createElement("strong");
(e=>{const t=document.createTextNode("World");e.appendChild(t)})(t),
e.appendChild(t)}{const t=document.createTextNode("!");e.appendChild(t)}}
```

## Чем помогут сорсмапы? Исходники и отладка!

![](https://i.imgur.com/05Fg1oy.png)

## Чем помогут сорсмапы? Стек трейсы!

![](https://i.imgur.com/R4mbe2U.png)

## Чем помогут сорсмапы? Значения переменных!

![](https://i.imgur.com/aWZBEGm.png)

## Спецификация? Не, не слышал..

- V1 - Internal Closure Inspector format
- [Proposal V2 2010](https://docs.google.com/document/d/1xi12LrcqjqIHTtZzrzZKmQ3lbTv9mKrN076UB-j3UZQ/edit) +JSON -20%
- [Proposal V3 2013](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit) - 50%

## Как всё же разобраться в сорсмапах?

- [Introduction to JavaScript Source Maps](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
- [Source Maps: быстро и понятно](https://habr.com/ru/post/509250/)

## Как сорсмапы подключаются?

HTTP заголовком.

    SourceMap: <url>

В конце кода.

    //# sourceMappingURL=<url.js.map>

    /*# sourceMappingURL=<url.css.map> */

## Как сорсмапы устроены?

```json
{
    "version": 3,
    "sources": [ "url1", "url2", ... ],
    "sourcesContent": [ "src1", "src2", ... ],
    "names": [ "va1", "var2", ... ],
    "mappings": "AAAA,ACCO;AAAA,ADJH,WFCIG;ADJI;..."
}
```

## Как расшифровать маппинги?

```
AAAA,ACCO;
AAAA,ADJH,WFCIG;
ADJI;
...
```

## Это что за спаны такие?

![](https://habrastorage.org/webt/pm/rb/mn/pmrbmnzdwujys9rdgywjm_o5b10.png)

## Так что в этих числах-то?

![](https://habrastorage.org/webt/05/56/qo/0556qo-lxeehub6eic7ypgqk7lc.png)

## И это всё в 5 байтах? Дифференциальное кодирование!

| TC | SI | SR  | SC 
|----|----|-----|---
| 0  | 1  | 40  | 30
| 3  | 3  | **900** | 10
| 6  | 3  | **910** | 20

| TC | SI  | SR   | SC
|----|-----|------|---
| 0  | 1   | 40   | 30
| +3 | +2  | **+860** | -20
| +3 | 0   | **+10**  | +10

## И это всё в 5 байтах? VLQ кодирование!

| Values           | Bits Count | Bytes Count
|------------------|------------|------------
| -15 .. +15       | 5          | 1
| -511 .. +511     | 10         | 2
| -16383 .. +16383 | 15         | 3

## Как же сорсмапы хороши! Был бы исходник..

![](https://habrastorage.org/webt/qc/yc/nc/qcycnc3qglfbyg9vemcmwof5usa.png)

## Как же сорсмапы хороши! Был бы результат..

![](https://habrastorage.org/webt/ew/ew/ae/ewewaeps8nxiz3hcmpk6vdm-yp4.png)

## А если надо склеить сорсмапы?

```
{
	version: 3,
	sections: [
		{
			offset: {
				line: 0,
				column: 0
			},
			url: "url_for_part1.map"
		},
		{
			offset: {
				line: 100,
				column: 10
			},
			map: { ... }
		}
	],
}
```

## А макросы? Мапим на их внутрянку.. 

```cpp
template log( value ) {
    if( logLevel > Info ) { // A
        console.log( value ) // B
    }
}

log!stat1()
log!stat2()
log!stat3()
```

```cpp
if( logLevel > Info ) { // A
    console.log( stat1() ) // B
}

if( logLevel > Info ) { // A
    console.log( stat2() ) // B
}

if( logLevel > Info ) { // A
    console.log( stat3() ) // B
}
```

## А макросы? Мапим на их применение.. 

```cpp
template log( value ) {
    if( logLevel > Info ) {
        console.log( value )
    }
}

log!stat1() // 1
log!stat2() // 2
log!stat3() // 3
```

```cpp
if( logLevel > Info ) { // 1
    console.log( stat1() ) // 1
}

if( logLevel > Info ) { // 2
    console.log( stat2() ) // 2
}

if( logLevel > Info ) { // 3
    console.log( stat3() ) // 3
}
```

## А макросы? Мапим и на применение, и на внутрянку!

```cpp
template log( value ) {
    if( logLevel > Info ) { // A
        console.log( value ) // B
    }
}

log!stat1() // 1
log!stat2() // 2
log!stat3() // 3
```

```cpp
void 0 // 1
if( logLevel > Info ) { // A
    console.log( stat1() ) // B
}

void 0 // 2
if( logLevel > Info ) { // A
    console.log( stat2() ) // B
}

void 0 // 3
if( logLevel > Info ) { // A
    console.log( stat3() ) // B
}
```

## Как же сорсмапы хороши! Если бы не имена переменных..

- Только имена переменных, никаких выражений
- Только полное совпадение

## Как же сорсмапы хороши! Если бы не evil..

```javascript
new Function( '', 'debugger' )
```

```javascript
(function anonymous(
) {
debugger
})
```

## Как же сорсмапы хороши! Но что-то пошло не так..

- Карты Таро
- Натальные карты
- Гугл Карты

## Пофантазируем? Сорсмапы здорового человека!

| Field         | Bytes Count
|---------------|------------
| source_offset | 3
| source_length | 3
| target_length | 2

## Стоит ли связываться с сорсмапами?

- Сложно само по себе.
- Проносить через трансформации.
- Проносить в сообщениея об ошибках.
- Плюс трейс по шаблонам.

## Сложно? Возьмём бабель!

Открыть на [гитхабе](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-arrow-functions/src/index.js).

```typescript
import { declare } from "@babel/helper-plugin-utils";
import type NodePath from "@babel/traverse";

export default declare((api, options) => {
    const { spec } = options;
    return {
        name: "transform-arrow-functions",
        visitor: {
            ArrowFunctionExpression(
                path: NodePath<BabelNodeArrowFunctionExpression>,
            ) {
                if (!path.isArrowFunctionExpression()) return
                path.arrowFunctionToExpression({ // Babel Helper
                    allowInsertArrow: false,
                    specCompliant: !!spec,
                })
            },
        },
    }
})
```

## Бабель, зачем столько бойлерплейта?

Открыть на [гитхабе](https://github.com/babel/babel/blob/e498bee10f0123bb208baa228ce6417542a2c3c4/packages/babel-traverse/src/path/conversion.js#L104).

```typescript
import "@babel/types";
import nameFunction from "@babel/helper-function-name";

// ...

this.replaceWith(
    callExpression( // mapped to this
        memberExpression( // mapped to this
            nameFunction(this, true) || this.node, // mapped to this
            identifier("bind"), // mapped to this
        ),
        [checkBinding ? identifier(checkBinding.name) : thisExpression()],
    ),
);
```

## Займёмся отладкой? AST курильщика..

[`const foo = { "bar": 123 };`](https://astexplorer.net/#/gist/1296170ba2b75ef8f70acb6c478a8215/8c64175041878ae28e750fedafb55193cf839c53)

```json
{
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "VariableDeclaration",
            "kind": "const",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [
                            ...
```

## Займёмся отладкой? AST здорового человека!

[`const foo = { "bar": 123 };`](https://tree.hyoo.ru/#source=%7B%3B%7D%0A%09const%0A%09%09foo%0A%09%09%7B%2C%7D%0A%09%09%09%3A%0A%09%09%09%09%5Cbar%0A%09%09%09%09123%0A/pipeline=%24mol_tree2_from_string~%24mol_tree2_js_to_text~%24mol_tree2_text_to_string)

```tree
{;}
    const
        foo
        {,}
            :
                \bar
                123
```

## И как с этим работать? Всё, что нужно и ничего ненужного!

```typescript
type $mol_tree2 = {
    readonly type: string
    readonly value: string
    readonly kids: $mol_tree2[]
    readonly span: $mol_span
}
```

```typescript
type $mol_span = {
    readonly uri: string
    readonly source: string
    readonly row: number
    readonly col: number
    readonly length: number
}
```

## И как с этим работать? Локальные фабрики!

```typescript
interface $mol_tree2 {
    struct( type , kids ): $mol_tree2
    data( value , kids ): $mol_tree2
    list( kids ): $mol_tree2
    clone( kids ): $mol_tree2
}
```

## Почему это работает?

![](https://habrastorage.org/webt/_x/fw/fb/_xfwfb70fcsgov4pwm35bbdb4qw.png)

## И как с этим работать? Обобщённые трансформации!

```typescript
interface $mol_tree2 {
	select( ... path ): $mol_tree2
	filter( ... path, value ): $mol_tree2
	insert( ... path, value ): $mol_tree2
	hack( belt, context ): $mol_tree2[]
}
```

## Это что за хаки такие? Шаблонный пример..

```tree
rest-api
	login @username
	password @password
db-root
	user @username
	secret @password
```

```typescript
config.hack({
	'@username': n => n.data( 'jin' ),
	'@password': p => p.data( 'пороль' ),
})
```

```tree
rest-api
	login \jin
	password \пороль
db-root
	user \jin
	secret \пороль
```

Открыть в [песочнице](https://tree.hyoo.ru/#!pipeline=%24mol_js_eval/source=let%20src%20%3D%20%24mol_tree2_from_string%28%60%0A%09rest-api%0A%09%09login%20%40username%0A%09%09password%20%40password%0A%09db-root%0A%09%09user%20%40username%0A%09%09secret%20%40password%0A%60%29%0A%0Asrc%20%3D%20src.list%28%0A%09src.hack%28%7B%0A%09%09'%40username'%3A%20n%20%3D%3E%20n.data%28%20'jin'%20%29%2C%0A%09%09'%40password'%3A%20p%20%3D%3E%20p.data%28%20'%D0%BF%D0%BE%D1%80%D0%BE%D0%BB%D1%8C'%20%29%2C%0A%09%7D%29%0A%29%0A%0Areturn%20src)

## А если что-то более сложное? Скрипт автоматизации..

```tree
click \$my_app.Root(0).Task(0)
click \$my_app.Root(0).Details().TrackTime()
```

```javascript
script.hack({
	click: ( click, belt )=> {
		const id = click.kids[0]
		return [
			click.struct( '()', [
				id.struct( 'document' ),
				id.struct( '[]', [
					id.data( 'getElementById' ),
				] ),
				id.struct( '(,)', [ id ] ),
				click.struct( '[]', [
					click.data( 'click' ),
				] ),
				click.struct( '(,)' ),
			] ),
		]
	},
})
```

Открыть в [песочнице](https://tree.hyoo.ru/#pipeline=%24mol_js_eval~%24mol_tree2_js_to_text~%24mol_tree2_text_to_sourcemap_vis/source=let%20src%20%3D%20%24mol_tree2_from_string%28%60%0A%09click%20%5C%5C%24my_app.Root%280%29.Task%280%29%0A%09click%20%5C%5C%24my_app.Root%280%29.Details%28%29.TrackTime%28%29%0A%60%29%0A%0Asrc%20%3D%20src.list%28%5B%0A%09src.struct%28%20'%7B%3B%7D'%2C%0A%09%09src.hack%28%7B%0A%0A%09%09%09click%3A%20%28%20click%2C%20belt%20%29%3D%3E%20%7B%0A%09%09%09%09const%20id%20%3D%20click.kids%5B0%5D%0A%09%09%09%09return%20%5B%0A%09%09%09%09%09click.struct%28%20'%28%29'%2C%20%5B%0A%09%09%09%09%09%09id.struct%28%20'document'%20%29%2C%0A%09%09%09%09%09%09id.struct%28%20'%5B%5D'%2C%20%5B%0A%09%09%09%09%09%09%09id.data%28%20'getElementById'%20%29%2C%0A%09%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%09%09id.struct%28%20'%28%2C%29'%2C%20%5B%20id%20%5D%20%29%2C%0A%09%09%09%09%09%09click.struct%28%20'%5B%5D'%2C%20%5B%0A%09%09%09%09%09%09%09click.data%28%20'click'%20%29%2C%0A%09%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%09%09click.struct%28%20'%28%2C%29'%20%29%2C%0A%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%5D%0A%09%09%09%7D%2C%0A%0A%09%09%09''%3A%20%28%29%3D%3E%20%5B%5D%0A%0A%09%09%7D%29%2C%0A%09%29%2C%0A%5D%29%0A%0Areturn%20src).

## А можно ещё проще? jack.tree - макро язык для странсформаций!

```tree
hack script {;} from

hack click ()
    document
    [] \getElementById
    (,) data from
    [] \click
    (,)

script jack
    click \$my_app.Root(0).Task(0)
    click \$my_app.Root(0).Details().TrackTime()
```

Открыть в [песочнице](https://tree.hyoo.ru/#pipeline=%24mol_tree2_from_string~%24mol_jack_transform~%24mol_tree2_js_to_text~%24mol_tree2_text_to_string_mapped_js/source=hack%20script%20%7B%3B%7D%20from%0A%0Ahack%20click%20%28%29%0A%09document%0A%09%5B%5D%20%5CgetElementById%0A%09%28%2C%29%20data%20from%0A%09%5B%5D%20%5Cclick%0A%09%28%2C%29%0A%0Ascript%20jack%0A%09click%20%5C%24my_app.Root%280%29.Task%280%29%0A%09click%20%5C%24my_app.Root%280%29.Details%28%29.TrackTime%28%29%0A)

## А если разные таргеты? Трансформируем в JS, вырезая локализацию..

```tree
+js
	print @ hello \Hello, World!
	print @ bye \Bye, World!
```

```javascript
{
	console.log( localize( "hello" ) );
	console.log( localize( "bye" ) );
}
```

## А если разные таргеты? Вычленяем переводы, игнорируя логику..

```tree
+loc
	print @ hello \Hello, World!
	print @ bye \Bye, World!
```

```json
{
	"hello": "Hello, World!",
	"bye": "Bye, World!"
}
```

## А если разные таргеты? Меняем трансформации как перчатки..

Открыть в [песочнице](https://tree.hyoo.ru/#pipeline=%24mol_tree2_from_string~%24mol_jack_transform~%24mol_tree2_js_to_text~%24mol_tree2_text_to_string/source=hack%20%2Bjs%0A%09hack%20print%20%28%29%0A%09%09console%0A%09%09%5B%5D%20%5Clog%0A%09%09%28%2C%29%20from%0A%09hack%20%40%20%28%29%0A%09%09localize%0A%09%09%28%2C%29%20type%20from%0A%09%7B%3B%7D%20from%0A%0Ahack%20%2Bloc%0A%09hack%20print%20from%0A%09hack%20%40%20%3A%0A%09%09type%20from%0A%09%09kids%20from%0A%09%7B%2C%7D%20from%0A%0A%2Bjs%0A%09print%20%40%20hello%20%5CHello%2C%20World!%0A%09print%20%40%20bye%20%5CBye%2C%20World!%0A%0A).

```tree
hack +js
	hack print ()
		console
		[] \log
		(,) from
	hack @ ()
		localize
		(,) type from
	{;} from
```

```tree
hack +loc
	hack print from
	hack @ :
		type from
		kids from
	{,} from
```

## Что-то пошло не так? Трейс трансформаций!

Открыть в [песочнице](https://tree.hyoo.ru/#pipeline=%24mol_tree2_from_string~%24mol_jack_transform~%24mol_tree2_js_to_text~%24mol_tree2_text_to_string/source=hack%20%2Bpipe%0A%09hack%20%7C%3E%20var%0A%09%09pipe%0A%09%09from%0A%09hack%20%3C%7C%0A%09%09pipe%0A%09%09test%0A%09%09%09case%20count%20from%0A%09%09%09case%200%0A%09from%0A%0Ahack%20%2Bmath%20%2Bpipe%0A%09hack%20square%20%28**%29%0A%09%09%3C%7C%201%0A%09%092%0A%09from%0A%0A%2Bmath%20%7B%3B%7D%0A%09%7C%3E%203%0A%09%7C%3E%20square%0A).

![](https://habrastorage.org/webt/7k/4r/by/7k4rbyvkgphsh1mkfg81q8rh9zm.png)

## Ну зачем ещё один велосипед?

|                      | Babel | TypeScript | tree
|----------------------|-------|------------|-----
| Сложность API        | ~300  | ∞          | ~10
| Иммутабельность API  | ❌   | ❌         | ✅
| Абстракция от языка  | ❌   | ❌         | ✅
| Удобная сериализация | ❌   | ❌         | ✅
| Самодостаточность    | ❌   | ✅         | ✅

## Типичный пайплайн.. что тут не так?

- **TS**: распарсил, транспилировал, сериализовал.
- **Webpack**: распарсил, пошатал деревья, собрал, сериализовал.
- **Terser**: распарсил, минифицировал, сериализовал.
- **ESLint**: распарсил, всё проверил, сериализовал.

## А как бы выглядел пайплайн здорового человека?

- Распарсили в AST.
- Всё протрансформировали и прочекали.
- Сериализовали в скрипты/стили и сорсмапы.

## Как избежать разъезжания результата и сорсмапа? text.tree!

```tree
line \{ 
indent
    line
        \foo
        \: 
        \123
line \ }
```

```javascript
{
    foo: 123
}

//# sourceMappingURL=data:application/json,
%7B%22version%22%3A3%2C%22sources%22%3A%5B%22
unknown%22%5D%2C%22sourcesContent%22%3A%5B%22
line%20%5C%5C%7B%5Cnindent%5Cn%5Ctline%5Cn%5C
t%5Ct%5C%5Cfoo%5Cn%5Ct%5Ct%5C%5C%3A%20%5Cn%5C
t%5Ct%5C%5C123%5Cnline%20%5C%5C%7D%5Cn%22%5D
%2C%22mappings%22%3A%22%3B%3BAAAA%2CAAAK%3BAACL
%2CAACC%2CCACC%2CGACA%2CEACA%3BAACF%2CAAAK%3B%22%7D
```

Открыть в [песочнице](http://tree.hyoo.ru/#pipeline=%24mol_tree2_from_string~%24mol_tree2_text_to_string_mapped_js/source=line%20%5C%7B%0Aindent%0A%09line%0A%09%09%5Cfoo%0A%09%09%5C%3A%20%0A%09%09%5C123%0Aline%20%5C%7D%0A).

## А если нужен WebAssembly? wasm.tree -> bin.tree

```tree
custom xxx

type xxx
	=> i32
	=> i64
	=> f32
	<= f64

import foo.bar func xxx
```

```tree
\00
\61
\73
\6D
\01
\00
\00
\00
```

Открыть в [песочнице](https://tree.hyoo.ru/#source=custom%20xxx%0A%0Atype%20xxx%0A%09%3D%3E%20i32%0A%09%3D%3E%20i64%0A%09%3D%3E%20f32%0A%09%3C%3D%20f64%0A%0Aimport%20foo.bar%20func%20xxx%0A/pipeline=%24mol_tree2_from_string~%24mol_tree2_wasm_to_bin~%24mol_tree2_bin_to_bytes~%24mol_wasm_module).

## Даже WASM с сорсмапингом?!

> [DWARF](http://dwarfstd.org/)

![](https://habrastorage.org/webt/9m/we/fk/9mwefkkbdbhd-_xafbib8bz4hfy.png)

## Ничего не забыли?

- Подсветка синтаксиса
- Подсказки
- Проверки
- Реафакторинги

## Единое расширение, чтобы править всеми.. Да ладно?!

![](https://i.imgur.com/QzecjIz.png)

## Что нужно для автоматической подсветки?

- Декларативное описание языка.
- Синтаксическая привязка к семантике.
- Без установки для каждого языка.
- Автоматическое скачивание схемы.
- Дефолтная эвристика.

## Куда-куда пойти?

- [nin-jin.github.io/slides/sourcemap](https://nin-jin.github.io/slides/sourcemap/) - эти слайды
- [tree.hyoo.ru](https://tree.hyoo.ru/) - песочница
- [lang_idioms](https://t.me/lang_idioms) - о разработке языков
- [`_jin_nin_`](https://twitter.com/_jin_nin_) - о JS

## Свидетельские показания

- ❌ Вначале было немного сложно сфокусироваться на проблематике.
- ❌ Сложновато и не видно, где это применять.
- ❌ Я так и не понял, зачем этот доклад нужен на этой конференции тему вроде раскрыл, но дезайн DSL несколько странный практическая применимость = 0.
- ❌ Название не соответствует заявленному (даже минимально), информация о sourcemap идет с 5 минуты по 35-ую, в остальное время автор вещает про свой фреймворк который не имеет никакого отношения к теме. Зря потратил время, лучше бы посмотрел другого автора.
- ✅ Прикольная тема и Дима даже почти отвязался от профдеформации с $mol.
- ✅ Интересный доклад. Дмитрий очень хорошо рассказал предметную область, осветил возможные проблемы и подумал об удобстве использования для пользователя. Очень круто!
