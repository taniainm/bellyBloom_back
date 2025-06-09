<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'author',
        'publish_date',
        'image',
    ];

    protected $dates = ['publish_date'];
}