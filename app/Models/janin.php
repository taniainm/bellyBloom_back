<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class janin extends Model
{
    use HasFactory;
    protected $table = 'janins';
    protected $fillable = ['minggu', 'berat', 'panjang', 'detak', 'deskripsi', 'gambar'];
}
