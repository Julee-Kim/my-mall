import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/index.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | W컨셉(W CONCEPT)',
    default: 'W컨셉(W CONCEPT)',
  },
  description: 'W CONCEPT, Double Your Concept',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
