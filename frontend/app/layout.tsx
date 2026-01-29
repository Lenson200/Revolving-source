// app/layout.tsx
import './globals.css'
import RevolvingSourceLayout from '@/components/revolvingsource/Layout'
export const metadata = {
  title: 'RevolvingSource - Trading & E-Commerce',
  description: 'Trading & E-Commerce Company',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RevolvingSourceLayout>{children}</RevolvingSourceLayout>
      </body>
    </html>
  )
}
