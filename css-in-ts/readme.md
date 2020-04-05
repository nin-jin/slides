# Продвинутый CSS-in-TS

Вы можете [открыть это в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/css-in-ts/)

# Что хотим получить

```typescript
$mol_style_define( $my_profile , {

    display: 'flex',
    
    Page: {
        Body: {
            margin: rem(5),
        }
    },
    
    $mol_button: {
        ':hover': {
            background: 'red'
        },
    },
    
} )
```

```typescript
class $my_profile extends $mol_view {

    Page() { return new $mol_page }
    
} )

class $my_page extends $mol_view {

    Head() { return new $mol_view }
    
    Body() { return new $mol_view }
    
    Foot() { return new $mol_view }
    
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
