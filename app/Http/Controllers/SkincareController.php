<?php

namespace App\Http\Controllers;
use App\Models\Skincare;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SkincareController extends Controller{
    // API untuk mendapatkan semua produk
    public function index()
    {
        $products = Skincare::all();
        return response()->json($products);
    }

        public function show($id)
    {
        $product = Skincare::findOrFail($id);
        return response()->json($product);
    }

    // API untuk menyimpan produk baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'jenis' => 'required|string|max:255',
            'kandungan' => 'required|string',
            'harga' => 'required|numeric',
            'deskripsi' => 'required|string',
            'cara_pakai' => 'required|string',
            'kategori_kulit' => 'required|in:semua,normal,sensitif,berjerawat,berminyak,kering',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Upload gambar
        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('skincare', 'public');
            $validated['gambar'] = $path;
        }

        $product = Skincare::create($validated);

        return response()->json([
            'success' => true,
            'data' => $product
        ], 201);
    }

    // API untuk mengupdate produk
    public function update(Request $request, $id)
    {
        $product = Skincare::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'string|max:255',
            'brand' => 'string|max:255',
            'jenis' => 'string|max:255',
            'kandungan' => 'string',
            'harga' => 'numeric',
            'deskripsi' => 'string',
            'cara_pakai' => 'string',
            'kategori_kulit' => 'in:semua,normal,sensitif,berjerawat,berminyak,kering',
            'gambar' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Upload gambar baru jika ada
        if ($request->hasFile('gambar')) {
            // Hapus gambar lama jika ada
            if ($product->gambar) {
                Storage::disk('public')->delete($product->gambar);
            }
            
            $path = $request->file('gambar')->store('skincare', 'public');
            $validated['gambar'] = $path;
        }

        $product->update($validated);

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    // API untuk menghapus produk
    public function destroy($id)
    {
        $product = Skincare::findOrFail($id);
    
        // Hapus gambar dari storage
        if ($product->gambar) {
            Storage::disk('public')->delete($product->gambar);
        }
        
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dihapus'
        ]);
    }
}