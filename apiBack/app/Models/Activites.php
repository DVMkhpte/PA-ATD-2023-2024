<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Activites extends Model
{
    use HasFactory;

    protected $fillable = [
    'nom',
    'description',
    'date_debut', 
    'date_fin',
    'nb_place',
    'superviser_par'
    ];

    public function participations()
    {
        return $this->hasMany(ParticipeA::class, 'id_activite');
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'superviser_par');
    }

}

?>