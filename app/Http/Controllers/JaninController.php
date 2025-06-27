<?php
namespace App\Http\Controllers;
use App\Models\janin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JaninController extends Controller
{
    // Tampilkan semua data
    public function index()
    {
        $data = janin::all();
        return view('janin.index', compact('data'));
    }

    // Tampilkan form tambah
    public function create()
    {
        return view('janin.create');
    }

    // Simpan data baru
    public function store(Request $request)
    {
        $request->validate([
            'minggu' => 'required|integer',
            'berat' => 'required|string',
            'panjang' => 'required|string',
            'detak' => 'required|string',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $gambarPath = null;
        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('perkembangan', 'public');
        }

        janin::create([
            'minggu' => $request->minggu,
            'berat' => $request->berat,
            'panjang' => $request->panjang,
            'detak' => $request->detak,
            'deskripsi' => $request->deskripsi,
            'gambar' => $gambarPath,
        ]);
        
        return response()->json(['success' => true]);
    }

    // Tampilkan form edit
    public function edit($id)
    {
        $data = janin::findOrFail($id);
        return view('janin.edit', compact('data'));
    }

    // Update data
    public function update(Request $request, $id)
    {
        $request->validate([
            'minggu' => 'required|integer',
            'berat' => 'required|string',
            'panjang' => 'required|string',
            'detak' => 'required|string',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $janin = janin::findOrFail($id);

        $gambarPath = $janin->gambar;
        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('perkembangan', 'public');
        }

        $janin->update([
            'minggu' => $request->minggu,
            'berat' => $request->berat,
            'panjang' => $request->panjang,
            'detak' => $request->detak,
            'deskripsi' => $request->deskripsi,
            'gambar' => $gambarPath,
        ]);

        return response()->json([
        'success' => true,
        'message' => 'Data berhasil diupdate'
    ]);
    }

    // Hapus data
    public function destroy($id)
    {
        $janin = janin::findOrFail($id);

        // Hapus gambar dari storage jika ada
        if ($janin->gambar && Storage::disk('public')->exists($janin->gambar)) {
            Storage::disk('public')->delete($janin->gambar);
        }

        $janin->delete();
        return response()->json(['success' => true]);
    }

    // API untuk frontend JS
    public function apiIndex()
    {
        return response()->json(janin::orderBy('minggu')->get());
    }
}