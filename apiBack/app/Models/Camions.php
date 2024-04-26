<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Camions extends Model
{
    use HasFactory;

    protected $fillable = [
        'immatriculation',
        'modele',
        'type',
        'status',
        'poids',
        'hauteur',
        'capacite_max',
        'date_dernier_controle',
        'id_entrepot',
    ];

    public function entrepot()
    {
        return $this->hasMany(ParticipeA::class, 'id_entrepot');
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'superviser_par');
    }

}

?>
