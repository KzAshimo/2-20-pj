<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//todoPage
Route::get('todo',function(){
    return view('todo');
});
