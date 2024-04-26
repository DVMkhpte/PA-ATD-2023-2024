<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'type',
        'date_arrivee',
        'date_limite',
        'id_etagere',
    ];

    public function etagere()
    {
        return $this->belongsTo(Etageres::class, 'id_etagere');
    }
}
