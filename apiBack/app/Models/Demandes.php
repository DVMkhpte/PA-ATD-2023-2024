<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demandes extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'demande',
        'permis',
        'etat',
        'date',
        'id_user',

    ];

    public function user()
    {
    return $this->belongsTo(User::class, 'id_user');
    }


}

?>
