'use client';

import { useEffect, useState } from 'react';

export default function ArView({ recommendation }: { recommendation: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="h-125 w-full relative rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-black">
      {/* Iframe memanggil file HTML statis. 
          Ini mengisolasi beban AR agar dashboard tidak berat.
      */}
      <iframe 
        src={`/ar-view.html?rec=${encodeURIComponent(recommendation)}`} 
        className="w-full h-full border-none"
        allow="camera; microphone; display-capture; autoplay"
        title="AR Therapy View"
      />
      
      {/* Indikator Status di atas Iframe */}
      <div className="absolute top-4 right-4 z-20 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
        Mode AR Hybrid Aktif
      </div>
    </div>
  );
}