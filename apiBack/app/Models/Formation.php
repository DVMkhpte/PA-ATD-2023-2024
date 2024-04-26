<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Formation extends Model
{
    use HasFactory;

    protected $fillable = [
    'nom',
    'description',
    'date_debut',
    'date_fin',
    'adresse',
    'nb_place',
    'supervise_par'
    ];

    public function participations()
    {
        return $this->hasMany(ParticipeF::class, 'id_formation');
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervise_par');
    }

}

?>
