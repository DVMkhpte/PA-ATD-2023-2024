<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\{
    LoginController,
    LogoutController,
    CurrentUserController,
    
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
 
    return ['token' => $token->plainTextToken];
});


Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {

Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);
Route::get('/users/{id}', [\App\Http\Controllers\UserController::class, 'show']);
Route::patch('/users/{id}', [\App\Http\Controllers\UserController::class, 'update']);
Route::delete('/users/{id}', [\App\Http\Controllers\UserController::class, 'destroy']);

Route::post('/evenements/add',[\App\Http\Controllers\EvenementController::class,'store'] );
Route::get('/evenements',[\App\Http\Controllers\EvenementController::class,'index']);
Route::get('/evenements/{id}',[\App\Http\Controllers\EvenementController::class,'show']);
Route::patch('/evenements/{id}',[\App\Http\Controllers\EvenementController::class,'update']);
Route::delete('/evenements/{id}',[\App\Http\Controllers\EvenementController::class,'destroy']);

Route::post('/formations/add',[\App\Http\Controllers\FormationController::class,'store'] );
Route::get('/formations',[\App\Http\Controllers\FormationController::class,'index']);
Route::get('/formations/{id}',[\App\Http\Controllers\FormationController::class,'show']);
Route::patch('/formations/{id}',[\App\Http\Controllers\FormationController::class,'update']);
Route::delete('/formations/{id}',[\App\Http\Controllers\FormationController::class,'destroy']);

});

Route::post('/user/create', [\App\Http\Controllers\CreateController::class, 'store']);
Route::post('/user/login', [\App\Http\Controllers\LoginController::class, 'store']);
Route::post('/user/logout', [\App\Http\Controllers\LogoutController::class, 'store']);
