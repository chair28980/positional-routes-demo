import type { Metadata } from 'next'
import { Inter, Bebas_Neue, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-interface'
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'BJJ Positional Routes - Master Plan Basics',
  description: 'Interactive demonstration of Brazilian Jiu-Jitsu positional route progressions',
  keywords: ['BJJ', 'Brazilian Jiu-Jitsu', 'positional routes', 'martial arts', 'training'],
  authors: [{ name: 'JV Jiu-Jitsu' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-foundation-primary text-white font-interface antialiased">
        {children}
      </body>
    </html>
  )
}