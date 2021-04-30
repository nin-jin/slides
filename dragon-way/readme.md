# Путь дракона

![](https://habrastorage.org/webt/v9/if/u1/v9ifu1re6nmugskw7ehh2ypyawi.png)

Открыть [в виде презентации](https://nin-jin.github.io/slides/dragon-way/).

## Знакомимся

- Кто на чём пишет приложения?
- Насколько доволен инструментом?
- Что хотелось бы улучшить?

- Дмитрий Карловский
- [Яндекс](https://yandex.ru/), [1С](https://1c.ru/), [Wrike](https://www.wrike.com/), [Deutche Bank](https://www.db.com/russia/index_ru.htm), [Газпром](https://www.gazprom.ru/contacts/warning/)
- 15 лет в JS => [$mol](https://mol.hyoo.ru/)
- [новое веб-приложение каждый месяц](https://apps.hyoo.ru/)
- [Видеоканал Core Dump](https://www.youtube.com/channel/UC-qEImMrqSLZ9KLee1JTcuw)
- [Митапы PiterJS](https://piterjs.org/)
- [nin_jin](https://t.me/nin_jin)
 

## Первые шаги

- Разворачивание рабочего окружения **MAM**
- Знакомство с основными идеями **$mol**
- Создание простого приложения на **$mol_view**

### Преимущества

- Быстрые приложения
- Быстрая разработка
- Минимум телодвижений 

### Необходиый софт

- [NodeJS](https://nodejs.org/en/download/)
- [VSCode](https://code.visualstudio.com/download)
- [GIT](https://git-scm.com/downloads)

### Необходимые плагины

- [EditorConfig.EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [nin-jin.vscode-language-tree](https://marketplace.visualstudio.com/items?itemName=nin-jin.vscode-language-tree)

### Рабочее окружение

```
git clone https://github.com/hyoo-ru/mam.git
cd mam
npm install
npm start
```

### Новый неймспейс

```
mkdir my
```

### Новый проект

```
mkdir my/wiki
```

### Сборка проекта

```
npm start my/wiki
```

```
ls my/wiki/- 
```

### Точка входа: my/wiki/index.html

```html
<!doctype html>
<html style=" height: 100% ">

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
	</head>

	<body style=" width: 100%; height: 100%; margin: 0 ">
		<div mol_view_root="$my_wiki"></div>
		<script src="web.js"></script>
	</body>

</html>
```

### Композиция: my/wiki/wiki.view.tree

```tree
$my_wiki $mol_page
	title \My Wiki
	body /
		<= Text $mol_textarea
			hint \What do you think?
			value?val <=> text?val \
```

[localhost:9080/my/wiki/-/test.html](http://localhost:9080/my/wiki/-/test.html)

### Стилизация: my/wiki/wiki.view.css.ts

```
namespace $ {
	
	$mol_style_define( $my_wiki, {
		
		Body: {
			padding: $mol_gap.block,
		},
		
	} )
	
}
```

### Поведение: my/wiki/wiki.view.ts

```typescript
namespace $.$$ {
	
	export class $my_wiki extends $.$my_wiki {
		
		text( next?: string ) {
			return this.$.$mol_state_local.value( 'text', next ) ?? ''
		}
		
	}
	
}
```

### Поддержка оффлайна: my/wiki/wiki.meta.tree

```tree
include \/mol/offline/install
```

### Настройка гита: my/wiki/.gitattributes

```
*	-text
```

### Игнорирование сгенерированного: my/wiki/.gitignore

```
-*
```

### Деплой на GitHub Pages: my/wiki/.github/workflows/deploy.yml

```yaml
name: Deploy
on:
  workflow_dispatch:
  push:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: hyoo-ru/mam_build@master2
      with:
        token: ${{ secrets.GH_PAT }}
        package: 'my/wiki'
    - uses: alex-page/blazing-fast-gh-pages-deploy@v1.1.0
      if: github.ref == 'refs/heads/master'
      with:
        repo-token: ${{ secrets.GH_PAT }}
        site-directory: 'my/wiki/-'
```

### Выкладка на гитхаб

```
cd my/wiki
git init
git add *
git commit -a -m "Single page with local storage synchronization"
git git@github.com:hyoo-ru/dragon-way.git
git remote add origin git@github.com:hyoo-ru/dragon-way.git
git push -u origin master
```

- [github.com/hyoo-ru/dragon-way](https://github.com/hyoo-ru/dragon-way)
- [hyoo-ru.github.io/dragon-way](https://hyoo-ru.github.io/dragon-way)
