# Что не так с сорсмапами и как с ними не связываться

Здравствуйте, меня звут Дмитрий Карловский и сегодня мы погрузимся во влажные мечты любого программиста - создание собственного языка программирования для веба.

![](https://habrastorage.org/webt/40/hj/vn/40hjvn5a3pm-0xlwdxf4kcorrhs.jpeg)

Это - слайды с выступления на HolyJS'21. Вы можете [читать их как статью](https://github.com/nin-jin/slides/tree/master/sourcemap), либо [открыть в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/sourcemap/).

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

## JS в песочнице?!?

- Да, это возможно: [sandbox.js.hyoo.ru](https://sandbox.js.hyoo.ru)
- JS слишком сложный

## Зачем? Фатальный недостаток

> Какой программист не хочет свой язык?

## Зачем? Транспиляция

- Babel и прочие транспайлеры
- Uglify и прочие минификаторы
- TypeScrit, AssemblyScript и прочие ЯП
- SCSS, Less, Stylus PostCSS и прочие CSS генераторы
- SVGO, CSSO и прочие оптимизаторы
- JSX, Pug, Handlebars и прочие шаблонизаторы
- MD, TeX и прочие языки разметки

## Зачем? Проверки при сборке

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
```

```sql
CREATE CLASS Task extends Model;
CREATE PROPERTY title string;
CREATE PROPERTY estimate string;
```

## Проблемы? Это не то, что я написал!

> *пример исходника и результата*

## Проблемы? Да тут чёрт ногу сломит!

> *пример сложного (минифицированного?) сгенерированного кода*

## Сорсмапы спешат на помощь! Исходники

> *скрин из девтулзов*

## Сорсмапы спешат на помощь! Отладчик

> *скрин с брейкпоинтом в VSCode*

## Сорсмапы спешат на помощь! Стек трейсы

> *скрин до и после загрузки сорсмап*

## Сорсмапы спешат на помощь! Переменные

> *скрин со значением переменной при наведении*

## Как работают сорсмапы

- Нужен исходник/стектрейс
- Скачиваем совсмап
- Налету подменяем

## История сорсмапов

- V1 - Internal Closure Inspector format
- [Proposal V2 2010](https://docs.google.com/document/d/1xi12LrcqjqIHTtZzrzZKmQ3lbTv9mKrN076UB-j3UZQ/edit?hl=en_US) +JSON -20%
- [Proposal V3 2013](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit) - 50%

## Крупицы информации

- [Introduction to JavaScript Source Maps](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
- [Source Maps: быстро и понятно](https://habr.com/ru/post/509250/)

## Как подключаются

HTTP заголовком:

    SourceMap: <url>

В конце JS:

    //# sourceMappingURL=<url>

В конце CSS:

    /*# sourceMappingURL=<url> */

# Формат сорсмапов

# Проблемы формата

# Пробуем генерить руками

- звиздец сложно
- носиться с ними во всех трансформациях
- носиться с ними в сообщениеях об ошибках

# Чёт сложно, нужна абстракция

# храним координаты в ast

# новые узлы создаём на базе существующих

# пайплайн

- загрузили аст
- трансфрмировали и почекали
- сериализовали в скрипты/стили и сорсмапы

# Хороший тон

- Укзывать на исходник, а не шаблон
- Генерить инструкции, а не выражения
- Прикладывать исходник

# Отладка трансформаций: AST курильщика

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

# Отладка трансформаций: AST здорового человека

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

# песочница трансформаций

# пилим свой dsl сразу на ast

- самый простой путь
- синтаксис специфический

# Ручная трансляция AST

```tree
click \$hyoo_tree.Root(0).Lights()
focus \$hyoo_tree.Root(0).Source_text().Edit()
```

```javascript
src.hack({
	click: ( i, belt )=> [
		i.struct( '()', [
			i.struct( 'document' ),
			i.struct( '[]', [
				i.data( 'getElementById' ),
			] ),
			i.struct( '(,)', [
				i.data( i.text() )
			] ),
			i.struct( '[]', [
				i.data( 'click' ),
			] ),
			i.struct( '(,)' ),
		] ),
	],
})
```

Открыть в [песочнице](https://tree.hyoo.ru/#pipeline=%24mol_js_eval~%24mol_tree2_js_to_text~%24mol_tree2_text_to_string~%24mol_js_eval/source=let%20src%20%3D%20%24mol_tree2_from_string%28%60%0A%09click%20%5C%5C%24hyoo_tree.Root%280%29.Lights%28%29%0A%09focus%20%5C%5C%24hyoo_tree.Root%280%29.Source_text%28%29.Edit%28%29%0A%60%29%0A%0Asrc%20%3D%20src.list%28%5B%0A%09src.struct%28%20'%7B%3B%7D'%2C%0A%09%09src.hack%28%7B%0A%0A%09%09%09click%3A%20%28%20i%2C%20belt%20%29%3D%3E%20%5B%0A%09%09%09%09i.struct%28%20'%28%29'%2C%20%5B%0A%09%09%09%09%09i.struct%28%20'document'%20%29%2C%0A%09%09%09%09%09i.struct%28%20'%5B%5D'%2C%20%5B%0A%09%09%09%09%09%09i.data%28%20'getElementById'%20%29%2C%0A%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%09i.struct%28%20'%28%2C%29'%2C%20%5B%0A%09%09%09%09%09%09i.data%28%20i.text%28%29%20%29%0A%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%09i.struct%28%20'%5B%5D'%2C%20%5B%0A%09%09%09%09%09%09i.data%28%20'click'%20%29%2C%0A%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%09i.struct%28%20'%28%2C%29'%20%29%2C%0A%09%09%09%09%5D%20%29%2C%0A%09%09%09%5D%2C%0A%0A%09%09%09focus%3A%20%28%20i%2C%20belt%20%29%3D%3E%20%5B%0A%09%09%09%09i.struct%28%20'%28%29'%2C%20%5B%0A%09%09%09%09%09i.struct%28%20'document'%20%29%2C%0A%09%09%09%09%09i.struct%28%20'%5B%5D'%2C%20%5B%0A%09%09%09%09%09%09i.data%28%20'getElementById'%20%29%2C%0A%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%09i.struct%28%20'%28%2C%29'%2C%20%5B%0A%09%09%09%09%09%09i.data%28%20i.text%28%29%20%29%0A%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%09i.struct%28%20'%5B%5D'%2C%20%5B%0A%09%09%09%09%09%09i.data%28%20'focus'%20%29%2C%0A%09%09%09%09%09%5D%20%29%2C%0A%09%09%09%09%09i.struct%28%20'%28%2C%29'%20%29%2C%0A%09%09%09%09%5D%20%29%2C%0A%09%09%09%5D%2C%0A%0A%09%09%09''%3A%20%28%29%3D%3E%20%5B%5D%0A%09%09%7D%29%2C%0A%09%29%2C%0A%5D%29%0A%0Areturn%20src)

# jack.tree - макро язык

```tree
script
	click \$hyoo_tree.Root(0).Lights()
	focus \$hyoo_tree.Root(0).Source_text().Edit()
```

```tree
hack script {;} from

hack click ()
	document
	[] \getElementById
	(,) data from
	[] \click
	(,)

hack focus ()
	document
	[] \getElementById
	(,) data from
	[] \focus
	(,)
```

Открыть в [песочнице](https://tree.hyoo.ru/#pipeline=%24mol_tree2_from_string~%24mol_jack_transform~%24mol_tree2_js_to_text~%24mol_tree2_text_to_string~%24mol_js_eval/source=hack%20script%20%7B%3B%7D%20from%0A%0Ahack%20click%20%28%29%0A%09document%0A%09%5B%5D%20%5CgetElementById%0A%09%28%2C%29%20data%20from%0A%09%5B%5D%20%5Cclick%0A%09%28%2C%29%0A%0Ahack%20focus%20%28%29%0A%09document%0A%09%5B%5D%20%5CgetElementById%0A%09%28%2C%29%20data%20from%0A%09%5B%5D%20%5Cfocus%0A%09%28%2C%29%0A%0Ascript%0A%09click%20%5C%24hyoo_tree.Root%280%29.Lights%28%29%0A%09focus%20%5C%24hyoo_tree.Root%280%29.Source_text%28%29.Edit%28%29%0A)

# хотим совсем свой синтаксис

- парсим в аст

# не только скрипты

- стили
- хтмл
- что угодно

# меняем таргеты налету (js/wasm?)

# даже wasm с сорсмапингом?!

# LS для IDE

- Привязка структур к узлам аст

# Подсветка синтаксиса

- для tree уже есть но можно сделать кастомизируемую
- для своего языка через парсинг в tree

