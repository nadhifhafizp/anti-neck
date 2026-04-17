import './globals.css'
import Script from 'next/script'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={cn("font-sans", geist.variable)}>
      <head>
        {/* Load A-Frame dan AR.js secara berurutan */}
        <Script 
          src="https://aframe.io/releases/1.3.0/aframe.min.js" 
          strategy="beforeInteractive" 
        />
        <Script 
          src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}