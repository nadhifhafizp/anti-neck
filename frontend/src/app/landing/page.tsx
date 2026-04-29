'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MousePointerClick, ScanEye, BrainCircuit, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-sm">
              <Activity className="w-4 h-4" />
              <span>Project Skripsi Informatika UNSIKA</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900">
              ANTI-<span className="text-indigo-600">NECK</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
              Solusi cerdas rekomendasi titik terapi pegal ringan mahasiswa menggunakan 
              <span className="text-slate-800 font-bold"> Analytical Hierarchy Process (AHP)</span> dan visualisasi 
              <span className="text-slate-800 font-bold"> Web-AR</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/dashboard">
                <Button className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold shadow-2xl shadow-indigo-200 transition-all hover:-translate-y-1">
                  Mulai Analisis Sekarang
                </Button>
              </Link>
              <Button variant="outline" className="h-16 px-10 rounded-2xl border-2 border-slate-200 text-lg font-bold hover:bg-slate-50">
                Pelajari Metode
              </Button>
            </div>
          </div>
        </div>

        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]"></div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    <BrainCircuit className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Analisis Keputusan AHP</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Sistem menghitung prioritas keluhan Anda berdasarkan lokasi, intensitas nyeri, dan aktivitas harian secara matematis.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                    <ScanEye className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Visualisasi Web-AR</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Tampilkan lokasi titik terapi tepat di atas marker secara 3D tanpa perlu mengunduh aplikasi tambahan.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-100">
                    <MousePointerClick className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Antarmuka Responsif</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Didesain khusus untuk mahasiswa dengan akses cepat melalui perangkat mobile maupun desktop.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Info Mahasiswa */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">A</div>
            <span className="font-black tracking-tighter">ANTI-NECK</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Peneliti</p>
            <p className="text-sm font-bold text-slate-800">Nadhif Hafiz Pradiptya - 2210631170138</p>
          </div>
        </div>
      </footer>
    </div>
  );
}