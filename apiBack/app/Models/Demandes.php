<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demandes extends Model
{
    use HasFactory;

    protected $fillable = [
    'type',
    'demande',
    'id_user',
    ];

    public function user()
    {
    return $this->belongsTo(User::class, 'id_user');
    }


}

?>