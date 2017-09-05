# Скрипты в шаблонах или теги в скриптах или?

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

> Шаблон:

```js
"Hello, ${name}!"
```

> Не шаблон:

```js
"Hello" + name + "!"
```

> Шаблон буквально позволяет видеть результат, опуская вариативные детали.

# Но как добиться динамики?

> Некоторые части шаблона могут быть опциональными и зависять о входящих данных.

# По шаблону на вариант?

> Будет много шалонов с копипастой. Будет комбинаторный взрыв числа шаблонов.

# Помечать опциональные части?

```
<a class="ecma-user-link" href="{{ link }}">
    {{#if isAdmin}}
        <span class="ecma-icon-crown"></span>
    {{else}}
        <span class="ecma-icon-person"></span>
    {{/if}}
    <span class="ecma-user-name">
        {{ name }}
    </span>
</div>
```

# А если сложная логика?

> В простых случаях это работает, но по мере усложнения шаблона мы теряем возможность видеть результат, так как нам приходится в уме вычислять все условные выражения, чтобы понять, каков реально будет результат.

```
<a class="ecma-user-link" href="{{ link }}">
    {{#if isAdmin}}
        <span class="ecma-icon-crown"></span>
    {{else}}
        <span class="ecma-icon-person"></span>
    {{/if}}
    <span class="ecma-user-name">
        {{ name }}
    </span>
</div>
```
