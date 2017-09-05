# Скрипты в шаблонах или шаблоны в скриптах или?

> Что выбрать? Подход Angular с [бананами в ящике](https://www.bennadel.com/blog/3008-two-way-data-binding-is-just-a-box-of-bananas-in-angular-2-beta-1.htm)? 

```html
<div ng-repeat="name in names | orderBy:'length' track by $index">
    {{name}}
</div>
```

> Или React c винегретом из двух языков

```jsx
function Names( props ) {
    return ( <div>{
        props.names.slice()
            .sort( ( a , b )=> a.length < b.length )
            .map( name => <div>{ name }</div> )
    }</div> )
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

> Шаблон буквально позволяет видель целевой результат, опуская вариативные детали.
