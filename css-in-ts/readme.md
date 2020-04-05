# Продвинутый CSS-in-TS

Вы можете [открыть это в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/css-in-ts/)

# Компоненты

```tree
$my_profile $mol_view sub /
    <= Menu $my_panel
    <= Info $my_panel

$my_panel $mol_view sub /
    <= Head $mol_view sub /
        <= Title $mol_button
    <= Body $mol_scroll
    <= Foot $mol_view
```

```typescript
class $my_profile extends $mol_view {
    Info() { return new $my_panel }
} )

class $my_panel extends $mol_view {

    Head() { return new $mol_view }
    Title() { return new $mol_button }
    Body() { return new $mol_scroll }
    Foot() { return new $mol_view }

} )
```

# Какие хотим стили

```typescript
$mol_style_define( $my_profile , {
    Info: {
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
