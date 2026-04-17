import './globals.css'
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
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