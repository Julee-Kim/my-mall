import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/_common/provider/provider'
import '@/styles/index.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | My mall',
    default: 'My mall',
  },
  description: 'Welcome :)',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
