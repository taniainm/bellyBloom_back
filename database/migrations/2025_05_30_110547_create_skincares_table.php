<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('skincare', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('brand');
            $table->string('jenis');
            $table->text('kandungan');
            $table->decimal('harga', 10, 2);
            $table->string('gambar');
            $table->text('deskripsi');
            $table->text('cara_pakai');
            $table->enum('kategori_kulit', ['semua', 'normal', 'sensitif', 'berjerawat', 'berminyak', 'kering']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('skincare');
    }
};