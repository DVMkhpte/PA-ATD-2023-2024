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
    Route::patch('/users/{id}', [\App\Http\Controllers\UserController::class, 'update']);
    Route::delete('/users/{id}', [\App\Http\Controllers\UserController::class, 'destroy']);

    Route::post('/evenements/add',[\App\Http\Controllers\EvenementController::class,'store'] );
    Route::get('/evenements',[\App\Http\Controllers\EvenementController::class,'index']);
    Route::get('/evenements/{id}',[\App\Http\Controllers\EvenementController::class,'show']);
    Route::patch('/evenements/{id}',[\App\Http\Controllers\EvenementController::class,'update']);
    Route::delete('/evenements/{id}',[\App\Http\Controllers\EvenementController::class,'destroy']);

    Route::post('/formations/add',[FormationController::class,'store'] );
    Route::patch('/formations/{id}',[FormationController::class,'update']);
    Route::delete('/formations/{id}',[FormationController::class,'destroy']);

    Route::post('/activitees/add',[\App\Http\Controllers\ActiviteController::class,'store'] );
    Route::patch('/activitees/{id}',[\App\Http\Controllers\ActiviteController::class,'update']);
    Route::delete('/activitees/{id}',[\App\Http\Controllers\ActiviteController::class,'destroy']);

    Route::get('/participef',[App\Http\Controllers\ParticipationFController::class,'index']);
    Route::get('/participef/{id}',[App\Http\Controllers\ParticipationFController::class,'show']);
    Route::delete('/participef/{id}',[\App\Http\Controllers\ActiviteController::class,'destroy']);

    Route::get('/participee',[App\Http\Controllers\ParticipationEController::class,'index']);
    Route::get('/participee/{id}',[App\Http\Controllers\ParticipationEController::class,'show']);
    Route::delete('/participee/{id}',[\App\Http\Controllers\ActiviteController::class,'destroy']);

    Route::get('/participea',[App\Http\Controllers\ParticipationAController::class,'index']);
    Route::get('/participea/{id}',[App\Http\Controllers\ParticipationAController::class,'show']);
    Route::delete('/participea/{id}',[\App\Http\Controllers\ActiviteController::class,'destroy']);

    Route::delete('/missions/{id}',[App\Http\Controllers\MissionsController::class,'destroy']);

    Route::delete('/demande/{id}', [\App\Http\Controllers\DemandeController::class, 'destroy']);

    Route::post('/camions/add',[\App\Http\Controllers\CamionsController::class,'store'] );
    Route::get('/camions',[\App\Http\Controllers\CamionsController::class,'index']);
    Route::get('/camions/{id}',[\App\Http\Controllers\CamionsController::class,'show']);
    Route::patch('/camions/{id}',[\App\Http\Controllers\CamionsController::class,'update']);
    Route::delete('/camions/{id}',[\App\Http\Controllers\CamionsController::class,'destroy']);

    Route::get('/entrepots',[\App\Http\Controllers\EntrepotsController::class,'index']);
    Route::get('/entrepots/{id}',[\App\Http\Controllers\EntrepotsController::class,'show']);
    Route::patch('/entrepots/{id}',[\App\Http\Controllers\EntrepotsController::class,'update']);
   // Route::delete('/entrepots/{id}',[\App\Http\Controllers\EntrepotsController::class,'destroy']);

    Route::post('/etageres/add',[\App\Http\Controllers\EtageresController::class,'store'] );
    Route::get('/etageres',[\App\Http\Controllers\EtageresController::class,'index']);
    Route::get('/etageres/{id}',[\App\Http\Controllers\EtageresController::class,'show']);
    Route::delete('/etageres/{id}',[\App\Http\Controllers\EtageresController::class,'destroy']);

    Route::post('/produits/add',[\App\Http\Controllers\ProduitController::class,'store'] );
    Route::get('/produits',[\App\Http\Controllers\ProduitController::class,'index']);
    Route::get('/produits/{id}',[\App\Http\Controllers\ProduitController::class,'show']);
    Route::delete('/produits/{id}',[\App\Http\Controllers\ProduitController::class,'destroy']);

    Route::post('/commercants/add',[\App\Http\Controllers\CommercantController::class,'store'] );
    Route::get('/commercants',[\App\Http\Controllers\CommercantController::class,'index']);
    Route::get('/commercants/{id}',[\App\Http\Controllers\CommercantController::class,'show']);
    Route::patch('/commercants/{id}',[\App\Http\Controllers\CommercantController::class,'update']);
    Route::delete('/commercants/{id}',[\App\Http\Controllers\CommercantController::class,'destroy']);

});


Route::middleware(['auth:sanctum', 'check_admin_or_benevole'])->group(function () {



});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/participee/add',[App\Http\Controllers\ParticipationEController::class,'store']);
    Route::delete('/participef/{id}',[\App\Http\Controllers\ActiviteController::class,'destroy']);
    Route::post('/participef/add',[App\Http\Controllers\ParticipationFController::class,'store']);
    Route::delete('/participef/{id}',[\App\Http\Controllers\ActiviteController::class,'destroy']);

    Route::post('/user/logout', [\App\Http\Controllers\LogoutController::class, 'store']);

    Route::post('/demande/add', [\App\Http\Controllers\DemandeController::class, 'store']);
    Route::get('/my-demande', [\App\Http\Controllers\DemandeController::class, 'getUserDemandes']);
    Route::get('/demande', [\App\Http\Controllers\DemandeController::class, 'index']);
    Route::get('/demande/{id}', [\App\Http\Controllers\DemandeController::class, 'show']);
    Route::patch('/demande/{id}',[\App\Http\Controllers\DemandeController::class,'update']);

    Route::get('/activitees',[\App\Http\Controllers\ActiviteController::class,'index']);
    Route::get('/activitees/{id}',[\App\Http\Controllers\ActiviteController::class,'show']);

    Route::get('/formations',[\App\Http\Controllers\FormationController::class,'index']);
    Route::get('/formations/{id}',[FormationController::class,'show']);

    Route::get('/evenements',[\App\Http\Controllers\EvenementController::class,'index']);
    Route::get('/evenements/{id}',[\App\Http\Controllers\EvenementController::class,'show']);

    Route::post('/participea/add',[App\Http\Controllers\ParticipationAController::class,'store']);
    Route::get('/user/{userId}/participationsA',[App\Http\Controllers\ParticipationAController::class, 'getUserParticipations']);
    Route::delete('/participea/{id}',[App\Http\Controllers\ParticipationAController::class,'destroy']);

    Route::get('/users/{id}', [\App\Http\Controllers\UserController::class, 'show']);
    Route::post('/demande/add', [\App\Http\Controllers\DemandeController::class, 'store']);

    Route::get('/user/{userId}/participationsF',[App\Http\Controllers\ParticipationFController::class, 'getUserParticipations']);
    Route::get('/user/{userId}/participationsE',[App\Http\Controllers\ParticipationEController::class, 'getUserParticipations']);

    Route::get('/user/{userId}/formation',[App\Http\Controllers\FormationController::class, 'getUserFormation']);
    Route::get('/user/{userId}/evenement',[App\Http\Controllers\EvenementController::class, 'getUserEvenement']);
    Route::get('/user/{userId}/activite',[App\Http\Controllers\ActiviteController::class, 'getUserActivity']);
    Route::get('/user/{userId}/mission',[App\Http\Controllers\MissionsController::class, 'getUserMission']);

    Route::get('/missions',[App\Http\Controllers\MissionsController::class,'index']);
    Route::get('/missions/{id}',[App\Http\Controllers\MissionsController::class,'show']);
    Route::post('/missions/add',[App\Http\Controllers\MissionsController::class,'store']);
});

Route::post('/user/create', [\App\Http\Controllers\CreateController::class, 'store']);
Route::post('/user/login', [\App\Http\Controllers\LoginController::class, 'store']);



