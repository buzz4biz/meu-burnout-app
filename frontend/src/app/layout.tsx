import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meu Burnout é Nosso Dado',
  description: 'Plataforma de denúncia anônima para trabalhadores em burnout. Transforme sua dor em dados para mudança sistêmica.',
  keywords: ['burnout', 'saúde mental', 'trabalho', 'denúncia', 'transparência'],
  authors: [{ name: 'Movimento Meu Burnout é Nosso Dado' }],
  openGraph: {
    title: 'Meu Burnout é Nosso Dado',
    description: 'Denuncie anonimamente condições de trabalho tóxicas',
    type: 'website',
  },
  manifest: '/manifest.json',
  themeColor: '#DC2626',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#dc2626" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
        <script src="/register-sw.js" defer />
      </body>
    </html>
  )
}
