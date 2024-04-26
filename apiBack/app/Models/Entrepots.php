<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrepots extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'adresse',
        'taille',
        'nb_etageres',
        'nb_etageres_max',
        'nb_etageres_remplie',
        'place_restante',
    ];


}

?>

