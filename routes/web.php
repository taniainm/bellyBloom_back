<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('main');
});

Route::get('/home', function () {
    return view('landing');
});

Route::get('/login', function () {
    return view('login');
});

Route::get('/signup', function () {
    return view('signup');
});

Route::get('/komunitas', function () {
    return view('komunitas');
});

Route::get('/artikel', function () {
    return view('artikel');
});

Route::get('/skincare', function () {
    return view('skincare');
});

Route::get('/pantau', function () {
    return view('pantau');
});

Route::get('/akun', function () {
    return view('akun');
});

Route::get('/isiartikel', function () {
    return view('detail_artikel');
});

Route::get('/isiskincare', function () {
    return view('detailskincare');
});

Route::get('/password', function () {
    return view('password');
});

Route::get('/user', function () {
    return view('pengguna');
});

Route::get('/prohamil', function () {
    return view('prohamil');
});

Route::get('/admin', function () {
    return view('admin');
});

Route::get('/artikelAdmin', function () {
    return view('artikelAdmin');
});

Route::get('/komunitasAdmin', function () {
    return view('komunAdmin');
});

Route::get('/perkembanganAdmin', function () {
    return view('pantauAdmin');
}); 

Route::get('/skincareAdmin', function () {
    return view('skinAdmin');
});

Route::get('/setAdmin', function () {
    return view('setAdmin');
});

Route::get('/tuliscerita', function () {
    return view('tuliscerita');
});

use App\Http\Controllers\JaninController;
Route::get('/janin', [JaninController::class, 'index'])->name('janin.index');
Route::get('/janin/create', [JaninController::class, 'create'])->name('janin.create');
Route::post('/janin/store', [JaninController::class, 'store'])->name('janin.store');
Route::get('/janin/edit/{id}', [JaninController::class, 'edit'])->name('janin.edit');
Route::post('/janin/update/{id}', [JaninController::class, 'update'])->name('janin.update');
Route::delete('/janin/delete/{id}', [JaninController::class, 'destroy'])->name('janin.delete');

use App\Http\Controllers\SkincareController;
Route::get('/care/{id}', [SkincareController::class, 'show'])->name('skincare.show');
Route::post('/care', [SkincareController::class, 'store'])->name('skincare.store');
Route::put('/care/{id}', [SkincareController::class, 'update'])->name('skincare.update');
Route::delete('/care/{id}', [SkincareController::class, 'destroy'])->name('skincare.destroy');

use App\Http\Controllers\ArtikelController;
Route::prefix('articles')->group(function() {
    Route::post('/', [ArtikelController::class, 'store']);
    Route::put('/{id}', [ArtikelController::class, 'update']);
    Route::delete('/{id}', [ArtikelController::class, 'destroy']);
});

Route::prefix('api')->group(function() {
    Route::get('/perkembangan', [JaninController::class, 'apiIndex']);
    Route::get('/care', [SkincareController::class, 'index']);
    Route::get('/articlesApi', [ArtikelController::class, 'index']);
    Route::get('/articleCount', function () {
    $count = \DB::table('artikels')->count();
    return response()->json(['count' => $count]);
});
Route::get('/skincareCount', function () {
    $count = \DB::table('skincare')->count();
    return response()->json(['count' => $count]);
});
});
