<?php

use App\Http\Controllers\CreateController;
use App\Http\Controllers\FormationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
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

Route::post('/formations/add',[FormationController::class,'store'] );

Route::get('/formations/{id}',[FormationController::class,'show']);
Route::patch('/formations/{id}',[FormationController::class,'update']);
Route::delete('/formations/{id}',[FormationController::class,'destroy']);

Route::post('/activitees/add',[\App\Http\Controllers\ActiviteController::class,'store'] );
Route::get('/activitees',[\App\Http\Controllers\ActiviteController::class,'index']);
Route::get('/activitees/{id}',[\App\Http\Controllers\ActiviteController::class,'show']);
Route::patch('/activitees/{id}',[\App\Http\Controllers\ActiviteController::class,'update']);
Route::delete('/activitees/{id}',[\App\Http\Controllers\ActiviteController::class,'destroy']);

Route::get('/participef',[App\Http\Controllers\ParticipationFController::class,'index']);
Route::get('/participef/{id}',[App\Http\Controllers\ParticipationFController::class,'show']);
Route::delete('/participef/{id}',[App\Http\Controllers\ParticipationFController::class,'destroy']);

Route::get('/participee',[App\Http\Controllers\ParticipationEController::class,'index']);
Route::get('/participee/{id}',[App\Http\Controllers\ParticipationEController::class,'show']);
Route::delete('/participee/{id}',[App\Http\Controllers\ParticipationEController::class,'destroy']);

Route::get('/participea',[App\Http\Controllers\ParticipationAController::class,'index']);
Route::get('/participea/{id}',[App\Http\Controllers\ParticipationAController::class,'show']);
Route::delete('/participea/{id}',[App\Http\Controllers\ParticipationAController::class,'destroy']);

Route::get('/missions',[App\Http\Controllers\MissionsController::class,'index']);
Route::get('/missions/{id}',[App\Http\Controllers\MissionsController::class,'show']);
Route::delete('/missions/{id}',[App\Http\Controllers\MissionsController::class,'destroy']);

Route::get('/demande', [\App\Http\Controllers\DemandeController::class, 'index']);
Route::get('/demande/{id}', [\App\Http\Controllers\DemandeController::class, 'show']);
Route::delete('/demande/{id}', [\App\Http\Controllers\DemandeController::class, 'destroy']);
Route::patch('/demande/{id}',[\App\Http\Controllers\DemandeController::class,'update']);

});

Route::middleware('auth:sanctum')->group(function () {


    Route::post('/user/logout', [\App\Http\Controllers\LogoutController::class, 'store']);
    Route::post('/demande/add', [\App\Http\Controllers\DemandeController::class, 'store']);
    Route::get('/my-demande', [\App\Http\Controllers\DemandeController::class, 'getUserDemandes']);
    Route::post('/participee/add',[App\Http\Controllers\ParticipationEController::class,'store']);
    Route::post('/participef/add',[App\Http\Controllers\ParticipationFController::class,'store']);
    Route::get('/user/{userId}/participations',[App\Http\Controllers\ParticipationFController::class, 'getUserParticipations']);
    Route::post('/participea/add',[App\Http\Controllers\ParticipationAController::class,'store']);
    Route::post('/missions/add',[App\Http\Controllers\MissionsController::class,'store']);
    Route::get('/formations',[\App\Http\Controllers\FormationController::class,'index']);



});

Route::post('/user/create', [\App\Http\Controllers\CreateController::class, 'store']);
Route::post('/user/login', [\App\Http\Controllers\LoginController::class, 'store']);
Route::post('/demande/add', [\App\Http\Controllers\DemandeController::class, 'store']);


