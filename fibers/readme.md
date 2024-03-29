# Quantum Mechanics of Calculations in JS

Здравствуйте, меня зовут Дмитрий Карловский и я.. безработный. Поэтому у меня есть много свободного времени для занятия музыкой, спортом, творчеством, языками, JS-конференциями и компьютерной наукой. О последнем исследовании в области полуавтоматического разбиения долгих вычислений на небольшие кванты по несколько миллисекунд, в результате которого появилась миниатюрная библиотека `$mol_fiber`, я вам сегодня и расскажу. Но сперва, давайте обозначим проблемы, которые мы будем решать..

![Кванты!](https://nin-jin.github.io/slides/fibers/quants.gif)

Это - текстовая версия одноимённого выступления на [HolyJS 2018 Piter](https://holyjs-piter.ru/). Вы можете либо [читать её как статью](https://github.com/nin-jin/slides/blob/master/fibers/readme.md), либо [открыть в интерфейсе проведения презентаций](https://nin-jin.github.io/slides/fibers/), либо [посмотреть видеозапись](https://www.youtube.com/watch?v=7RMXX4Hmz10).

# Issue: Low responsiveness

Если мы хотим иметь стабильные 60 кадров в секунду, то у нас есть всего 16 с мелочью миллисекунд, чтобы выполнить все работы, включая те, что делает браузер, чтобы показать результаты на экране.

Но что если мы займём поток на большее время? Тогда пользователь будет наблюдать лагающий интерфейс, тормозящую анимацию и тому подобные ухудшения UX.

![Низкая отзывчивость](https://nin-jin.github.io/slides/fibers/low-fps.gif)

# Issue: No escape

Бывает, что пока мы выполняем вычисления, результат их нам уже не интересен. Например, у нас есть виртуальный скролл, пользователь им активно дёргает, но мы не поспеваем за ним и не можем отрендерить актуальную область, пока рендеринг предыдущей не вернёт нам управление, чтобы обработать события пользователя.

![Нельзя отменить](https://nin-jin.github.io/slides/fibers/no-escape.jpg)

В идеале, какую бы долгую работу мы ни выполняли, мы должны продолжать обрабатывать события и иметь возможность в любой момент отменить начатую, но ещё не законченную работу.

# I'm fast and I know it

Но что если работа у нас не одна, а несколько, но поток-то один? Представьте, что гоните вы на своём свежеприобретённом жёлтом лотусе и подъезжаете к железнодорожному переезду. Когда он свободен, вы можете проскочить его за долю секунды. Но..

![Крутая тачка](https://nin-jin.github.io/slides/fibers/lotus.jpeg)

# Issue: No concurrency

Когда переезд занят километровым составом, вам приходится стоять и ждать десять минут, пока он не проедет. Не для того вы покупали спорт кар, правда?

![Быстрые ждут медленных](https://nin-jin.github.io/slides/fibers/no-concurrency.gif)

А как было бы классно, если бы этот состав был разбит на 10 составов по 100 метров и между ними было бы несколько минут, чтобы проскочить! Вы бы тогда не так уж сильно и задержались.

Итак, какие сейчас существуют решения этих проблем в мире JS?

# Solution: Workers

Первое, что приходит на ум: а давайте мы просто вынесем все сложные вычисления в отдельный поток? Для этого у нас есть механизм WebWorker-ов.

![Логика работы с Workers](https://nin-jin.github.io/slides/fibers/worker-logic.png)

События из UI-потока передаются в воркер. Там они обрабатываются и обратно уже передаются инструкции, что и как изменить на странице. Таким образом мы избавляем UI поток от большого пласта вычислений, но проблемы таким образом решаются не все, и кроме того добавляются новые.

# Workers: Issues: (De)Serialization

Общение между потоками происходит посредством посылки сообщений, которые сериализуются в поток байт, передаются в другой поток, а там парсятся в объекты. Всё это гораздо медленнней, чем прямой вызов метода в рамках одного потока.

![(Де)сериализация](https://nin-jin.github.io/slides/fibers/de-serialization.jpg)

# Workers: Issues: Asynchronous only

Сообщения передаются строго асинхронно. А это значит, что некоторые возможности вам попросу недоступны. Например, вы не можете остановить всплытие ui-события из воркера, так как к моменту запуска обработчика, событие в UI-потоке уже завершит свой жизненный цикл.

![Очереди сообщений](https://nin-jin.github.io/slides/fibers/async-only.png)

# Workers: Issues: Limited API’s

В воркерах нам не доступны следующие API..

- DOM, CSSOM
- Canvas
- GeoLocation
- History & Location
- Sync http requests
- XMLHttpRequest.responseXML
- Window

# Workers: Issues: Can’t cancel

И опять же, у нас нет возможности остановить вычисления в вокере. 

![Остановите это!](https://nin-jin.github.io/slides/fibers/stop.jpg)

Да, мы можем остановить весь воркер, но это остановит все задачи в нём.
Да, можно каждую задачу запускать в отдельном воркере, но это очень ресурсоёмко.

# Solution: React Fiber

Наверняка многие слышали, как FaceBook героически переписал React, разбив все вычисления в нём на кучу мелких функций, запускающихся специальным планировщиком.

![Хитрая логика React Fiber](https://nin-jin.github.io/slides/fibers/react-logic.png)

Я не буду вдаваться в детали его реализации, так как это отдельная большая тема. Отмечу лишь некоторые особенности, из-за которых он возможно вам не подойдёт..

# React Fiber: React required

Очевидно, если вы используете Angular, Vue или другой фреймворк отличный от React, то React Fiber для вас бесполезен.

![React Everywere!](https://nin-jin.github.io/slides/fibers/react-everywhere.jpg)

# React Fiber: Only rendering

React - покрывает лишь слой рендеринга. Все остальные слои приложения остаются без какого-либо квантования.

![Не так быстро!](https://nin-jin.github.io/slides/fibers/react-only.gif)

React Fiber не спасёт вас, когда нужно, например, отфильтровать большой блок данных по хитрым условиям.

# React Fiber: Quantization is disabled

Не смотря на заявленную поддержку квантования, она до сих пор выключена по умолчанию, так как ломает обратную совместимость.

![Маркетинговая ловушка](https://nin-jin.github.io/slides/fibers/react-trap.jpg)

Квантование в React всё ещё является экспериментальной штукой. Будьте осторожны!

# React Fiber: Debug is pain

При включении квантования, callstack перестаёт соответствовать вашему коду, что существенно усложняет отладку. Но к этому вопросу мы ещё вернёмся.

![Вся боль отладки](https://nin-jin.github.io/slides/fibers/react-debug.jpg)

# Solution: quantization

Давайте попробуем обобщить подход React Fiber так, чтобы избавиться от упомянутых недостатков. Мы хотим оставаться в рамках одного потока, но разбивать долгие вычисления на небольшие кванты, между которыми браузер может отрендерить уже внесённые на страницу изменения, а мы отреагировать на события.

![flame charts](https://nin-jin.github.io/slides/fibers/flame-chart.png)

Сверху вы видите долгое вычисление, которое остановило весь мир более чем на 100мс. А снизу - то же самое вычисление, но разбитое на кванты времени по примерно 16мс, что дало в среднем 60 кадров в секунду. Поскольку мы как правило не знаем сколько именно по времени займут вычисления, мы не можем заранее вручную разбить его на кусочки по 16мс. поэтому нам нужен какой-то рантайм механизм, отмеряющий время выполнения задачи и при превышении размера кванта, ставящий исполнение на паузу до следующего фрейма анимации. Давайте подумаем, какие у нас есть механизмы для реализации таких вот приостанавливаемых задач..

# Concurrency: fibers – stackfull coroutines

В таких языках как Go и D есть такая идиома как "сопрограмма со стеком", она же "файбер" или "волокно". 

```typescript
import { Future } from 'node-fibers'

const one = ()=> Future.wait( future => setTimeout( future.return ) )

const two = ()=> one() + 1
const three = ()=> two() + 1
const four = ()=> three() + 1

Future.task( four ).detach()
```

В примере кода вы видите функцию `one`, которая умеет приостанавливать текущий файбер, но сама при этом имеет вполне себе синхронный интерфейс. Функции `two`, `three` и `four` - обычные синхронные функции, которые ничего не знают про файберы. В них вы можете использовать все возможности яваскрипта по полной программе. И, наконец, на последней строке мы просто запускаем функцию `four` в отдельном файбере.

Использовать файберы довольно удобно, но для их поддержки нужна поддержка рантайма, которой нет у большинства JS интерпретаторов. Однако, для NodeJS есть нативное расширение `node-fibers`, добавляющее эту поддержку. К сожалению, ни в одном браузере файберы не доступны.

# Concurrency: FSM – stackless coroutines

В таких языках как C# и теперь уже JS есть поддержка "бесстековых сопрограмм" или "асинхронных функций". Такие функции представляют из себя под капотом конечный автомат и ничего не знают про стек, поэтому их приходится помечать специальным ключевым словом "async", а места, где они могут приостанавливаться - "await".

```typescript
const one = ()=> new Promise( done => setTimeout( done ) )

const two = async ()=> ( await one() ) + 1
const three = async ()=> ( await two() ) + 1
const four = async ()=> ( await three() ) + 1

four()
```

Так как нам может потребоваться отложить вычисление в любой момент, то получается, что асинхронными придётся сделать чуть ли не вообще все функции в приложении. Это мало того, что усложнение кода, так ещё и сильно бьёт по производительности. Кроме того, многие API, принимающие колбэки, всё ещё не поддерживают асинхронные колбэки. Яркий пример - метод `reduce`, любого массива.

# Concurrency: semi-fibers - restarts

Давайте попробуем сделать что-то похожее на файберы, используя лишь те возможности, что доступны нам в любом современном браузере..

```typescript
import { $mol_fiber_async , $mol_fiber_start } from 'mol_fiber/web'

const one = ()=> $mol_fiber_async( back => setTimeout( back ) )

const two = ()=> one() + 1
const three = ()=> two() + 1
const four = ()=> three() + 1

$mol_fiber_start( four )
```

Как можно заметить, промежуточные функции ничего не знают про прерывание - это обычный JS. Только функция `one` знает про возможность приостановки. Чтобы прервать вычисление она просто кидает `Promise` в качестве исключения. На последней строке мы запускаем функцию `four` в отдельном псевдофайбере, который отслеживает брошенные внутри исключения и если ему прилетает `Promise`, то подписывается на его `resolve`, чтобы потом перезапустить файбер.

# Figures

Чтобы показать, как работают псевдофайберы, напишем не хитрый код..

![Типичная диаграмма исполнения](https://nin-jin.github.io/slides/fibers/sync-0.svg)

Давайте представим, что функция `step` у нас пишет что-то в консоль и делает ещё какую-то тяжёлую работу на 20мс. А функция `walk` дважды вызывает `step`, логируя весь процесс. По середине будет показываться, что сейчас выводится в консоль. А справа - состояние дерева псевдофайберов.

# $mol_fiber: no quantization

Давайте запустим этот код и посмотрим, что происходит..

![Исполнение без квантизации](https://nin-jin.github.io/slides/fibers/sync-1.svg)

Пока что всё просто и очевидно. Дерево псевдофайберов, конечно, не задействовано. И всё бы хорошо, но этот код исполняется более 40 мс, что никуда не годится.

# $mol_fiber: cache first

Завернём обе функции в специальную обёртку, запускающую её в псевдофайбере и посмотрим, что происходит..

![Заполнение кешей](https://nin-jin.github.io/slides/fibers/cache-1.svg)

Тут стоит обратить внимание на то, что для каждого места вызова функции `one` внутри файбера `walk`, был создан отдельный файбер. Результат первого вызова был закеширован, а вот вместо второго был брошен `Promise`, так как мы исчерпали наш квант времени.

# $mol_fiber: cache second

Брошенный в первом фрейме `Promise` будет автоматически зарезолвлен в следующем, что приведёт к перезапуску файбера `walk`..

![Реиспользование кешей](https://nin-jin.github.io/slides/fibers/cache-2.svg)

Как можно заметить, из-за перезапуска мы вновь вывели в консоль "start" и "first done", но вот "first begin" уже нет, так как он находится в файбере, с заполненным ранее кешом, из-за чего его хендлер более не вызывается. Когда же заполняется кэш файбера `walk` все вложенные файберы уничтожаются, так как к ним исполнение уже никогда не дойдёт.

Так почему `first begin` вывелся один раз, а `first done` - два? Всё дело в идемпотентности. `console.log` - неидемпотентная операция, сколько раз её вызовешь, столько раз она добавит запись в консоль. А вот файбер, исполняющий в другом файбере, - идемпотентен, он исполняет хендлен лишь при первом вызове, а при последующих сразу возвращает результат из кеша, не приводя ни к каким доволнительным побочным действиям.

# $mol_fiber: idempotence first

Давайте завернём `console.log` в файбер, тем самым сделав её идемпотентной, и посмотрим, как поведёт себя программа..

![заполнение идемпотентных кешей](https://nin-jin.github.io/slides/fibers/idemp-1.svg)

Как видите, теперь в дереве файберов у нас появились записи для каждого вызова функции `log`.

# $mol_fiber: idempotence second

При следующем перезапуске файбера `walk`, повторные вызовы функции `log` уже не приводят к вызовам настоящей `console.log`, но как только мы доходим до исполнения файберов с незаполненным кешом, то вызовы `console.log` возобновляются.

![Реиспользование идемпотентных кешей](https://nin-jin.github.io/slides/fibers/idemp-2.svg)

Обратите внимание, что в консоли у нас теперь не выводится ничего лишнего - ровно то, что выводилось бы в синхронном коде без каких-либо файберов и квантификации.

# $mol_fiber: break

Как происходит прерывание вычисления? В начале кванта устанавливается дедлайн. А перед запуском каждого файбера проверяется, не достигли ли мы его. И если достигли, то бросается `Promise`, который резолвится уже в следующем фрейме и начинает новый квант..

```typescript
if( Date.now() > $mol_fiber.deadline ) {
	throw new Promise( $mol_fiber.schedule )
}
```

# $mol_fiber: deadline

Дедлайн для кванта устанавливается просто. К текущему времени прибавляется 8 миллисекунд. Почему именно 8, ведь на подготовку кадра есть целых 16? Дело в том, что мы не знаем заранее сколько времени потребуется браузеру для рендеринга, поэтому надо оставить некоторое время для его работы. Но порой бывает, что браузеру ничего рендерить не надо, и тогда при 8мс квантах мы можем всунуть ещё один квант в тот же кадр, что даст плотную упаковку квантов с минимальным простоем процессора.

```typescript
const now = Date.now()

const quant = 8

const elapsed = Math.max( 0 , now - $mol_fiber.deadline )
const resistance = Math.min( elapsed , 1000 ) / 10 // 0 .. 100 ms

$mol_fiber.deadline = now + quant + resistence
```

Но если мы будем просто кидать исключение каждые 8мс, то отладка со включённой остановкой на исключениях превратится в маленький филиал ада. Нам нужен какой-то механизм для детектирования этого режима отладчика. К сожалению, понять это можно лишь косвенно: человеку, чтобы понять продолжать ли исполнение или нет, требуется время порядка секунды. А это значит, что если управление не возвращалось скрипту продолжительное время, то либо была остановка отладчика, либо было тяжёлое вычисление. Чтобы усидеть на обоих стульях мы добавляем ко кванту 10% от прошедшего времени, но не более 100 мс. Это не сильно влияет на FPS, зато на порядок снижает частоту остановки отладчика из-за квантования. 

# Debug: try/catch

Раз уж речь зашла об отладке, то как вы думаете в каком месте этого кода остановится отладчик?

```typescript
function foo() {
	throw new Error( 'Something wrong' ) // [1]
}

try {
	foo()
} catch( error ) {
	handle( error )
	throw error // [2]
} 
```

Как правило нужно, чтобы он останавливался там, где исключение бросается первый раз, но реальность такова, что он останавливается лишь там, где оно было брошено последний раз, что как правило весьма далеко от места его возникновения. Поэтому, чтобы не усложнять отладку, исключения никогда не должны перехватываться, через try-catch. Но и совсем без обработки исключений нельзя.

# Debug: unhandled events

Обычно рантайм предоставляет глобальное событие, которое возникает для каждого неперехваченного исключения..

```typescript
function foo() {
	throw new Error( 'Something wrong' )
}

window.addEventListener( 'error' , event => handle( event.error ) )

foo()
```

Помимо громоздкости, у этого решения есть такой недостаток, что сюда валятся вообще все исключения и довольно сложно понять из какого файбера и файбера ли возникло событие.

# Debug: Promise

Наилучшим решением для обработки исключений являются обещания..

```typescript
function foo() {
	throw new Error( 'Something wrong' )
}

new Promise( ()=> {
	foo()
} ).catch( error => handle( error ) ) 
```

Переданная в Promise функция вызывается тут же, синхронно, но исключение не перехватывается и благополучно останавливает отладчик в месте его возникновения. Чуть позже, асинхронно уже вызывает обработчик ошибки, в котором мы точно знаем какой именно файбер дал сбой и какой именно сбой. Именно такой механизм и используется в $mol_fiber.

# Stack trace: React Fiber

Давайте взглянем на стектрейс, который вы получаете в React Fiber..

![Бессодержательный стектрейс](https://nin-jin.github.io/slides/fibers/react-stack.png)

Как можно заметить, мы получаем много кишочков Реакта. Из полезного тут только точка возникновения исключения и имена компонент выше по иерархии. Не густо.

# Stack trace: $mol_fiber

В $mol_fiber мы получаем куда более полезный стектрейс: никаких кишок, только конкретные точки в прикладном коде, через которые он пришёл к исключению.

![Содержательный стектрейс](https://nin-jin.github.io/slides/fibers/fiber-stack.png)

Достигается это за счёт использования нативного стека, обещаний и автоматического удаления кишок. При желании вы можете развернуть ошибку в консоли, как на скриншоте, и увидеть кишки, но там ничего интересного.

# $mol_fiber: handle 

Итак, для прерывания кванта кидается Promise..

```typescript
limit() {
	if( Date.now() > $mol_fiber.deadline ) {
		throw new Promise( $mol_fiber.schedule )
	}
	// ...
}
```

Но, как можно догадаться, Promise может быть совершенно любой - файберу вообще говоря не важно чего ждать: следующего фрейма, завершения загрузки данных или ещё чего..

```typescript
fail( error : Error ) {
	if( error instanceof Promise ) {
		const listener = ()=> self.start()
		return error.then( listener , listener )
	}
	// ...
}
```

Файбер просто подписывается на resolve обещания и перезапускается. Но вручную кидать и ловить обещания нет необходимости, ведь в комплект входят несколько полезных обёрток..

# $mol_fiber: functions

Чтобы превратить любую синхронную функцию в идемпотентный файбер достаточно завернёть её в `$mol_fiber_func`..

```typescript
import { $mol_fiber_func as fiberize } from 'mol_fiber/web'

const log = fiberize( console.log )

export const main = fiberize( ()=> {
	log( getData( 'goo.gl' ).data )
} ) 
```

Тут мы сделали `console.log` идемпотентным, а `main` научили прерываться в ожидании загрузки.

# $mol_fiber: error handling

Но как реагировать на исключительные ситуации, если мы не хотим использовать `try-catch`? Тогда мы можем зарегистрировать обработчик ошибки посредством `$mol_fiber_catch`... 

```typescript
import { $mol_fiber_func as fiberize , $mol_fiber_catch as onError } from 'mol_fiber'

const getConfig = fiberize( ()=> {

	onError( error => ({ user : 'Anonymous' }) )

	return getData( '/config' ).data

} )
```

Если мы вернём в нём что-то отличное от ошибки, то оно станет результатом работы текущего файбера. В данном примере в случае невозможности загрузить конфиг с сервера функция `getConfig` вернёт конфиг по умолчанию.

# $mol_fiber: methods

Разумеется оборачивать можно не только функции, но и методы, посредством декоратора..

```typescript
import { $mol_fiber_method as action } from 'mol_fiber/web'

export class Mover {

	@action
	move() {
		sendData( 'ya.ru' , getData( 'goo.gl' ) )
	}

} 
```

Тут, например, мы выгрузили данные с Гугла и загрузили их на Яндекс.

# $mol_fiber: promises

Чтобы загрузить данные с сервера достаточно взять, например, асинхронную функцию `fetch` и лёгким движением руки превратить её в синхронную..

```typescript
import { $mol_fiber_sync as sync } from 'mol_fiber/web'

export const getData = sync( fetch )
```

Всем хороша эта реализация, да вот не поддерживает отмену запроса при разрушении дерева файберов, поэтому усложним код..

# $mol_fiber: cancel request

```typescript
import { $mol_fiber_sync as sync } from 'mol_fiber/web'

export const getData = sync( ( input : RequestInfo , init : RequestInit = {} )=> {

	var controller = new AbortController()
	$mol_fiber.current.abort = controller.abort.bind( controller )
	init.signal = controller.signal
		
	return fetch( input , init )

}
```

Тут у нас обычная асинхронная функция, но с особенностью - текущему файберу мы передаём колбэк `abort`, который будет автоматически вызван при разрушении файбера.

# $mol_fiber: cancel response

Со стороны сервера тоже может быть полезно отменять вычисления, когда клиент отвалился. Давайте реализуем обёртку над `midleware`, которая будет создавать файбер, в которм будет запускаться оригинальный `midleware`. А в случае отключения клиента, она будет уничтожать файбер, что приведёт к разрушению всего дерева файберов, отмене всех внешних запросов и тп.

```typescript
import { $mol_fiber_make as Fiber } from 'mol_fiber'

const middle_fiber = middleware => ( req , res ) => {

	const fiber = Fiber( ()=> middleware( req , res ) )
	
	req.on( 'close' , ()=> fiber.destructor() )
	
	fiber.start()
}

app.get( '/foo' , middle_fiber( ( req , res ) => {
	// do something
} ) )
```

# $mol_fiber: concurrency

Файберы дают возможность не только отменять запросы, но и выполнять их конкуретно в рамках одного потока. Давайте представим, что клиент делает 3 запроса: первый требует долгих вычислений, второй почти их не требует, а последний где-то между..

![Быстрые и медленные запросы](https://nin-jin.github.io/slides/fibers/server-chart.png)

Сверху вы видите вариант без квантизации: пока не закончится первый долгий запрос, остальные стоят его ждут. Красным помечено обработкой какого запроса занят процессор. Во втором же случае мы воспользовались квантизацией, в результате чего быстрые запросы спокойно пролетели, пока долгие вычислялись.

# $mol_fiber: properties

Что ж, пришло время подвести итоги..

> **Pros:**
> - Runtime support isn’t required
> - Can be cancelled at any time
> - High FPS
> - Concurrent execution
> - Debug friendly
> - ~ 3KB gzipped

> **Cons:**
> - Instrumentation is required
> - All code should be idempotent
> - Longer total execution

$mol_fiber - не волшебная пилюля, которую принял и вот у вас всё стало шоколадно. Это - инструмент, который может помочь вам автоматически квантовать вычисления не превращая код в лапшу. Но применять его нужно с умом, понимая, что и зачем делаешь. Кроме того, стоит иметь ввиду, что это всё ещё эксперимент, который испытан в лабораторных условиях, но в бою ещё не опробован. Будет классно, если вы поиграетесь с этой технологией и поделитесь обратной связью. Спасибо за внимание и не стесняйтесь задавать вопросы.

# Links

- [nin-jin.github.io/slides/fibers/](https://nin-jin.github.io/slides/fibers/) - this slides
- [mol.js.org/fiber](http://mol.js.org/fiber) - $mol_fiber online demo
- [github.com/eigenmethod/mol/tree/master/fiber](https://github.com/eigenmethod/mol/tree/master/fiber) - $mol_fiber documentation
- [t.me/mam_mol](https://t.me/mam_mol) - lovely $mol chat

# Call back

![Обратная связь](https://nin-jin.github.io/slides/fibers/call-back.jpg)

**Превосходно**: Это единственная лекция, пожалуй, которую я слушала гораздо больше и внимательнее других)

**Превосходно**: Здоровский доклад, отдельное спасибо за понятную подачу сложной темы.

**Превосходно**: Супер доклад. Особенно в виду того, что он как раз по моей текущей проблеме. 

**Превосходно**: Хороший глубокий технический доклад. Не все понял, но чертовски заинтересовало и захотелось попробовать предложенное решение. Буду пересматривать видео, как только будет доступ.

**Отлично**: Доклад был клевый, ток обидно что не много не понял как работает под капотом либа. И за выступление отдельный респект, даж не задумывался о квантовании операций)

**Отлично**: отличная и интересная тема, но некоторая сумбурность подачи материала.

**Отлично**: Отличная тема которая опять-таки нужна вот прямо здесь и сейчас. Минус только один, нет примеров реализации и интеграции в текущие проекты, ибо продукт вот только написан.

**Отлично**: Понятна важность проблемы и подходы к решению. Рекламируется библиотека, написанная  докладчиком, в качестве которой нет уверенности.

**Отлично**: Подход понятен, но у меня остаются сомнения. Если сервер отвечает дольше 16ms, я никогда не получу ответ? Числа 16 и 8 понятны, но если рендер браузера пробьёт 8, может стать нехорошо. Надо было задавать эти вопросы раньше, но мне нужно было время на размышление. Однако в любом случае автору респект как за факт разработки такого подхода, так и за «яркость».

**Отлично**: В целом понравилось множество моментов - чувствуется хорошая экспертиза и умение подать тему. Спасибо!

**Отлично**: Хорошо доклад и подача. Открыл для себя подход, как реализовать файберы. Очень понравилось!

**Отлично**: Интересный доклад, но не совсем понятна где в бизнесе это применимо. А так для общего развития прям пушка доклад.

**Хорошо**: Было интересно, в принципе даже все понятно, но хочется ещё руками покрутить чтобы полностью свою голову обернуть вокруг этого, но пока не успел этого сделать, ещё не до конца понял, как получается квантовать именно длинные/тяжелые запросы, но мне кажется это как раз более понятно будет уже на практике.

**Хорошо**: Интересная тема, но некая сумбурность подачи материала.

**Хорошо**: Практическая применимость.

**Хорошо**: Просто было интересно послушать про файберы и квантовую механику, все никак не могу добраться. А так посмотрю конкретно на mol.

**Хорошо**: Спикеру не удалось обосновать, почему стоит использовать его реализацию, нет сравнения с аналогами. Однако, доклад заинтересовал, поресерчу это, если будет время.

**Хорошо**: интересная идея фреймворка.

**Хорошо**: У меня есть метафизические несогласия с автором, но в целом доклад интересный. Не могу сказать, что сразу буду применять $mol, но на файберы посмотрю, стало интересно.

**Хорошо**: Технически классно, рассказал неплохо, про мол не слышал до этого. Но в начале шоу про управлять девушкой пультом и ловить ее - ужасно. Хотелось уйти.

**Хорошо**: узнал что-то новое дя себя, но тема крайне специфичная и подача была немного сумбурной.

**Хорошо**: Если до этого я слышал про $mol только в шуточном контексте, то теперь мне хочется попробовать файбер в работе. Ппрезентация (pdf, не доклад) была скучноватой, но это компенсировала девушка в начале.

**Хорошо**: Было интересно послушать про кванты, анимацию и мол. Но к сожалению, не вижу этому практического пременения.

**Хорошо**: Вместо манипулирования девочкой, стоило наверное демку написать) это было бы намного нагляднее и понятнее.

**Нормально**: не понял доклад. надо пересматривать.

**Нормально**: In some places I missed what the reporter was saying. The conversation was about how to use the "Mola" library and "why?". But how it works remains a mystery for me.To smoke an source code is for the overhead.

**Так себе**: плохая подача, неинтересный докладчик.

**Так себе**: Интересная тема. Но автор заострял внимание на банальных и понятных вещах, а сложные пролетал мгновенно. Не хватает юмора в такой сложной теме. Не хватает сравнения производительности с другими схожими технологиями.

**Так себе**: Начало доклада было очень живым: игра с девушкой смотрелась забавной. Затем было что-то не очень понятное и доступное (возможно, только для меня). В конце я так не понял связь названия доклада и того, что там происходило: как квантовая механика вычислений связана с рендерингом фрейма в 16мс?

**Так себе**: С фиберами не работал. На докладе услышал теорию работы фиберов. Но абсолютно не придумал, как применять mol_fiber у себя... Маленькие примеры отличные, но как это можно применить на большом приложении с 30fps с целью ускорения до 60fps - не появилось понимания. Вот если бы автор уделил этому больше внимания и меньше внутреннему устройству модуля - оценка была бы выше.
