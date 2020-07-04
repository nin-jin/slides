# Деконструкция аббревиатур

> TDD SRP OCP LSP ISP DIP SOLID DRY KISS

Вы можете [открыть в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/abbr/)

## Деконструкция TDD

> Test Driven Development

### Суть TDD

![Pure TDD](https://habrastorage.org/webt/m7/wm/ts/m7wmts_olawooeqs5kcduncwgyy.png)

### Слепое пятно TDD

1. ❌ ⇝ ✅
2. ❌ ⇝ ✅
3. ❌ ⇝ ✅
4. ✅ ❓
5. ✅ ❓
6. ✅ ❓
7. ✅ ❓
8. ✅ ❓

После 3 цикла тесты будут сразу зелёные.

### Что делать, когда тест изначально зелёный?

- Ломать код
- Удалять тест
- Это невозможно

### Правильный TDD

![Fixed TDD](https://habrastorage.org/webt/r4/zf/fw/r4zffwtbquxcqfn19uu6qx9ij1i.png)

### Лишняя работа при TDD

| Tests | Code   |
|-------|--------|
| 1     | AAAAAA | ❌ ⇝ ✅
| 2     | BBBBBB | ✅❌ ⇝ ❌❌ ⇝ ✅✅
| 3     | CCCCCC | ✅✅❌ ⇝ ❌❌❌ ⇝ ✅✅✅
| 4     | CCCDDD | ✅✅✅❌ ⇝ ✅✅❌❌ ⇝ ✅✅✅✅
| 5     | CCCDDE | ✅✅✅✅❌ ⇝ ✅✅✅✅✅
| 6     | FFFFFF | ✅✅✅✅✅❌ ⇝ ❌❌❌❌❌❌ ⇝ ✅✅✅✅✅✅

### Когда TDD полезен

- Исправление дефектов
- Заранее известный контракт

### Когда TDD вреден

- RnD

### Программировать ли по TDD?

- Ритуализация ❌
- Там, где это уместно ✅
- Не зацикливаться ✅
