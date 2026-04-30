'use client';

import { useState } from 'react';
import AhpForm from '../../components/AhpForm';
import ArView from '../../components/ArView';

// Kamus Tutorial Pijat berdasarkan Jurnal Medis
const therapyTutorials: Record<string, any> = {
  "Levator Scapulae": {
    tips: "Gunakan jari telunjuk dan jari tengah Anda. Tekan dengan lembut area samping leher yang terasa kaku. Lakukan gerakan memutar kecil perlahan selama 1-2 menit sambil mengatur napas.",
    videoUrl: "https://www.youtube.com/embed/EWXsFikuIvo" // Video dari Rehab Science
  },
  "Splenius Capitis": {
    tips: "Letakkan kedua ibu jari di pangkal tengkorak belakang (bawah kepala). Tekan perlahan mengarah ke atas, tahan selama 30 detik lalu lepaskan. Ulangi 3-5 kali.",
    videoUrl: "https://www.youtube.com/embed/abIVZ_l-D6Y" // Video dari Dr. Joe Damiani, PT
  },
  "Upper Trapezius": {
    tips: "Pijat area bahu atas Anda menggunakan tangan sisi yang berlawanan (tangan kiri memijat bahu kanan). Remas otot bahu dengan lembut menggunakan seluruh jari selama 1 menit.",
    videoUrl: "https://www.youtube.com/embed/uNM9bQi2LW4" // Video dari SpineCare Decompression
  },
  "Rhomboid Major": {
    tips: "Karena lokasinya di punggung atas, gunakan bola tenis. Sandarkan punggung pada dinding dengan bola tenis di antara tulang belikat Anda. Gerakkan tubuh naik turun secara perlahan.",
    videoUrl: "https://www.youtube.com/embed/DGqhnAVhVpk" // Video dari Balanced Motion Clinic
  },
  "Erector Spinae": {
    tips: "Berbaringlah telentang dan tarik kedua lutut ke dada Anda (posisi memeluk lutut). Tahan selama 30 detik untuk meregangkan otot panjang tulang belakang. Hindari pijatan keras secara langsung di area ini.",
    videoUrl: "https://www.youtube.com/embed/TovFXY7XYco" // Video dari AskDoctorJo
  },
  "Quadratus Lumborum": {
    tips: "Pijat area pinggang samping / punggung bawah dengan ibu jari Anda sambil duduk condong ke depan. Anda juga bisa melakukan gerakan meliuk badan ke kiri dan kanan perlahan.",
    videoUrl: "https://www.youtube.com/embed/WVVGl0Y0ERA" // Video dari SpineCare Decompression
  }
};

export default function DashboardPage() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg">A</span>
            ANTI-NECK
          </h1>
          <span className="text-sm font-semibold tracking-wider text-slate-400">WEB-AR THERAPY SYSTEM</span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kolom Kiri: Form */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Analisis Keluhan</h2>
              <p className="text-slate-500 mb-6 text-sm">
                Masukkan nama dan detail pegal Anda untuk mendapatkan panduan titik terapi yang akurat menggunakan metode AHP.
              </p>
              <AhpForm onResult={setResult} />
            </div>
          </div>

          {/* Kolom Kanan: AR View & Hasil Rekomendasi */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Visualisasi Web-AR</h2>
              <p className="text-slate-500 mb-6 text-sm">
                Pindai marker Anda untuk melihat lokasi titik terapi dalam bentuk 3D.
              </p>

              {result && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wider">Rekomendasi Utama</p>
                    <p className="text-2xl font-black text-emerald-800">{result.recommendation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wider">Bobot AHP</p>
                    <p className="text-2xl font-black text-emerald-800">
                      {(result.score * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              )}

              {/* Komponen Kamera AR */}
              <ArView recommendation={result?.recommendation} />
            </div>

            {/* SEKSI BARU: Sapaan, Tips, dan Video Muncul di sini setelah Submit */}
            {result && result.recommendation && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h3 className="text-2xl font-extrabold text-indigo-700 mb-2">
                  Hai, {result.nama}! 👋
                </h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Berdasarkan hasil analisis terhadap keluhan Anda, area otot yang paling terdampak adalah <strong className="text-indigo-600 text-base">{result.recommendation}</strong>. Berikut adalah panduan terapi mandiri untuk Anda:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Teks Panduan Memijat */}
                  <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
                    <h4 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                      💡 Panduan Pijat Medis
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {therapyTutorials[result.recommendation]?.tips || "Tidak ada panduan tersedia untuk otot ini."}
                    </p>
                  </div>

                  {/* Video YouTube Terapi */}
                  <div className="rounded-xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200">
                    <iframe 
                      width="100%" 
                      height="200" 
                      src={therapyTutorials[result.recommendation]?.videoUrl} 
                      title="Video Terapi Mandiri"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full object-cover"
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}