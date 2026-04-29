'use client';
import { useState } from 'react';
import AhpForm from '../../components/AhpForm';
import ArView from '../../components/ArView';

export default function Dashboard() {
  const [result, setResult] = useState<any>(null);

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span className="font-black text-xl tracking-tight text-slate-800">ANTI-NECK</span>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Web-AR Therapy System</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12">
        {/* Kolom Kiri: Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-800">Analisis Keluhan</h1>
            <p className="text-slate-500 text-sm">Masukkan detail pegal Anda untuk mendapatkan titik terapi yang akurat menggunakan metode AHP.</p>
          </div>
          {/* Menerima seluruh objek data hasil AHP */}
          <AhpForm onResult={(res) => setResult(res)} />
        </div>

        {/* Kolom Kanan: Visualisasi */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Visualisasi Web-AR</h2>
            <p className="text-slate-500 text-sm">Pindai marker Anda untuk melihat lokasi titik terapi dalam bentuk 3D.</p>
          </div>

          <div className="relative group">
            {result ? (
              <div className="space-y-4">
                {/* Alert Hasil - Update untuk menampilkan Skor AHP */}
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl">✨</div>
                    <div>
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">Rekomendasi Utama</p>
                      {/* Pastikan mengambil .recommendation dari objek result */}
                      <h3 className="text-xl font-black text-emerald-900">{result.recommendation}</h3>
                    </div>
                  </div>
                  
                  {/* Menampilkan Skor Eigenvector AHP dalam bentuk % (Hanya untuk UI Skripsi) */}
                  {result.score && (
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-emerald-500 uppercase">Bobot AHP</p>
                      <p className="text-xl font-black text-emerald-700">{(result.score * 100).toFixed(1)}%</p>
                    </div>
                  )}
                </div>

                {/* Viewport AR */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  {/* Pastikan hanya mengirimkan string nama ke Iframe AR */}
                  <ArView recommendation={result.recommendation} />
                </div>
              </div>
            ) : (
              <div className="aspect-video lg:h-145 w-full bg-slate-200 rounded-3xl border-4 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-4 transition-all group-hover:bg-slate-200/50">
                <div className="text-5xl opacity-20">📸</div>
                <p className="font-bold text-sm uppercase tracking-widest opacity-40">Menunggu Analisis Form...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}