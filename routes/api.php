<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['prefix' => 'tasks'], function () {
    Route::get('', [ApiController::class, 'index']);
    Route::post('', [ApiController::class, 'store']);
    Route::put('{id}', [ApiController::class, 'update']);
    Route::delete('{id}', [ApiController::class, 'destroy']);
});
