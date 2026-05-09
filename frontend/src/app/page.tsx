'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; //
import { 
  MousePointerClick, 
  ScanEye, 
  BrainCircuit, 
  Activity, 
  FileText, 
  Printer, 
  Smartphone,
  ArrowRight
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-bold text-sm shadow-sm">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Project Skripsi Informatika UNSIKA</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900">
              ANTI-<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">NECK</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
              Solusi cerdas rekomendasi titik terapi pegal ringan mahasiswa menggunakan 
              <span className="text-indigo-600 font-bold"> Analytical Hierarchy Process (AHP)</span> dan visualisasi 
              <span className="text-indigo-600 font-bold"> Web-AR</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/dashboard">
                <Button className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 group">
                  Mulai Analisis Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {/* Anchor Link ke Bagian Metode */}
              <a href="#metode">
                <Button variant="outline" className="h-16 px-10 rounded-2xl border-2 border-slate-200 text-lg font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  Pelajari Metode
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Teknologi Utama</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Sistem ini menggabungkan perhitungan matematis dan teknologi Augmented Reality untuk hasil yang presisi.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-5 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    <BrainCircuit className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Analisis Keputusan AHP</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Sistem menghitung prioritas keluhan Anda berdasarkan lokasi, intensitas nyeri, dan aktivitas harian secara matematis.
                </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-5 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                    <ScanEye className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Visualisasi Web-AR</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Tampilkan lokasi titik terapi tepat di atas marker secara 3D tanpa perlu mengunduh aplikasi tambahan, langsung dari browser.
                </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-5 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-100">
                    <MousePointerClick className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Antarmuka Responsif</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Didesain khusus untuk mahasiswa dengan akses yang cepat, ringan, dan mudah digunakan melalui perangkat mobile maupun desktop.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Bagaimana Cara Kerjanya?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Hanya butuh 3 langkah mudah untuk mendapatkan rekomendasi titik terapi Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-indigo-50 border-4 border-white shadow-xl rounded-full flex items-center justify-center text-indigo-600 mb-2">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">1. Isi Kuesioner</h3>
              <p className="text-slate-500 text-sm px-4">
                Masukkan tingkat nyeri dan kebiasaan postur Anda ke dalam form yang disediakan.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-amber-50 border-4 border-white shadow-xl rounded-full flex items-center justify-center text-amber-600 mb-2">
                <Printer className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">2. Siapkan Hiro Marker</h3>
              <p className="text-slate-500 text-sm px-4">
                Siapkan gambar Hiro Marker (dapat dicetak atau dibuka di perangkat lain/HP).
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-50 border-4 border-white shadow-xl rounded-full flex items-center justify-center text-emerald-600 mb-2">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">3. Scan & Lihat 3D</h3>
              <p className="text-slate-500 text-sm px-4">
                Arahkan kamera ke marker, dan titik terapi otot Anda akan muncul secara Augmented Reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Penjelasan Metode AHP */}
      <section id="metode" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-bold tracking-wider text-sm uppercase mb-2 block">Di Balik Layar</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Mengenal Analytical Hierarchy Process (AHP)</h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Anti-Neck menggunakan AHP, sebuah metode pengambilan keputusan matematis untuk memproses kriteria keluhan menjadi rekomendasi medis yang paling relevan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center font-black text-xl mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Pengumpulan Kriteria</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Sistem mengumpulkan variabel dari pengguna: Lokasi Nyeri, Intensitas Nyeri, dan Aktivitas Dominan.
              </p>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm relative mt-0 md:mt-8">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center font-black text-xl mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Perbandingan Berpasangan</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Sistem membuat matriks perbandingan dari input tersebut untuk menghitung bobot prioritas otot mana yang paling mendesak ditangani.
              </p>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm relative mt-0 md:mt-16">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center font-black text-xl mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Sintesis & Rekomendasi</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bobot tertinggi diubah menjadi rekomendasi otot spesifik yang dirender secara 3D menggunakan Web-AR.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      </section>

      {/* Footer / Info Mahasiswa */}
      <footer className="py-12 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md">A</div>
            <div>
              <span className="font-black tracking-tighter text-lg block text-slate-800">ANTI-NECK</span>
              <span className="text-xs font-semibold text-slate-500">Web-AR Therapy System</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Peneliti</p>
            <p className="text-sm font-bold text-slate-800">Nadhif Hafiz Pradiptya</p>
            <p className="text-xs font-medium text-slate-500">NPM: 2210631170138</p>
          </div>
        </div>
      </footer>
    </div>
  );
}