<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>todo</title>
        @viteReactRefresh
        @vite([
            'resources/css/app.css',
            'resources/scss/app.scss',
            'resources/ts/todos.tsx',
        ])


        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    </head>

    <body>
        <h1>todos</h1>
        <div id="todos"></div>
        <div id="tasks"></div>
    </body>
</html>
