'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Dumbbell, Accessibility } from 'lucide-react';

interface LocationIntensity {
  name: string;
  value: number;
}

export default function AhpForm({ onResult }: { onResult: (recommendation: string) => void }) {
  const [npm, setNpm] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])  ;
  // State baru untuk menyimpan intensitas masing-masing lokasi
  const [intensities, setIntensities] = useState<LocationIntensity[]>([]);
  const [activity, setActivity] = useState('Duduk Tanpa Sandaran');
  const [loading, setLoading] = useState(false);

  const locations = [
    { id: 'Leher', icon: <User className="w-6 h-6" /> },
    { id: 'Bahu', icon: <Dumbbell className="w-6 h-6" /> },
    { id: 'Punggung', icon: <Accessibility className="w-6 h-6" /> },
  ];

  const toggleLocation = (id: string) => {
    if (selectedLocations.includes(id)) {
      setSelectedLocations(selectedLocations.filter((item) => item !== id));
      setIntensities(intensities.filter((item) => item.name !== id));
    } else {
      setSelectedLocations([...selectedLocations, id]);
      setIntensities([...intensities, { name: id, value: 5 }]);
    }
  };

  const handleIntensityChange = (name: string, val: number) => {
    setIntensities(intensities.map(item => 
      item.name === name ? { ...item, value: val } : item
    ));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (intensities.length === 0) return; 
    
    setLoading(true);

    try {
      // HAPUS LOGIKA REDUCE DI SINI. Biarkan AHP di Backend yang memikirkan siapa yang menang!
      
      const response = await fetch('http://localhost:8080/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          npm,
          locations: intensities, // Kunci Overpower AHP: Kirim SEMUA data array keluhan!
          activity,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      const rawData = await response.text();
      const data = JSON.parse(rawData); 

      if (data.recommendation) {
        onResult(data.recommendation);
      }
    } catch (error) {
      console.error('Fetch/Parsing Error:', error);
      alert("Terjadi kesalahan pada respon server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 shadow-2xl border-none bg-white/80 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Pokok Mahasiswa (NPM)</label>
          <input
            type="text"
            className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 transition-all outline-none"
            placeholder="Masukkan NPM Anda"
            value={npm}
            onChange={(e) => setNpm(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-4">Area yang Terasa Pegal (Bisa pilih {'>'}1)</label>
          <div className="grid grid-cols-3 gap-4">
            {locations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => toggleLocation(loc.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                  selectedLocations.includes(loc.id)
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-inner'
                    : 'border-slate-100 hover:border-indigo-200 text-slate-400'
                }`}
              >
                {loc.icon}
                <span className="mt-2 font-semibold text-xs">{loc.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SLIDER DINAMIS: Muncul untuk setiap lokasi yang dipilih */}
        {intensities.length > 0 && (
          <div className="space-y-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <label className="block text-sm font-bold text-slate-700 underline">Tingkat Nyeri per Area:</label>
            {intensities.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-indigo-600 uppercase tracking-wider">{item.name}</span>
                  <span className="text-sm font-bold text-indigo-600 bg-white px-3 py-1 rounded-full shadow-sm">
                    {item.value}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={item.value}
                  onChange={(e) => handleIntensityChange(item.name, parseInt(e.target.value))}
                  className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            ))}
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Aktivitas Dominan Hari Ini</label>
          <select
            className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 transition-all outline-none"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option>Duduk Tanpa Sandaran</option>
            <option>Menatap HP/Laptop Terlalu Lama</option>
            <option>Membawa Beban Berat (Tas Punggung)</option>
            <option>Posisi Tidur yang Salah</option>
          </select>
        </div>

        <Button
          type="submit"
          disabled={loading || selectedLocations.length === 0}
          className="w-full py-7 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1"
        >
          {loading ? 'Memproses AHP...' : 'Dapatkan Rekomendasi'}
        </Button>
      </form>
    </Card>
  );
}