<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JaninController;

Route::prefix('api')->group(function() {
    Route::get('/perkembangan', [JaninController::class, 'apiIndex']);
});

use App\Http\Controllers\SkincareController;

Route::get('/care', [SkincareController::class, 'index']);
Route::get('/care/{id}', [SkincareController::class, 'show']);
Route::post('/care', [SkincareController::class, 'store']);
Route::put('/care/{id}', [SkincareController::class, 'update']);
Route::delete('/care/{id}', [SkincareController::class, 'destroy']);