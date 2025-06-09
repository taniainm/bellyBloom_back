<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArtikelController extends Controller
{
    // API untuk mendapatkan semua artikel
    public function index()
    {
        $artikel = Artikel::orderBy('publish_date', 'desc')->get();
        return response()->json($artikel);
    }

    // API untuk menyimpan artikel baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
            'publish_date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Upload gambar jika ada
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('artikel', 'public');
            $validated['image'] = $path;
        }

        $artikel = Artikel::create($validated);

        return response()->json([
            'success' => true,
            'data' => $artikel
        ], 201);
    }

    // API untuk mengupdate artikel
    public function update(Request $request, $id)
    {
        $artikel = Artikel::findOrFail($id);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'content' => 'string',
            'author' => 'string|max:255',
            'publish_date' => 'date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Upload gambar baru jika ada
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($artikel->image) {
                Storage::disk('public')->delete($artikel->image);
            }
            
            $path = $request->file('image')->store('artikel', 'public');
            $validated['image'] = $path;
        }

        $artikel->update($validated);

        return response()->json([
            'success' => true,
            'data' => $artikel
        ]);
    }

    // API untuk menghapus artikel
    public function destroy($id)
    {
        $artikel = Artikel::findOrFail($id);
        
        // Hapus gambar dari storage
        if ($artikel->image) {
            Storage::disk('public')->delete($artikel->image);
        }
        
        $artikel->delete();

        return response()->json([
            'success' => true,
            'message' => 'Artikel berhasil dihapus'
        ]);
    }
}