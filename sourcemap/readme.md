# Что не так с сорсмапами и как с ними не связываться

Здравствуйте, меня зовут Дмитрий Карловский и сегодня мы погрузимся во влажные мечты любого программиста - создание собственного языка программирования для веба.

![](https://habrastorage.org/webt/40/hj/vn/40hjvn5a3pm-0xlwdxf4kcorrhs.jpeg)

Это - слайды с выступления на HolyJS'21. Вы можете [читать их как статью](https://github.com/nin-jin/slides/tree/master/sourcemap), либо [открыть в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/sourcemap/).

## Чем я занимаюсь?

- Формат tree
- Язык view.tree
- Фреймворк $mol

## Зачем? Без DSL один бойлерплейт

```tree
$my_app $my_page
    title @ \Are you ready for SPAM?
    body /
        <= Agree $my_checkbox
            checked?val <=> agree?val true
```

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

## Зачем? Пользовательские скрипты

```javascript
@assignee = $me
@component = \Frontend
@estimate ?= 1D
@deadline = $prev.@deadline + @estimate
```

## JS в песочнице? Это законно?!7

[sandbox.js.hyoo.ru](https://sandbox.js.hyoo.ru)

![sandbox.js.hyoo.ru](https://sandbox.js.hyoo.ru)

## JS? Не для средних умов..

![](https://habrastorage.org/webt/ao/yq/5p/aoyq5pthfqsvo7mhyarqrsse3ug.png)

## Зачем? Фатальный недостаток

![](https://habrastorage.org/webt/bf/r_/dx/bfr_dxmy-xwvpql8fxv3x1c2vha.jpeg)

## Зачем? Транспиляция и проверки!

- Babel и прочие транспайлеры
- Uglify и прочие минификаторы
- TypeScrit, AssemblyScript и прочие ЯП
- SCSS, Less, Stylus PostCSS и прочие CSS генераторы
- SVGO, CSSO и прочие оптимизаторы
- JSX, Pug, Handlebars и прочие шаблонизаторы
- MD, TeX и прочие языки разметки
- TypeScript, FlowJS, Hegel и прочие тайпчекеры
- ESLint и прочие линтеры
- Pretier и прочие форматтеры

## Зачем? Разные таргеты

- JS
- WASM
- GPU
- JVM
- CIL

## Одна модель, чтобы править всеми

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

## Проблемы? Это не то, что я написал!

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

## Проблемы? Да тут чёрт ногу сломит!

```markdown
Hello, **World**!
```

```javascript
function make_dom(e){{const t=document.createTextNode("Hello, ");
e.appendChild(t)}{const t=document.createElement("strong");
(e=>{const t=document.createTextNode("World");e.appendChild(t)})(t),
e.appendChild(t)}{const t=document.createTextNode("!");e.appendChild(t)}}
```

## Сорсмапы спешат на помощь! Исходники

> *скрин из девтулзов*

## Сорсмапы спешат на помощь! Отладчик

> *скрин с брейкпоинтом в VSCode*

## Сорсмапы спешат на помощь! Стек трейсы

> *скрин до и после загрузки сорсмап*

## Сорсмапы спешат на помощь! Переменные

> *скрин со значением переменной при наведении*

## Как работают сорсмапы?

- Нужен исходник/стектрейс
- Скачиваем сорсмап
- Налету подменяем

## Спецификация? Не, не слышал!

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

	target_relative_column

...

	target_relative_column
	source_relative_index
	source_relative_row
	source_relative_column
	source_variable_name?

## Как же сорсмапы хороши! Был бы исходник..

> *Пример отображения с кодом вне исходника*

## Нет Исходника? Шаблоны!

> *Пример включения кода из шаблона*

## Нет исходника? Собери свой!

> *Пример собранного исходника и маппинга*

## Как же сорсмапы хороши! Был бы результат..

> *Пример мапинга с вырезанным кодом*

## Нет результата? Мапим на начало!

> *Пример мапинга показывающий почему это не работает из-за слияния спанов*

## Нет результата? Мапим в конец!

> *Пример мапинга показывающий почему и это не работает при конкатенации*

## Как же сорсмапы хороши! Если бы не имена переменных..

- Только имена переменных, никаких выражений
- Только полное совпадение

## Как же сорсмапы хороши! Если бы не макросы..

- Место объявления макроса
- Место применения макроса

## Как же сорсмапы хороши! Если бы не evil..

> *пример функции-обёртки для new Function из-за чего маппинги съезжают + хак*

## Как же сорсмапы хороши! Что-то пошло не так..

> Карты Таро
> Натальные карты
> Гугл Карты

## Пробуем генерить руками..

- Сложно само по себе
- Носиться с ними во всех трансформациях
- Носиться с ними в сообщениеях об ошибках

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
        path.arrowFunctionToExpression({
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
    callExpression(
        memberExpression(
            nameFunction(this, true) || this.node,
            identifier("bind"),
        ),
        [checkBinding ? identifier(checkBinding.name) : thisExpression()],
    ),
);
```

# Займёмся отладкой? AST курильщика..

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

# Займёмся отладкой? AST здорового человека!

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

## $mol_tree2 + $mol_span = проще не куда!

```typescript
type $mol_tree2 = {
    readonly type: string
    readonly value: string
    readonly kids: $mol_tree2[]
    readonly span: $mol_span[]
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

## Как не протерять координаты?

```typescript
interface $mol_tree2 {
    struct( type , kids ): $mol_tree2
    data( value , kids ): $mol_tree2
    list( kids ): $mol_tree2
    clone( kids ): $mol_tree2
}
```

## Пайплайн

- Распарсили в AST.
- Всё протрансфрмировали и прочекали.
- Сериализовали в скрипты/стили и сорсмапы.

# пилим свой dsl сразу на ast

- самый простой путь
- синтаксис специфический

# Ручная трансляция AST

```tree
click \$my_app.Root(0).Task(0)
click \$my_app.Root(0).Details().TrackTime()
```

```javascript
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
```

Открыть в [песочнице](https://tree.hyoo.ru/#pipeline=%24mol_js_eval~%24mol_tree2_js_to_text~%24mol_tree2_text_to_sourcemap_vis/source=let%20src%20%3D%20%24mol_tree2_from_string%28%60%0A%09click%20%5C%5C%24my_app.Root%280%29.Task%280%29%0A%09click%20%5C%5C%24my_app.Root%280%29.Details%28%29.TrackTime%28%29%0A%60%29%0A%0Asrc%20%3D%20src.list%28%5B%0A%09src.struct%28%20'%7B%3B%7D'%2C%0A%09%09src.hack%28%7B%0A%0A%09%09%09click%3A%20%28%20click%2C%20belt%20%29%3D%3E%20%7B%0A%09%09%09%09const%20id%20%3D%20click.kids%5B0%5D%0A%09%09%09%09return%20%5B%0A%09%09%09%09%09click.struct%28%20'%28%29'%2C%20%5B%0A%09%09%09%09%09%09id.struct%28%20'document'%20%29%2C%0A%09%09%09%09%09%09id.struct%28%20'%5B%5D'%2C%20%5B%0A%09%09%09%09%09%09%09id.data%28%20'getElementById'%20%29%2C%0A%09%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%09%09id.struct%28%20'%28%2C%29'%2C%20%5B%20id%20%5D%20%29%2C%0A%09%09%09%09%09%09click.struct%28%20'%5B%5D'%2C%20%5B%0A%09%09%09%09%09%09%09click.data%28%20'click'%20%29%2C%0A%09%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%09%09click.struct%28%20'%28%2C%29'%20%29%2C%0A%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%5D%0A%09%09%09%7D%2C%0A%0A%09%09%09''%3A%20%28%29%3D%3E%20%5B%5D%0A%0A%09%09%7D%29%2C%0A%09%29%2C%0A%5D%29%0A%0Areturn%20src).

# jack.tree - макро язык

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

# хотим совсем свой синтаксис

- парсим в аст

## Правила хорошего тона генерации сорсмап

- Укзывать на исходник, а не шаблон
- Генерить инструкции, а не выражения
- Прикладывать исходник

## text.tree

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

Открыть в [песочнице](http://localhost:9080/hyoo/tree/-/test.html#pipeline=%24mol_tree2_from_string~%24mol_tree2_text_to_string_mapped_js/source=line%20%5C%7B%0Aindent%0A%09line%0A%09%09%5Cfoo%0A%09%09%5C%3A%20%0A%09%09%5C123%0Aline%20%5C%7D%0A).

## Не только скрипты

- CSS
- HTML
- Whatever

## wasm.tree -> bin.tree

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

## Пофантазируем? Сорсмапы здорового человека!

| Field         | Bytes Count
|---------------|------------
| source_offset | 3
| source_length | 3
| target_length | 2

## Трансформируем в JS, вырезая локализацию

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

## Вычленяем переводы, игнорируя логику

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

## Меняем трансформации как перчатки

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

## LS для IDE?

- Привязка структур к узлам аст

## Обратные трансформации?

## Что там с радугой?

- для tree уже есть но можно сделать кастомизируемую
- для своего языка через парсинг в tree

## Песочница

![tree.hyoo.ru](https://tree.hyoo.ru/)

# Куда-куда пойти?

- [nin-jin.github.io/slides/sourcemap](https://nin-jin.github.io/slides/sourcemap/) - эти слайды
- [tree.hyoo.ru](https://tree.hyoo.ru/) - песочница
- [lang_idioms](https://t.me/lang_idioms) - о разработке языков
- [_jin_nin_](https://twitter.com/_jin_nin_) - о JS
