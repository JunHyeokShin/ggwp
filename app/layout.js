import {
  Roboto,
  Roboto_Serif,
  Roboto_Flex,
  Noto_Sans_KR,
  Noto_Serif_KR,
  Exo_2,
} from 'next/font/google'
import './globals.css'
import 'material-symbols'
import Navigation from '@/components/Navigation'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
})
const robotoSerif = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-roboto-serif',
})
const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
})
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
})
const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  variable: '--font-noto-serif-kr',
})
const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo-2',
})

export const metadata = {
  title: 'GGWP - 롤 전적 검색',
  description: '리그오브레전드 전적 검색 사이트',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${roboto.variable} ${robotoSerif.variable} ${robotoFlex.variable}
      ${notoSansKr.variable} ${notoSerifKr.variable} ${exo2.variable}`}
    >
      <body className="bg-surface-light dark:bg-surface-dark">
        <Navigation />
        <main className="ml-80">{children}</main>
      </body>
    </html>
  )
}
