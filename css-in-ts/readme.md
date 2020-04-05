# Продвинутый CSS-in-TS

Вы можете [открыть это в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/css-in-ts/)

# Что хотим получить

```typescript
class $my_profile extends $mol_view {

    Menu() { return new $my_panel }
    
    Details() { return new $my_panel }
    
} )

class $my_panel extends $mol_view {

    Head() { return new $mol_view }
    
    Body() { return new $mol_view }
    
    Foot() { return new $mol_view }
    
} )
```

```typescript
$mol_style_define( $my_profile , {

    Details: {
        Body: {
            
            $mol_button: {
            
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
