# Скрипты в шаблонах или теги в скриптах или?

> Вы можете открыть эти слайды в [интерфейсе проведения презентаций](https://nin-jin.github.io/slides/templates/) или [читать их как статью](https://github.com/nin-jin/slides/blob/master/templates/).

Что такое "шаблоны", чем они так хороши и почему они не нужны?

# Скрипты в шаблонах?

> Что выбрать? Подход Angular с оживлением вёрстки с помощью директив? 

```html
<ul class="ecma-user-list">
    <li class="ecma-user-name"
        ng-repeat="name in names | orderBy:'length' track by $index"
        >
        {{name}}
    </li>
</ul>
```

# Теги в скриптах

> Или подход React c винегретом из двух языков?

```jsx
function Names( props ) {
    return (
        <ul class="ecma-user-list">{
            props.names.slice()
                .sort( ( a , b )=> a.length < b.length )
                .map( name => (
                    <li class="ecma-user-name">{ name }</li>
                ) )
        }</ul>
    )
}
```

> Или...

# Что такое шаблон?

> Пример с подстановкой текста в строку

```js
"Hello, ${name}!"
```

# А если обобщить?

> Пример со вставкой дерева в дерево

```
<xsl:template name="page">
    <acticle>
        <h1>
            <xsl:copy-of select="./head" />
        </h1>
        <xsl:copy-of select="./body" />
    </article>
</xsl:template>
```

# Основное свойство: расширение целевого формата

Шаблон:

```js
"Hello, ${name}!"
```

Не шаблон:

```js
"Hello" + name + "!"
```

> Шаблон буквально позволяет видеть результат, опуская вариативные детали.

# Но как добиться динамики?

> Некоторые части шаблона могут быть опциональными и зависеть от входящих данных.

# По шаблону на вариант?

> Будет много шалонов с копипастой. Будет комбинаторный взрыв числа шаблонов.

# Помечать опциональные части?

```
<a class="ecma-user-link" href="{{ link }}">
    {{#if isAdmin}}
        <span class="ecma-icon-crown"></span>
    {{/if}}
    <span class="ecma-user-name">{{ name }}</span>
</div>
```

> В простых случаях это ещё работает.

# А если сложная логика?

> Но по мере усложнения шаблона мы теряем возможность видеть результат, так как нам приходится в уме вычислять все условные выражения, чтобы понять, каков реально будет результат.

```
<a class="ecma-user-link" href="{{ link }}">
    {{#if isAdmin}}
        <span class="ecma-icon-crown"></span>
    {{else}}
        <span class="ecma-icon-person"></span>
    {{/if}}
    <span class="ecma-user-name">{{ name }}</span>
</div>
```

# А что если вообще без логики?

```
<a id="link" href="{{ link }}">
    <span id="icon_admin" class="ecma-icon-crown"></span>
    <span id="icon_member" class="ecma-icon-person"></span>
    <span id="name">{{ name }}</span>
</div>
```

> Казалось бы, мы сделали шаг назад и потеряли всю динамику. Однако, обратите внимание на то, что каждому блоку мы присвоили уникальный идентификатор.

# А как же логика?

> А для описания логики есть специально предназначенные языки:

```
function Ecma_user_link( dom ) {
    return {
        ... dom ,
        link_ : props => [
            props.isAdmin ? dom.icon_admin : dom.icon_member ,
            dom.name ,
        ] ,
    }
}
```
