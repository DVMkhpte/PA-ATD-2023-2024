<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Missions extends Model
{
    use HasFactory;

    protected $fillable = ['id_demande','realiser_par'];

    public function user()
    {
        return $this->belongsTo(User::class, 'realiser_par');
    }

    public function demande()
    {
        return $this->belongsTo(Demandes::class, 'id_demande');
    }
}

?>