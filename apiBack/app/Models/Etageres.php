<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etageres extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero',
        'capacite_actuelle',
        'id_entrepot',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function entrepot()
    {
        return $this->belongsTo(Entrepots::class, 'id_entrepot');
    }
}
