# Продвинутый CSS-in-TS

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

[my_profile_details_body] [mol_button]:hover {
    background: 'red'
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
                ':hover': {
                    background: 'red'
                },
            },
        }
    },
} )
```

# Проблема девтулзов
# CSS свойства
# csstype
# Тесты для типов
# Кастомные типы свойств
# Юниты и декораторы
# Функции
# Псевдоклассы и псевдоэлементы
# Аттрибуты
# Медиа запросы
# БЭМ-элементы
# Фильтрация по над и под типам
# Рекурсивные типы
# Типы-отображения
# Вложенные блоки
# Непосредственно вложенные блоки
# Поиск классов по типу
# Что получилось
# Планы

* Рантайм чтение стилей до рендеринга
* Типизация всех свойств
* Все функции
* Анимации
