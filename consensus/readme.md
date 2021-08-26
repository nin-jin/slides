# Распределённый консенсус и пути его достижения

Вы можете [читать это как статью](https://github.com/nin-jin/slides/tree/master/consensus), либо [открыть в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/consensus/).

## Распределённые системы

## Consistency: Согласованность данных узла

## Consensus: Согласие между участниками

![](consensus.svg)

## Concurrency: Конкуренция за общий ресурс

![](concurrency.svg)

## Pessimistic Blocking: Пессимистичная блокировка

- Начинаем захват.
- Ждём захвата.
- Изменяем.
- Отпускаем.

## Optimistic Blocking: Оптимистичная блокировка

- Готовим изменение.
- Пытаемся применить.
- Если не получилось - всё с начала.

## Convergence: Сходимость к согласию

![](convergence.svg)

## Упорядоченная конвергенция

> OT: Operational Transformation

![](order.svg)

## Неупорядоченная конвергенция

> CvRDT: Conflict-free Convergent Replicated Data Type

![](unorder.svg)

## Частично упорядоченная конвергенция

> CmRDT: Conflict-free Commutative Replicated Data Type

![](semi-order.svg)

## Всё вместе

![](full.svg)

## Продолжение следует..

> ✅ Лайк
> ✅ Подписка
> ✅ Комментарий
> ✅ Поделись-ка
