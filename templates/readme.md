# Скрипты в шаблонах или шаблоны в скриптах или?

> Что выбрать? Подход Angular с [бананами в ящике](https://www.bennadel.com/blog/3008-two-way-data-binding-is-just-a-box-of-bananas-in-angular-2-beta-1.htm)? 

```html
<ul class="ecma-user-list">
    <li class="ecma-user-name"
        ng-repeat="name in names | orderBy:'length' track by $index"
        >
        {{name}}
    </li>
</ul>
```

> Или React c винегретом из двух языков

```jsx
function Names( props ) {
    return ( <ul class="ecma-user-list">{
        props.names.slice()
            .sort( ( a , b )=> a.length < b.length )
            .map( name => (
                <li class="ecma-user-name">{ name }</li>
            ) )
    }</ul> )
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

