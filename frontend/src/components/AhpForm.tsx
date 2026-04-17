'use client';
import { useState } from 'react';

export default function AhpForm({ onResult }: { onResult: (res: any) => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    npm: '',
    locations: [] as string[],
    intensity: 5,
    trigger: ''
  });

  const locationsOption = [
    { id: 'Leher', label: 'Leher', icon: '👤' },
    { id: 'Bahu', label: 'Bahu', icon: '💪' },
    { id: 'Punggung', label: 'Punggung', icon: '🧘' },
  ];

  const handleLocationToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.includes(id)
        ? prev.locations.filter(l => l !== id)
        : [...prev.locations, id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      onResult(result);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
      {/* Input NPM */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Pokok Mahasiswa (NPM)</label>
        <input 
          type="text" required
          placeholder="Contoh: 2210631170XXX" 
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          onChange={(e) => setFormData({...formData, npm: e.target.value})}
        />
      </div>

      {/* Pilihan Lokasi dengan Card */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Area yang Terasa Pegal (Bisa pilih {'>'}1)</label>
        <div className="grid grid-cols-3 gap-3">
          {locationsOption.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => handleLocationToggle(loc.id)}
              className={`py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                formData.locations.includes(loc.id)
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
              }`}
            >
              <span className="text-2xl">{loc.icon}</span>
              <span className="text-xs font-bold">{loc.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slider Intensitas */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-semibold text-slate-700">Tingkat Nyeri</label>
          <span className="text-sm font-bold text-indigo-600">{formData.intensity}/10</span>
        </div>
        <input 
          type="range" min="1" max="10" 
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          value={formData.intensity}
          onChange={(e) => setFormData({...formData, intensity: parseInt(e.target.value)})}
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 uppercase font-bold">
          <span>Ringan</span>
          <span>Sedang</span>
          <span>Berat</span>
        </div>
      </div>

      {/* Pemicu */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Aktivitas Dominan Hari Ini</label>
        <select 
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setFormData({...formData, trigger: e.target.value})}
        >
          <option value="">Pilih Aktivitas...</option>
          <option value="Nunduk">Menatap HP/Laptop Terlalu Lama</option>
          <option value="Duduk">Duduk Tanpa Sandaran</option>
          <option value="Berat">Membawa Beban Berat (Tas)</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={loading || formData.locations.length === 0}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95"
      >
        {loading ? 'Menganalisis...' : 'Dapatkan Rekomendasi'}
      </button>
    </form>
  );
}