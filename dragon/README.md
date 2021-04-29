# Путь дракона

Открыть [в виде презентации](https://nin-jin.github.io/slides/gragon/).

## Первые шаги

- Разворачивание рабочего окружения
- Знакомство с основными идеями
- Создание простого приложения

### Что есть что

- **MAM** - экосистема
- **$mol** - один из наборов модулей
- **$mol_view** - модуль создания компонент

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
dir my/wiki/- 
```

### Точка входа: **my/wiki/index.html**

```html
<!doctype html>
<html style=" height: 100% ">

<meta charset="utf-8" />
<meta name="viewport" content=" width=device-width, height=device-height, initial-scale=1 ">

<body style=" width: 100%; height: 100%; margin: 0 ">
	<div mol_view_root="$my_wiki"></div>
	<script src="web.js"></script>
</body>
```

### Компонент приложения: **my/wiki/wiki.view.tree**

```
$my_wiki $mol_page
	title \My Wiki
	body /
		<= Text $mol_tetarea
			value?val <=> text?val \
```

```
http://localhost:9080/my/wiki/-/test.html
```
