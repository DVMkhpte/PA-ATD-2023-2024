<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParticipeF extends Model
{
    use HasFactory;

    protected $fillable = ['id_user', 'id_formation'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class, 'id_formation');
    }
}

?>